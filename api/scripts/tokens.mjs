// Signs tokens in the format of src/tokens.ts, for local tools and tests (never used by the Worker).
import { webcrypto as crypto } from 'node:crypto';

const encoder = new TextEncoder();
const b64url = bytes => Buffer.from(bytes).toString('base64url');

/** base64url(JSON payload) + "." + base64url(HMAC-SHA256 of that string). */
export async function signToken(payload, secret) {
	const body = b64url(encoder.encode(JSON.stringify(payload)));
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
	return `${body}.${b64url(new Uint8Array(signature))}`;
}

/** A session token for a user, valid for 90 days unless `exp` says otherwise. */
export function sessionToken(uid, secret, exp = Date.now() + 90 * 24 * 60 * 60 * 1000) {
	return signToken({ typ: 'session', uid, exp }, secret);
}

