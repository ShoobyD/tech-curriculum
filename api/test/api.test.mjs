// The HTTP API: auth, validation, CORS, the login redirect, deleting an account.
import { signToken } from '../scripts/tokens.mjs';

export default async function apiSuite({ API, ORIGIN, SECRET, token, ids, check }) {
	const T1 = await token(1), T2 = await token(2), T3 = await token(3), T999 = await token(999);
	const call = (path, { method = 'GET', auth, origin, body, headers = {} } = {}) => fetch(API + path, {
		method,
		redirect: 'manual',
		headers: { ...(auth ? { Authorization: `Bearer ${auth}` } : {}), ...(origin ? { Origin: origin } : {}), ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers },
		body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
	});
	const status = async (...args) => (await call(...args)).status;

	// tokens
	check('friends: empty at start', (await (await call('/friends')).json()).friends.length === 0);
	check('me: no token is 401', (await status('/me')) === 401);
	check('me: valid token', (await (await call('/me', { auth: T1 })).json()).user?.login === 'dev-dana');
	check('me: unknown user is 401', (await status('/me', { auth: T999 })) === 401);
	const expired = await signToken({ typ: 'session', uid: 1, exp: Date.now() - 1000 }, SECRET);
	check('me: expired token is 401', (await status('/me', { auth: expired })) === 401);
	const stateAsSession = await signToken({ typ: 'state', uid: 1, ret: 'x', n: 'y', exp: Date.now() + 60000 }, SECRET);
	check('me: a state token is not a session', (await status('/me', { auth: stateAsSession })) === 401);
	const [body1, sig1] = T1.split('.');
	const mid = Math.floor(sig1.length / 2);
	const flipped = `${body1}.${sig1.slice(0, mid)}${sig1[mid] === 'A' ? 'B' : 'A'}${sig1.slice(mid + 1)}`;
	check('me: changed signature is 401', (await status('/me', { auth: flipped })) === 401);
	check('me: user 2 payload with user 1 signature is 401', (await status('/me', { auth: `${T2.split('.')[0]}.${sig1}` })) === 401);
	check('me: three-part token is 401', (await status('/me', { auth: `${T1}.x` })) === 401);
	// the last base64 character has spare bits: another spelling of the same signature bytes
	const bytes = Buffer.from(sig1, 'base64url');
	const alias = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_']
		.map(c => sig1.slice(0, -1) + c).find(s => s !== sig1 && Buffer.from(s, 'base64url').equals(bytes));
	check('me: non-canonical spelling of a valid signature is 401', alias && (await status('/me', { auth: `${body1}.${alias}` })) === 401);

	// progress: writes need the site's origin, and a valid document
	const good = { done: [ids[0], ids[1], ids[0]], dates: { [ids[0]]: 1762000000000, [ids[5]]: 1762000000001 } };
	check('progress: empty before the first save', (await (await call('/progress', { auth: T1 })).json()).updatedAt === 0);
	check('PUT without Origin is 403', (await status('/progress', { method: 'PUT', auth: T1, body: good })) === 403);
	check('PUT from a foreign origin is 403', (await status('/progress', { method: 'PUT', auth: T1, origin: 'https://evil.example', body: good })) === 403);
	check('PUT valid is 200', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: good })) === 200);
	const saved = await (await call('/progress', { auth: T1 })).json();
	check('saved: duplicate id once, stray date dropped', saved.done.length === 2 && saved.dates[ids[0]] === 1762000000000 && !(ids[5] in saved.dates), JSON.stringify(saved));

	// layout: the person's own order and hidden topics and sources
	const empty = { order: [], hiddenTopics: [], hiddenItems: [] };
	check('layout: empty before one is saved', JSON.stringify(saved.layout) === JSON.stringify(empty), JSON.stringify(saved.layout));
	const layout = { order: ['s3', 's1', 's3', 's2'], hiddenTopics: ['s16'], hiddenItems: [ids[2], ids[2]] };
	check('layout: PUT with a layout is 200', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { ...good, layout } })) === 200);
	const withLayout = (await (await call('/progress', { auth: T1 })).json()).layout;
	check('layout: saved without repeats', JSON.stringify(withLayout) === JSON.stringify({ order: ['s3', 's1', 's2'], hiddenTopics: ['s16'], hiddenItems: [ids[2]] }), JSON.stringify(withLayout));
	await call('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: good });
	const kept = await (await call('/progress', { auth: T1 })).json();
	check('layout: a PUT without one keeps the saved one', JSON.stringify(kept.layout) === JSON.stringify(withLayout) && kept.done.length === 2);
	await call('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { ...good, layout: empty } });
	check('layout: an empty one clears it', JSON.stringify((await (await call('/progress', { auth: T1 })).json()).layout) === JSON.stringify(empty));
	const badLayout = async l => (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { ...good, layout: l } })) === 422;
	check('layout: bad topic id is 422', await badLayout({ ...empty, order: ['3'] }));
	check('layout: bad hidden item id is 422', await badLayout({ ...empty, hiddenItems: ['<img>'] }));
	check('layout: a missing list is 422', await badLayout({ order: [], hiddenTopics: [] }));
	check('layout: not an object is 422', await badLayout(['s1']));
	check('layout: 201 topics is 422', await badLayout({ ...empty, order: Array.from({ length: 201 }, (_, i) => `s${i}`) }));
	check('layout: 2001 hidden items is 422', await badLayout({ ...empty, hiddenItems: Array.from({ length: 2001 }, (_, i) => 'a' + i.toString(36)) }));
	await call('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { ...good, layout } });

	check('PUT bad item id is 422', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { done: ['<img>'] } })) === 422);
	check('PUT negative date is 422', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { done: [ids[0]], dates: { [ids[0]]: -5 } } })) === 422);
	check('PUT not JSON is 400', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: 'nope' })) === 400);
	check('PUT 2001 items is 422', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { done: Array.from({ length: 2001 }, (_, i) => 'a' + i.toString(36)) } })) === 422);
	check('PUT over 128 KB is 413', (await status('/progress', { method: 'PUT', auth: T1, origin: ORIGIN, body: { done: [], pad: 'x'.repeat(140000) } })) === 413);
	check('POST /progress is 405', (await status('/progress', { method: 'POST', auth: T1, origin: ORIGIN })) === 405);
	check('unknown path is 404', (await status('/nope')) === 404);

	// friends
	await call('/progress', { method: 'PUT', auth: T2, origin: ORIGIN, body: { done: [ids[0]] } });
	const friends = await call('/friends');
	const list = (await friends.json()).friends;
	check('friends: most recently active first', list.map(f => f.login).join() === 'dev-yoav,dev-dana');
	check('friends: done is a map of dates', list[1].done[ids[0]] === 1762000000000 && list[1].done[ids[1]] === 0);
	check('friends: cached 30 s', friends.headers.get('Cache-Control') === 'public, max-age=30');
	check("friends: dana's layout is not shown", list.every(f => !('layout' in f)) && !JSON.stringify(list).includes('s16'), Object.keys(list[1]).join());

	// CORS
	const pre = await call('/progress', { method: 'OPTIONS', origin: ORIGIN, headers: { 'Access-Control-Request-Method': 'PUT' } });
	check('preflight from the site allowed', pre.status === 204 && pre.headers.get('Access-Control-Allow-Origin') === ORIGIN);
	const evil = await call('/progress', { method: 'OPTIONS', origin: 'https://evil.example' });
	check('preflight from a foreign origin gets no allow header', !evil.headers.get('Access-Control-Allow-Origin'));

	// login redirect
	check('login: foreign return is 400', (await status('/auth/login?return=https://evil.example/x')) === 400);
	check('login: no return is 400', (await status('/auth/login')) === 400);
	const login = await call(`/auth/login?return=${encodeURIComponent(`${ORIGIN}/#old`)}`);
	const location = login.headers.get('Location') ?? '';
	check('login: redirects to GitHub with our client id and callback', login.status === 302 && location.startsWith('https://github.com/login/oauth/authorize?client_id=test-client&redirect_uri=' + encodeURIComponent(`${API}/auth/callback`)));
	check('login: sets the nonce cookie', /^tl_oauth_nonce=[^;]+; HttpOnly; Secure; SameSite=Lax; Path=\/auth; Max-Age=600$/.test(login.headers.get('Set-Cookie') ?? ''));
	check('callback without state or cookie is 400', (await status('/auth/callback?code=x&state=y')) === 400);

	// deleting an account
	check('DELETE /me is 200', (await status('/me', { method: 'DELETE', auth: T3, origin: ORIGIN })) === 200);
	check('deleted account: token is 401', (await status('/me', { auth: T3 })) === 401);
}

