// Runs every test suite against a throwaway local setup:
//   - wrangler dev on API_PORT, with its own D1 under .wrangler/test-state (your dev data is untouched)
//     and test secrets passed as --var (no .dev.vars needed);
//   - the built page (../index.html) served on SITE_PORT, the only origin the test API allows;
//   - headless Chrome for the page suites (skipped with a notice when Chrome isn't found).
// The users are the five made-up ones from scripts/seed-dev.sql, reseeded before each suite.
//   npm test                 all suites
//   npm test -- api live     only these
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, rmSync, existsSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findChrome, launchBrowser, reporter } from './helpers.mjs';
import { sessionToken } from '../scripts/tokens.mjs';

const API_PORT = 8788, SITE_PORT = 4398;
const API = `http://localhost:${API_PORT}`;
const SITE = `http://localhost:${SITE_PORT}`;
const ORIGIN = SITE;
const PAGE = `${SITE}/?api=${API}`;
const SECRET = 'test-session-secret';

const apiDir = fileURLToPath(new URL('..', import.meta.url));
const repoDir = join(apiDir, '..');
const stateDir = join(apiDir, '.wrangler', 'test-state');
const wranglerBin = join(apiDir, 'node_modules', 'wrangler', 'bin', 'wrangler.js');

const SUITES = [
	{ name: 'api', file: './api.test.mjs' },
	{ name: 'live', file: './live.test.mjs' },
	{ name: 'account', file: './account.test.mjs', browser: true },
	{ name: 'friends', file: './friends.test.mjs', browser: true },
	{ name: 'livepage', file: './livepage.test.mjs', browser: true },
];
const only = process.argv.slice(2);
const selected = only.length ? SUITES.filter(s => only.includes(s.name)) : SUITES;

const wrangler = args => {
	const r = spawnSync(process.execPath, [wranglerBin, ...args], { cwd: apiDir, encoding: 'utf8' });
	if (r.status !== 0) throw new Error(`wrangler ${args.join(' ')} failed:\n${r.stderr || r.stdout}`);
};
const reseed = () => wrangler(['d1', 'execute', 'tech-lead-curriculum', '--local', '--persist-to', stateDir, '--file=./scripts/seed-dev.sql']);

// the built page and its assets, read-only, from the repo root
function serveSite() {
	const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
	const server = createServer((req, res) => {
		const path = decodeURIComponent(new URL(req.url, SITE).pathname);
		const file = normalize(join(repoDir, path === '/' ? 'index.html' : path));
		if (!file.startsWith(repoDir + sep) || !existsSync(file)) { res.writeHead(404).end(); return; }
		res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
		res.end(readFileSync(file));
	});
	return new Promise(resolve => server.listen(SITE_PORT, '127.0.0.1', () => resolve(server)));
}

// wrangler dev leaves workerd children behind on Windows unless the whole tree is ended
function stopTree(child) {
	if (!child || child.exitCode !== null) return;
	if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
	else try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
}

function startApi() {
	const child = spawn(process.execPath, [wranglerBin, 'dev', '--port', String(API_PORT), '--persist-to', stateDir, '--show-interactive-dev-session=false',
		'--var', `ALLOWED_ORIGINS:${ORIGIN}`, '--var', `SESSION_SECRET:${SECRET}`, '--var', 'GITHUB_CLIENT_ID:test-client', '--var', 'GITHUB_CLIENT_SECRET:test-secret'],
		{ cwd: apiDir, detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] });
	let log = '';
	return new Promise((resolve, reject) => {
		const onData = d => {
			log += d;
			if (/Ready on http/.test(log)) resolve(child);
		};
		child.stdout.on('data', onData);
		child.stderr.on('data', onData);
		child.on('exit', code => reject(new Error(`wrangler dev exited (${code}):\n${log}`)));
		setTimeout(() => reject(new Error(`wrangler dev did not start in 60 s:\n${log}`)), 60000);
	});
}

const ids = [...readFileSync(join(repoDir, 'index.html'), 'utf8').matchAll(/data-id="([^"]+)"/g)].map(m => m[1]);
const results = [];
let api, site, browser;
try {
	console.log('setting up: a fresh local database, the API, the page');
	rmSync(stateDir, { recursive: true, force: true });
	wrangler(['d1', 'migrations', 'apply', 'tech-lead-curriculum', '--local', '--persist-to', stateDir]);
	reseed();
	[api, site] = await Promise.all([startApi(), serveSite()]);

	// the test secret must be the one in effect (a .dev.vars value would override it)
	const probe = await fetch(`${API}/me`, { headers: { Authorization: `Bearer ${await sessionToken(1, SECRET)}` } });
	if (probe.status !== 200) throw new Error(`the API doesn't accept test tokens (GET /me: ${probe.status}); is SESSION_SECRET overridden?`);

	const chromePath = selected.some(s => s.browser) ? findChrome() : null;
	if (chromePath) browser = await launchBrowser(chromePath);

	for (const s of selected) {
		console.log(`\n${s.name}`);
		const r = reporter(s.name);
		results.push(r);
		if (s.browser && !browser) { console.log('  SKIP  Chrome not found (set CHROME_PATH)'); r.skipped = true; continue; }
		reseed();
		const ctx = { API, ORIGIN, SITE, PAGE, SECRET, ids, browser, check: r.check, token: uid => sessionToken(uid, SECRET) };
		try {
			await (await import(s.file)).default(ctx);
		} catch (err) {
			r.check(`suite crashed: ${err.message}`, false);
		}
	}
} catch (err) {
	console.error(`\n${err.message}`);
	results.push({ suite: 'setup', passed: 0, failed: 1 });
} finally {
	await browser?.close();
	site?.close();
	stopTree(api);
}

const failed = results.reduce((n, r) => n + r.failed, 0);
const passed = results.reduce((n, r) => n + r.passed, 0);
const skipped = results.filter(r => r.skipped).map(r => r.suite);
console.log(`\n${passed} passed, ${failed} failed${skipped.length ? `, skipped: ${skipped.join(', ')}` : ''}`);
process.exit(failed ? 1 : 0);

