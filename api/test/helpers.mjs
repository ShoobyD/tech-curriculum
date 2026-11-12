// Shared by the test suites: a tiny reporter, waiting, and a headless Chrome driven over the
// DevTools protocol (no extra dependencies: Node 22+ has fetch and WebSocket built in).
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const sleep = ms => new Promise(r => setTimeout(r, ms));

/** Polls `fn` until it returns something truthy; resolves to the milliseconds it took, or -1. */
export async function waitFor(fn, ms = 4000) {
	const start = Date.now();
	while (Date.now() - start < ms) {
		if (await fn()) return Date.now() - start;
		await sleep(50);
	}
	return -1;
}

/** Counts results for one suite and prints them as they come. */
export function reporter(suite) {
	const result = { suite, passed: 0, failed: 0 };
	result.check = (name, ok, detail = '') => {
		ok ? result.passed++ : result.failed++;
		console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
	};
	return result;
}

/** Chrome or Chromium on this machine; CHROME_PATH overrides. Null when none is found. */
export function findChrome() {
	const candidates = [
		process.env.CHROME_PATH,
		'C:/Program Files/Google/Chrome/Application/chrome.exe',
		'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser',
	];
	return candidates.find(p => p && existsSync(p)) ?? null;
}

/**
 * Starts a headless Chrome with a throwaway profile. Each device() is a separate browser context
 * (its own localStorage), like a separate phone or computer, with one tab.
 */
export async function launchBrowser(chromePath) {
	const profile = mkdtempSync(join(tmpdir(), 'tlc-test-chrome-'));
	const port = 9300 + Math.floor(Math.random() * 600);
	const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });

	let version;
	for (let i = 0; i < 75 && !version; i++) {
		try { version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(200); }
	}
	if (!version) throw new Error('Chrome did not start');
	const ws = new WebSocket(version.webSocketDebuggerUrl);
	await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });

	let seq = 0;
	const pending = new Map();
	const listeners = [];
	ws.addEventListener('message', ev => {
		const m = JSON.parse(ev.data);
		if (m.id && pending.has(m.id)) {
			const { resolve, reject } = pending.get(m.id);
			pending.delete(m.id);
			m.error ? reject(new Error(m.error.message)) : resolve(m.result);
		} else for (const l of listeners) l(m);
	});
	const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
		const id = ++seq;
		pending.set(id, { resolve, reject });
		ws.send(JSON.stringify({ id, method, params, sessionId }));
	});

	async function device({ width = 1440, height = 1000, mobile = false } = {}) {
		const { browserContextId } = await send('Target.createBrowserContext');
		const { targetId } = await send('Target.createTarget', { url: 'about:blank', browserContextId });
		const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
		const s = (method, params) => send(method, params, sessionId);
		await s('Page.enable');
		await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
		await s('Emulation.setFocusEmulationEnabled', { enabled: true });
		// confirm() (deleting the account) is accepted
		listeners.push(m => { if (m.sessionId === sessionId && m.method === 'Page.javascriptDialogOpening') s('Page.handleJavaScriptDialog', { accept: true }); });
		const evaluate = async expression => (await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
		return {
			evaluate,
			// through about:blank, so a URL that differs only in its #fragment is a real page load
			// (as when GitHub redirects back)
			async go(url, wait = 2000) { await s('Page.navigate', { url: 'about:blank' }); await sleep(150); await s('Page.navigate', { url }); await sleep(wait); },
			async reload(wait = 2000) { await s('Page.reload', { ignoreCache: true }); await sleep(wait); },
			status: () => evaluate(`document.getElementById('save-status').textContent`),
			checked: () => evaluate(`[...document.querySelectorAll('.item input:checked')].map(i => i.closest('.item').dataset.id)`),
			click: n => evaluate(`(() => { const box = document.querySelectorAll('.item .box')[${n}]; box.scrollIntoView({ block: 'center' }); box.click(); return box.closest('.item').dataset.id; })()`),
			idAt: n => evaluate(`document.querySelectorAll('.item')[${n}].dataset.id`),
			// real input events, for what a script click can't show (Esc on a modal, a click on its backdrop)
			async key(key) {
				const code = { Escape: 27, Tab: 9, Enter: 13 }[key];
				await s('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, windowsVirtualKeyCode: code });
				await s('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, windowsVirtualKeyCode: code });
				await sleep(150);
			},
			// press, move in small steps, release: a drag as a mouse does it (pointer events follow)
			async drag(x1, y1, x2, y2, steps = 12) {
				await s('Input.dispatchMouseEvent', { type: 'mousePressed', x: x1, y: y1, button: 'left', clickCount: 1 });
				for (let i = 1; i <= steps; i++) {
					await s('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x1 + (x2 - x1) * i / steps, y: y1 + (y2 - y1) * i / steps, button: 'left', buttons: 1 });
					await sleep(16);
				}
				await s('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x2, y: y2, button: 'left', clickCount: 1 });
				await sleep(150);
			},
			async tap(x, y) {
				for (const type of ['mousePressed', 'mouseReleased']) await s('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
				await sleep(150);
			},
		};
	}

	async function close() {
		await send('Browser.close').catch(() => {});
		chrome.kill();
		await sleep(300);
		try { rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold a file; it's in the temp folder */ }
	}

	return { device, close };
}

export const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));

