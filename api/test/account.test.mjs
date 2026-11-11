// The page's account: guest, first-login merge, saving, a second device, offline, bad token,
// cancelled login, logout and delete.
import { sameSet, sleep } from './helpers.mjs';

export default async function accountSuite({ API, PAGE, SITE, token, browser, check }) {
	const T1 = await token(1), T2 = await token(2);
	const server = async t => (await fetch(`${API}/progress`, { headers: { Authorization: `Bearer ${t}` } })).json();
	const SAVED = 'שמור בחשבון, בכל המכשירים.';

	// guest: ticks stay in the browser
	const A = await browser.device();
	await A.go(PAGE);
	check('guest status', (await A.status()) === 'ההתקדמות נשמרת רק בדפדפן הזה.', await A.status());
	check('guest sees the login button', await A.evaluate(`!document.querySelector('.reader-guest').hidden && document.querySelector('.reader-card').hidden`));
	check('login link goes to the API with a return address', (await A.evaluate(`document.getElementById('gh-login').href`)).startsWith(`${API}/auth/login?return=${encodeURIComponent(SITE + '/?api=')}`));
	const g1 = await A.click(0), g2 = await A.click(1);
	await sleep(800);
	check("guest ticks don't reach the server", (await server(T1)).done.length === 0);

	// first login on this browser: local ticks merge into the (empty) account
	await A.go(`${PAGE}#session=${T1}`, 2500);
	check('the token is removed from the address', !(await A.evaluate('location.href')).includes('session='));
	check('the reader card shows the user', (await A.evaluate(`document.querySelector('.reader-login').textContent`)) === '@dev-dana');
	check('first login uploads the local ticks', sameSet((await server(T1)).done, [g1, g2]));
	check('status: saved', (await A.status()) === SAVED, await A.status());

	// a tick while logged in is saved after a short debounce
	const g3 = await A.click(2);
	check('status while waiting: saving', (await A.status()) === 'שומר בחשבון…', await A.status());
	await sleep(1200);
	check('the tick is saved to the account', sameSet((await server(T1)).done, [g1, g2, g3]));

	// a second device loads the account; its untick reaches the first device on reload
	const B = await browser.device({ width: 390, height: 900, mobile: true });
	await B.go(`${PAGE}#session=${T1}`, 2500);
	check('a second device loads the account', sameSet(await B.checked(), [g1, g2, g3]));
	await B.click(0);
	await sleep(1200);
	await A.reload(2500);
	check('the first device has the untick', sameSet(await A.checked(), [g2, g3]), JSON.stringify(await A.checked()));

	// offline: the change stays local as pending, and wins on the next visit
	await A.go(`${SITE}/?api=http://localhost:1`, 2500);
	check('API unreachable: offline status', (await A.status()) === 'אין כרגע חיבור לחשבון. ההתקדמות נשמרת בדפדפן הזה.', await A.status());
	const g5 = await A.click(4);
	await sleep(1500);
	check('a failed save shows the retry status', (await A.status()).startsWith('לא נשמר בחשבון'), await A.status());
	check('the local copy is marked pending', await A.evaluate(`JSON.parse(localStorage.getItem('tl-plan-progress-v1')).pending === true`));
	await A.go(PAGE, 3000);
	check('the pending change is pushed on the next visit', sameSet((await server(T1)).done, [g2, g3, g5]));

	// a bad token: back to guest, ticks kept
	await A.evaluate(`localStorage.setItem('tl-plan-session-v1', JSON.stringify({ token: 'bad.token', user: null }))`);
	await A.reload(2500);
	check('bad token: expired status', (await A.status()).startsWith('ההתחברות פגה'), await A.status());
	check('bad token: guest UI, ticks kept', await A.evaluate(`!document.querySelector('.reader-guest').hidden`) && sameSet(await A.checked(), [g2, g3, g5]));

	// a login cancelled on GitHub
	await A.go(`${PAGE}#auth_error=denied`);
	check('cancelled login message', (await A.status()) === 'ההתחברות בוטלה.', await A.status());

	// logout and delete (user 2, on the second device)
	await B.evaluate('localStorage.clear()');
	await B.go(`${PAGE}#session=${T2}`, 2500);
	await B.evaluate(`document.querySelector('[data-act="logout"]').click()`);
	await sleep(300);
	check('logout: message and guest UI', (await B.status()).startsWith('התנתקת') && await B.evaluate(`!document.querySelector('.reader-guest').hidden`));
	await B.go(`${PAGE}#session=${T2}`, 2500);
	await B.evaluate(`document.querySelector('[data-act="delete"]').click()`);
	await sleep(1500);
	check('delete: message', (await B.status()).startsWith('החשבון נמחק'), await B.status());
	check('delete: the token stops working', (await fetch(`${API}/me`, { headers: { Authorization: `Bearer ${T2}` } })).status === 401);
}

