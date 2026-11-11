// Live updates in the page: two devices of one user plus a friend, no reloads.
import { sleep, waitFor } from './helpers.mjs';

export default async function livePageSuite({ API, ORIGIN, PAGE, token, browser, check }) {
	const T1 = await token(1), T2 = await token(2);
	const hasFriends = (d, n) => d.evaluate(`!!document.querySelectorAll('.item')[${n}].querySelector('.friends')`);

	const A = await browser.device();
	const B = await browser.device({ width: 390, height: 900, mobile: true });
	await A.go(`${PAGE}#session=${T1}`, 2500);
	await B.go(`${PAGE}#session=${T1}`, 2500);
	check('both devices are visible', (await A.evaluate('document.hidden')) === false && (await B.evaluate('document.hidden')) === false);

	const id0 = await B.click(0);
	let t = await waitFor(async () => (await A.checked()).includes(id0));
	check('a tick on B shows on A', t >= 0, t >= 0 ? `${t} ms, including the 300 ms save debounce` : 'timed out');
	check('with its date stamp', (await A.evaluate(`document.querySelectorAll('.item')[0].querySelector('.stamp').textContent`)).length > 0);
	await B.click(0);
	t = await waitFor(async () => !(await A.checked()).includes(id0));
	check('an untick on B clears it on A', t >= 0, `${t} ms`);

	const id1 = await A.idAt(1);
	await fetch(`${API}/progress`, { method: 'PUT', headers: { Authorization: `Bearer ${T2}`, Origin: ORIGIN, 'Content-Type': 'application/json' }, body: JSON.stringify({ done: [id1] }) });
	t = await waitFor(() => hasFriends(A, 1));
	check("a friend's tick: photo appears on A", t >= 0, `${t} ms`);
	check("a friend's tick: and on B", (await waitFor(() => hasFriends(B, 1))) >= 0);
	await fetch(`${API}/me`, { method: 'DELETE', headers: { Authorization: `Bearer ${T2}`, Origin: ORIGIN } });
	check('a friend deleted: photo disappears', (await waitFor(async () => !(await hasFriends(A, 1)))) >= 0);

	// the echo of my own save never undoes a newer tick on the same device
	const id2 = await A.click(2);
	await sleep(200);
	const id3 = await A.click(3);
	await sleep(2000);
	const a = await A.checked();
	check('rapid ticks survive their own echoes', a.includes(id2) && a.includes(id3), JSON.stringify(a));
	check('both rapid ticks reach B', (await waitFor(async () => { const b = await B.checked(); return b.includes(id2) && b.includes(id3); })) >= 0);

	await fetch(`${API}/me`, { method: 'DELETE', headers: { Authorization: `Bearer ${T1}`, Origin: ORIGIN } });
	t = await waitFor(async () => (await A.status()).startsWith('החשבון נמחק'));
	check('my account deleted elsewhere: A says so and turns guest', t >= 0 && await A.evaluate(`!document.querySelector('.reader-guest').hidden`));
}

