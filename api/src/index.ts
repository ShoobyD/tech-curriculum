/**
 * Accounts API for the tech-lead study plan (shoobyd.github.io/tech-lead-curriculum).
 *
 *   GET    /auth/login?return=<page>  login with GitHub (see auth.ts)
 *   GET    /auth/callback
 *   GET    /friends                   everyone's finished items, for the avatars on the cards (public)
 *   GET    /live                      WebSocket: every change, the moment it is saved (public, see room.ts)
 *   GET    /me                        the logged-in person                    Authorization: Bearer
 *   DELETE /me                        deletes the account and its progress    Authorization: Bearer
 *   GET    /progress                  my progress                             Authorization: Bearer
 *   PUT    /progress                  {done, dates}: replaces my progress     Authorization: Bearer
 *
 * The site is static; this Worker is the only thing that writes to the database. Writes, and
 * joining the live room, are accepted only from the allowed origins.
 */
import { handleCallback, handleLogin } from './auth';
import { deleteUser, type Friend, getProgress, getUser, listFriends, putProgress, type User } from './db';
import { allowedOrigins, corsHeaders, type Env, json } from './http';
import { MAX_BYTES, type Progress, parseProgress } from './progress';
import { sessionOfRequest } from './tokens';

export { Room } from './room';

/** All friends share one room. */
const room = (env: Env) => env.ROOM.get(env.ROOM.idFromName('friends'));

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const origin = request.headers.get('Origin');
		const originAllowed = !!origin && allowedOrigins(env).includes(origin);
		const cors = corsHeaders(originAllowed ? origin : null);
		const { method } = request;

		if (method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

		try {
			if (url.pathname === '/auth/login' && method === 'GET') return await handleLogin(request, env);
			if (url.pathname === '/auth/callback' && method === 'GET') return await handleCallback(request, env);
			if (url.pathname === '/friends' && method === 'GET') {
				return json({ friends: await listFriends(env.DB) }, 200, cors, 'public, max-age=30');
			}
			if (url.pathname === '/live' && method === 'GET') {
				if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') return json({ error: 'websocket_expected' }, 426, cors);
				// browsers always send Origin when opening a WebSocket: only the site may join
				if (!originAllowed) return json({ error: 'origin' }, 403, cors);
				return await room(env).fetch(request);
			}

			if (url.pathname !== '/me' && url.pathname !== '/progress') return json({ error: 'not_found' }, 404, cors);

			// Everything below acts for the logged-in person.
			// Browsers always send Origin on a cross-site write: refuse anything not from the site.
			if (method !== 'GET' && !originAllowed) return json({ error: 'origin' }, 403, cors);
			if (!env.SESSION_SECRET) return json({ error: 'not_configured' }, 500, cors);
			const session = await sessionOfRequest(request, env.SESSION_SECRET);
			// The account may have been deleted since the token was issued.
			const user = session && (await getUser(env.DB, session.uid));
			if (!user) return json({ error: 'login_required' }, 401, cors);

			if (url.pathname === '/me') {
				if (method === 'GET') return json({ user }, 200, cors);
				if (method === 'DELETE') {
					await deleteUser(env.DB, user.id);
					announce(env, ctx, { type: 'deleted', id: user.id });
					return json({ deleted: true }, 200, cors);
				}
			}
			if (url.pathname === '/progress') {
				if (method === 'GET') return json(await getProgress(env.DB, user.id), 200, cors);
				if (method === 'PUT') return await saveProgress(request, env, ctx, user, cors);
			}
			return json({ error: 'method_not_allowed' }, 405, cors);
		} catch (err) {
			console.error('api:', err);
			return json({ error: 'server' }, 500, cors);
		}
	},
} satisfies ExportedHandler<Env>;

async function saveProgress(request: Request, env: Env, ctx: ExecutionContext, user: User, cors: Record<string, string>): Promise<Response> {
	const text = await request.text();
	if (text.length > MAX_BYTES) return json({ error: 'too_large' }, 413, cors);
	let body: unknown;
	try {
		body = JSON.parse(text);
	} catch {
		return json({ error: 'bad_json' }, 400, cors);
	}
	const progress = parseProgress(body);
	if (!progress) return json({ error: 'invalid' }, 422, cors);
	const now = Date.now();
	await putProgress(env.DB, user.id, progress, now);
	announce(env, ctx, { type: 'progress', friend: asFriend(user, progress, now) });
	return json({ saved: true, updatedAt: now }, 200, cors);
}

/** The same shape GET /friends returns per person. */
function asFriend(user: User, progress: Progress, updatedAt: number): Friend {
	return { ...user, done: Object.fromEntries(progress.done.map((id) => [id, progress.dates[id] ?? 0])), updatedAt };
}

/**
 * Tells every open page, after the response is sent. The database already holds the change, so a
 * failed push only delays it until the page next loads (pages also catch up when they reconnect).
 */
function announce(env: Env, ctx: ExecutionContext, message: { type: 'progress'; friend: Friend } | { type: 'deleted'; id: number }) {
	ctx.waitUntil(
		room(env)
			.broadcast(JSON.stringify(message))
			.catch((err: unknown) => console.error('live:', err)),
	);
}

