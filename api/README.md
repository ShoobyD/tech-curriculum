# Accounts API

Accounts and shared progress for the [study plan](https://shoobyd.github.io/tech-lead-curriculum/): a Cloudflare Worker with a D1 database and one Durable Object for live updates. The site itself stays static on GitHub Pages. This Worker is the only thing that writes to the database, so write access never reaches the browser.

Friends log in with GitHub, and their progress follows them between devices. Everyone's progress is visible to everyone: the page shows, on each source, the friends who already finished it. Open pages get every change live, over a WebSocket.

## API

| Method | Path | Auth | Result |
| --- | --- | --- | --- |
| `GET` | `/auth/login?return=<page>` | | Redirects to GitHub's consent page (no scopes) |
| `GET` | `/auth/callback` | | Redirects back to `<page>#session=<token>`, or `<page>#auth_error=denied\|failed` |
| `GET` | `/friends` | | `{ friends: [{ id, login, name, avatar, done: { itemId: timestamp }, updatedAt }] }`, most recently active first, cached 30 s |
| `GET` | `/live` | | WebSocket upgrade, only from `ALLOWED_ORIGINS` (see [Live updates](#live-updates)); a plain request gets 426 |
| `GET` | `/me` | Bearer | `{ user: { id, login, name, avatar } }` |
| `DELETE` | `/me` | Bearer | `{ deleted: true }`: the account and its progress |
| `GET` | `/progress` | Bearer | `{ done, dates, layout, updatedAt }` (empty, with `updatedAt: 0`, before the first save) |
| `PUT` | `/progress` | Bearer | Body `{ done: [itemId], dates: { itemId: timestamp }, layout? }` → `{ saved: true, updatedAt }`. Replaces the whole document; without `layout`, the saved layout is kept |

The layout is the person's own arrangement of the plan: `{ order: [topicId], hiddenTopics: [topicId], hiddenItems: [itemId] }`, with topic ids `s1`…`s16` from `build.mjs`. It is private: `/friends` and the live room carry only `done`, never the layout. A page that doesn't send one (an older copy still open) leaves it as it was.

"Bearer" means `Authorization: Bearer <token>`, the token from the login. It is valid for 90 days.

Errors are `{ error }` with one of:

| Status | `error` | Meaning |
| --- | --- | --- |
| 401 | `login_required` | No token, a forged or expired one, or the account was deleted |
| 403 | `origin` | A write (`PUT`, `DELETE`) or a `/live` connection not from one of `ALLOWED_ORIGINS` |
| 413 | `too_large` | A progress body over 128 KB |
| 400 | `bad_json` | The body isn't JSON |
| 422 | `invalid` | Not a progress document: item ids must look like `build.mjs` makes them (`^[0-9a-z]{1,8}(-\d{1,3})?$`), at most 2000, dates positive numbers; a layout needs all three lists, topic ids `^s\d{1,3}$` (at most 200) and item ids as above (at most 2000) |
| 500 | `not_configured` | A secret is missing |

## Live updates

Workers don't share memory between requests and D1 doesn't announce changes, so one Durable Object, `Room` (`src/room.ts`), is the meeting point for all friends. Each open page holds a WebSocket to it through `/live`. After a `PUT /progress` or `DELETE /me` is saved, the Worker sends the room one message, and the room passes it to every connected page:

```jsonc
{ "type": "progress", "friend": { "id": 1, "login": "…", "name": "…", "avatar": "…", "done": { "itemId": 1762000000000 }, "updatedAt": 1762000000000 } }
{ "type": "deleted", "id": 1 }
```

The `friend` object has the same shape as an entry of `GET /friends`, and holds nothing that isn't already public there. The page's own devices receive their owner's changes the same way.

The room accepts sockets with the Hibernation API: while nothing happens it sleeps and isn't billed for duration, even with pages connected. Pages send `ping` to keep the connection open, and the runtime answers `pong` without waking the room. A page that was disconnected reloads `/friends` and `/progress` when it reconnects, so a missed message only delays a change. The room stores nothing.

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
npm run db:seed:local            # five made-up friends, ids 1-5
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

## Test

```sh
cd api
npm test                  # every suite, about a minute
npm test -- api live      # only some: api, live, account, friends, livepage
```

The runner (`test/run.mjs`) builds a throwaway setup and removes it at the end:

- `wrangler dev` on port 8798 with its own D1 under `.wrangler/test-state` (your dev database isn't touched) and test secrets passed as `--var`, so it needs no `.dev.vars`;
- the built page (`../index.html`, run `node build.mjs` first after changing the template) served on port 4398, the only origin the test API allows;
- headless Chrome for the page suites. It is found in the usual install locations, or set `CHROME_PATH`; without it those suites are skipped.

The five made-up users of `scripts/seed-dev.sql` are reseeded before each suite.

| Suite | Covers |
| --- | --- |
| `api` | Tokens (expired, forged, non-canonical), validation, the private layout, origin checks, CORS, the login redirect, deleting an account |
| `live` | Who may join `/live`, ping/pong, saves and deletions pushed to every page, never a layout |
| `account` | The page as a guest, the first-login merge, saving, a second device, offline and pending changes, a bad token, a cancelled login, logout, delete |
| `friends` | Friends' photos on the cards: order, "+N", the letter fallback, never yourself, aligned columns |
| `livepage` | Live updates between two devices and from a friend, without reloads; a tick is never undone by its own echo |
| `pages` | The plan's dialogs (how to use, tool status: keyboard, Esc, backdrop, focus, `#status` links) and the interview prep page's own checklist |

Ports 8798 and 4398 must be free (the runner stops with a message if not); the usual dev ports (8787, 4399) can stay in use.

## Deploy (once)

```sh
npx wrangler login
npx wrangler d1 create tech-lead-curriculum   # put the printed id in wrangler.toml
npm run migrate:remote
```

Create a GitHub OAuth App ([github.com/settings/applications/new](https://github.com/settings/applications/new): account Settings → Developer settings → OAuth Apps):

- Homepage URL: `https://shoobyd.github.io/tech-lead-curriculum/`
- Redirect URI (called "Authorization callback URL" in older forms): `https://tech-lead-curriculum-api.bmusty.workers.dev/auth/callback`, exactly, without a trailing slash
- Wildcard matching, Device Flow and expiring user tokens: off

Then set the three secrets and deploy. Run `secret put` in a regular terminal: it prompts for the value, and a non-interactive shell would upload an empty one. Keep the client secret out of shell history and chat logs:

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put SESSION_SECRET   # any long random string; changing it logs everyone out
npm run deploy
```

Later changes: `npm run deploy`, and `npm run migrate:remote` when a migration was added.

