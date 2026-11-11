// Mints a session token for local testing, without going through GitHub:
//   npm run dev:token -- <userId>
// It signs with SESSION_SECRET from .dev.vars, in the same format as src/tokens.ts. The user must
// exist in the local database (npm run db:seed:local creates users 1 to 5).
import { readFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const uid = Number(process.argv[2]);
if (!Number.isSafeInteger(uid)) {
	console.error('usage: npm run dev:token -- <userId>');
	process.exit(1);
}

const vars = readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8');
const secret = vars.match(/^SESSION_SECRET\s*=\s*"?([^"\r\n]+)"?/m)?.[1];
if (!secret) {
	console.error('SESSION_SECRET is missing from .dev.vars (copy .dev.vars.example)');
	process.exit(1);
}

const b64url = (bytes) => Buffer.from(bytes).toString('base64url');
const encoder = new TextEncoder();
const body = b64url(encoder.encode(JSON.stringify({ typ: 'session', uid, exp: Date.now() + 90 * 24 * 60 * 60 * 1000 })));
const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
console.log(`${body}.${b64url(new Uint8Array(signature))}`);

