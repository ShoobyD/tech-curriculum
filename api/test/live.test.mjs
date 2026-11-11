// The live room over WebSocket: who may join, keepalive, and pushing saves and deletions.
import { sleep, waitFor } from './helpers.mjs';

export default async function liveSuite({ API, ORIGIN, token, ids, check }) {
	const T1 = await token(1), T3 = await token(3);
	const WS = API.replace(/^http/, 'ws') + '/live';
	const open = origin => new Promise(resolve => {
		const ws = new WebSocket(WS, { headers: origin ? { Origin: origin } : {} });
		const inbox = [];
		ws.addEventListener('message', e => inbox.push(String(e.data)));
		ws.addEventListener('open', () => resolve({ ws, inbox, ok: true }), { once: true });
		ws.addEventListener('error', () => resolve({ ws, inbox, ok: false }), { once: true });
	});
	const put = (t, body) => fetch(`${API}/progress`, { method: 'PUT', headers: { Authorization: `Bearer ${t}`, Origin: ORIGIN, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

	check('plain GET /live is 426', (await fetch(`${API}/live`)).status === 426);
	check('a foreign origin cannot join', !(await open('https://evil.example')).ok);
	check('no origin cannot join', !(await open(null)).ok);
	const A = await open(ORIGIN), B = await open(ORIGIN);
	check('two pages join from the site', A.ok && B.ok);

	A.ws.send('ping');
	check('ping is answered with pong', (await waitFor(() => A.inbox.includes('pong'), 2000)) >= 0);

	const start = Date.now();
	await put(T1, { done: [ids[0]], dates: { [ids[0]]: 1762000000000 } });
	await waitFor(() => A.inbox.some(m => m.includes('"progress"')) && B.inbox.some(m => m.includes('"progress"')), 3000);
	const msg = JSON.parse(B.inbox.find(m => m.includes('"progress"')) ?? '{}');
	check('a save reaches every page', !!msg.friend && A.inbox.some(m => m.includes('"progress"')), `${Date.now() - start} ms after the PUT`);
	check('the message has the /friends shape', msg.friend?.id === 1 && msg.friend.login === 'dev-dana' && msg.friend.done?.[ids[0]] === 1762000000000 && typeof msg.friend.updatedAt === 'number');

	await fetch(`${API}/me`, { method: 'DELETE', headers: { Authorization: `Bearer ${T3}`, Origin: ORIGIN } });
	check('a deletion is pushed', (await waitFor(() => A.inbox.includes('{"type":"deleted","id":3}'), 3000)) >= 0);

	A.ws.close();
	await sleep(300);
	await put(T1, { done: [] });
	check('a closed page does not break the others', (await waitFor(() => B.inbox.filter(m => m.includes('"progress"')).length === 2, 3000)) >= 0);
	B.ws.close();
}

