/**
 * Signed tokens: base64url(JSON payload) + "." + base64url(HMAC-SHA256 of that string).
 *
 * Two kinds share the format and are told apart by `typ`, so one can never pass for the other:
 *   session  {typ: "session", uid, exp}       what the page sends as "Authorization: Bearer ..."
 *   state    {typ: "state", ret, n, exp}      the OAuth state, bound to a cookie holding `n`
 *
 * The tokens hold no secret; they can't be forged without SESSION_SECRET, which stays on the
 * server. scripts/dev-token.mjs mints session tokens in the same format for local testing.
 */

const encoder = new TextEncoder();

export const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
export const STATE_TTL_MS = 10 * 60 * 1000;

export interface SessionPayload {
	typ: 'session';
	uid: number;
	exp: number;
}

export interface StatePayload {
	typ: 'state';
	/** Where to send the person after logging in (a page on an allowed origin). */
	ret: string;
	/** A random nonce, also kept in a cookie, so the state works only in the browser that started. */
	n: string;
	exp: number;
}

function toBase64Url(bytes: Uint8Array): string {
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array {
	const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
	const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}

function hmacKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function signToken(payload: SessionPayload | StatePayload, secret: string): Promise<string> {
	const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
	const signature = await crypto.subtle.sign('HMAC', await hmacKey(secret), encoder.encode(body));
	return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}

/** The payload of a valid, unexpired token, or null. The signature check runs in constant time. */
async function readToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
	const [body, signature, extra] = token.split('.');
	if (!body || !signature || extra !== undefined) return null;
	try {
		const signatureBytes = fromBase64Url(signature);
		// The last base64 character carries spare bits, so several spellings decode to the same
		// bytes. Accept only the canonical one, so each token has exactly one valid form.
		if (toBase64Url(signatureBytes) !== signature) return null;
		const ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), signatureBytes, encoder.encode(body));
		if (!ok) return null;
		const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as unknown;
		if (!payload || typeof payload !== 'object') return null;
		const exp = (payload as { exp?: unknown }).exp;
		if (typeof exp !== 'number' || Date.now() >= exp) return null;
		return payload as Record<string, unknown>;
	} catch {
		// malformed base64 or JSON
		return null;
	}
}

export async function readSession(token: string, secret: string): Promise<SessionPayload | null> {
	const p = await readToken(token, secret);
	if (p?.typ !== 'session' || typeof p.uid !== 'number' || !Number.isSafeInteger(p.uid)) return null;
	return p as unknown as SessionPayload;
}

export async function readState(token: string, secret: string): Promise<StatePayload | null> {
	const p = await readToken(token, secret);
	if (p?.typ !== 'state' || typeof p.ret !== 'string' || typeof p.n !== 'string') return null;
	return p as unknown as StatePayload;
}

/** The session behind "Authorization: Bearer <token>", or null. */
export async function sessionOfRequest(request: Request, secret: string): Promise<SessionPayload | null> {
	const match = (request.headers.get('Authorization') ?? '').match(/^Bearer\s+(\S+)$/);
	return match ? readSession(match[1], secret) : null;
}

export function randomNonce(): string {
	return toBase64Url(crypto.getRandomValues(new Uint8Array(18)));
}

