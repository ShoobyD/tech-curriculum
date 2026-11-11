// Mints a session token for local testing, without going through GitHub:
//   npm run dev:token -- <userId>
// It signs with SESSION_SECRET from .dev.vars (scripts/tokens.mjs, the format of src/tokens.ts).
// The user must exist in the local database (npm run db:seed:local creates users 1 to 5).
import { readFileSync } from 'node:fs';
import { sessionToken } from './tokens.mjs';

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

console.log(await sessionToken(uid, secret));

