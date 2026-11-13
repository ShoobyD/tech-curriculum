/**
 * Login with GitHub (OAuth web flow). The client secret stays here; the browser only ever sees
 * our own session token.
 *
 *   GET /auth/login?return=<page>   → GitHub's consent page (no scopes: public profile only)
 *   GET /auth/callback              → back to <page>#session=<token>, or <page>#auth_error=<code>
 *
 * The page reads the token from the fragment (never sent to any server), keeps it in
 * localStorage and sends it as "Authorization: Bearer". A cookie wouldn't work: this Worker is on
 * workers.dev and the site on github.io, so it would be a third-party cookie, which Safari blocks.
 * The only cookie here is the short-lived nonce that ties the OAuth state to the browser.
 */
import { safeAvatar, upsertUser } from './db';
import { allowedOrigins, type Env, textPage } from './http';
import { randomNonce, readState, SESSION_TTL_MS, signToken, STATE_TTL_MS } from './tokens';

const NONCE_COOKIE = 'tl_oauth_nonce';
const USER_AGENT = 'tech-curriculum-api';

const FAILED = 'ההתחברות נכשלה. חזרו לדף התכנית ונסו להתחבר שוב.';
const NOT_CONFIGURED = 'ההתחברות עוד לא הוגדרה בשרת.';

function nonceCookie(value: string, maxAge: number): string {
	return `${NONCE_COOKIE}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/auth; Max-Age=${maxAge}`;
}

function readCookie(request: Request, name: string): string | null {
	for (const part of (request.headers.get('Cookie') ?? '').split(';')) {
		const i = part.indexOf('=');
		if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
	}
	return null;
}

function redirect(location: string, cookie: string): Response {
	return new Response(null, { status: 302, headers: { Location: location, 'Set-Cookie': cookie, 'Cache-Control': 'no-store' } });
}

/** The page to come back to, if it is on an allowed origin; without its fragment. */
function returnTarget(raw: string | null, env: Env): string | null {
	if (!raw) return null;
	try {
		const url = new URL(raw);
		if (!allowedOrigins(env).includes(url.origin)) return null;
		url.hash = '';
		return url.href;
	} catch {
		return null;
	}
}

export async function handleLogin(request: Request, env: Env): Promise<Response> {
	if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) return textPage(NOT_CONFIGURED, 500);
	const url = new URL(request.url);
	const ret = returnTarget(url.searchParams.get('return'), env);
	if (!ret) return textPage('כתובת החזרה לא מורשית.', 400);

	const n = randomNonce();
	const state = await signToken({ typ: 'state', ret, n, exp: Date.now() + STATE_TTL_MS }, env.SESSION_SECRET);
	const github = new URL('https://github.com/login/oauth/authorize');
	github.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
	github.searchParams.set('redirect_uri', `${url.origin}/auth/callback`);
	github.searchParams.set('state', state);
	github.searchParams.set('allow_signup', 'true');
	return redirect(github.href, nonceCookie(n, STATE_TTL_MS / 1000));
}

export async function handleCallback(request: Request, env: Env): Promise<Response> {
	if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) return textPage(NOT_CONFIGURED, 500);
	const url = new URL(request.url);
	const state = await readState(url.searchParams.get('state') ?? '', env.SESSION_SECRET);
	const nonce = readCookie(request, NONCE_COOKIE);
	// The return address comes only from a state we signed, so a bad state has nowhere to go back to.
	if (!state || !nonce || nonce !== state.n || !returnTarget(state.ret, env)) return textPage(FAILED, 400);

	const clear = nonceCookie('', 0);
	const back = (fragment: string) => redirect(`${state.ret}#${fragment}`, clear);

	// The person pressed "Cancel" on GitHub's page.
	if (url.searchParams.get('error')) return back('auth_error=denied');
	const code = url.searchParams.get('code');
	if (!code) return back('auth_error=failed');

	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
		body: JSON.stringify({
			client_id: env.GITHUB_CLIENT_ID,
			client_secret: env.GITHUB_CLIENT_SECRET,
			code,
			redirect_uri: `${url.origin}/auth/callback`,
		}),
	});
	const tokenData = (await tokenRes.json().catch(() => null)) as { access_token?: unknown } | null;
	if (!tokenRes.ok || typeof tokenData?.access_token !== 'string') return back('auth_error=failed');

	// GitHub's access token is used once, here, and never stored.
	const userRes = await fetch('https://api.github.com/user', {
		headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': USER_AGENT },
	});
	const gh = (await userRes.json().catch(() => null)) as { id?: unknown; login?: unknown; name?: unknown; avatar_url?: unknown } | null;
	if (!userRes.ok || typeof gh?.id !== 'number' || typeof gh.login !== 'string') return back('auth_error=failed');

	const now = Date.now();
	await upsertUser(env.DB, { id: gh.id, login: gh.login, name: typeof gh.name === 'string' ? gh.name : null, avatar: safeAvatar(gh.avatar_url) }, now);
	const session = await signToken({ typ: 'session', uid: gh.id, exp: now + SESSION_TTL_MS }, env.SESSION_SECRET);
	return back(`session=${session}`);
}

