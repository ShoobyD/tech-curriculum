# Accounts API

Accounts and shared progress for the [study plan](https://shoobyd.github.io/tech-lead-curriculum/): a Cloudflare Worker with a D1 database. The site itself stays static on GitHub Pages. This Worker is the only thing that writes to the database, so write access never reaches the browser.

Friends log in with GitHub, and their progress follows them between devices. Everyone's progress is visible to everyone: the page shows, on each source, the friends who already finished it.

## API

| Method | Path | Auth | Result |
| --- | --- | --- | --- |
| `GET` | `/auth/login?return=<page>` | | Redirects to GitHub's consent page (no scopes) |
| `GET` | `/auth/callback` | | Redirects back to `<page>#session=<token>`, or `<page>#auth_error=denied\|failed` |
| `GET` | `/friends` | | `{ friends: [{ id, login, name, avatar, done: { itemId: timestamp }, updatedAt }] }`, most recently active first, cached 30 s |
| `GET` | `/me` | Bearer | `{ user: { id, login, name, avatar } }` |
| `DELETE` | `/me` | Bearer | `{ deleted: true }`: the account and its progress |
| `GET` | `/progress` | Bearer | `{ done, dates, updatedAt }` (empty with `updatedAt: 0` before the first save) |
| `PUT` | `/progress` | Bearer | Body `{ done: [itemId], dates: { itemId: timestamp } }` → `{ saved: true, updatedAt }`. Replaces the whole document |

"Bearer" means `Authorization: Bearer <token>`, the token from the login. It is valid for 90 days.

Errors are `{ error }` with one of:

| Status | `error` | Meaning |
| --- | --- | --- |
| 401 | `login_required` | No token, a forged or expired one, or the account was deleted |
| 403 | `origin` | A write (`PUT`, `DELETE`) not from one of `ALLOWED_ORIGINS` |
| 413 | `too_large` | A progress body over 128 KB |
| 400 | `bad_json` | The body isn't JSON |
| 422 | `invalid` | Not a progress document: item ids must look like `build.mjs` makes them (`^[0-9a-z]{1,8}(-\d{1,3})?$`), at most 2000, dates positive numbers |
| 500 | `not_configured` | A secret is missing |

## How login works

1. The page navigates to `/auth/login?return=<its own URL>`. The return address must be on one of `ALLOWED_ORIGINS` (`wrangler.toml`).
2. The Worker signs an OAuth `state` holding the return address and a nonce, puts the nonce in a short-lived HttpOnly cookie, and redirects to GitHub.
3. GitHub sends the person back to `/auth/callback`. The Worker checks the state against the cookie, exchanges the code, reads the public profile, and stores the GitHub id, login, name and avatar. GitHub's access token is used once and not kept.
4. The Worker redirects back with a session token in the URL fragment. The page keeps it in localStorage and sends it as `Authorization: Bearer`.

The token travels in a header and not a cookie because the Worker (workers.dev) and the site (github.io) are different sites: a cookie would be a third-party cookie, which Safari blocks. In exchange, the page must never render user data as HTML (it uses `textContent`), and only `avatars.githubusercontent.com` addresses are stored for avatars.

No email addresses, passwords or IP addresses are stored.

## Develop

```sh
cd api
npm install
cp .dev.vars.example .dev.vars   # then set SESSION_SECRET (and the GitHub values to try the real login)
npm run migrate:local            # creates the tables in the local D1 (under .wrangler/)
npm run db:seed:local            # three made-up friends, ids 1-3
npm run dev                      # http://localhost:8787
npm run dev:token -- 1           # prints a session token for user 1
npm run typecheck
```

Then, for example:

```sh
TOKEN=$(npm run -s dev:token -- 1)
curl -X PUT http://localhost:8787/progress -H "Authorization: Bearer $TOKEN" \
  -H "Origin: http://localhost:4399" -H "Content-Type: application/json" \
  -d '{"done":["abc123"],"dates":{"abc123":1762000000000}}'
curl http://localhost:8787/friends
```

To serve the page against the local API, run `python -m http.server 4399` in the repo root and open `http://localhost:4399/?api=http://localhost:8787`.

On Windows, stopping wrangler sometimes leaves `workerd.exe` running in the background, still holding port 8787 with old code. If answers look stale, end it in Task Manager.

## Deploy (once)

```sh
npx wrangler login
npx wrangler d1 create tech-lead-curriculum   # put the printed id in wrangler.toml
npm run migrate:remote
```

Create a GitHub OAuth App (GitHub → Settings → Developer settings → OAuth Apps → New):

- Homepage URL: `https://shoobyd.github.io/tech-lead-curriculum/`
- Authorization callback URL: `https://tech-lead-curriculum-api.bmusty.workers.dev/auth/callback`

Then set the three secrets and deploy:

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put SESSION_SECRET   # any long random string; changing it logs everyone out
npm run deploy
```

Later changes: `npm run deploy`, and `npm run migrate:remote` when a migration was added.

