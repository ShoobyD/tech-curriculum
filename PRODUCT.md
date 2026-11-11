# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Experienced frontend developers preparing for Frontend Tech Lead / Architect interviews. They come back to the page many times over weeks: they pick the next topic, open a video or course, and tick it off. The author is one of them; the page is public, and a circle of friends uses it together, seeing who has already finished each source.

## Product Purpose

A free, video-first study plan for tech-lead interviews. Topics are ranked by interview importance (tiers 1–3); sources within each topic are ranked by depth (overview / intermediate / in depth). Success: a visitor always knows what to study next and can see how far along they are.

## Positioning

Every source was opened and checked (YouTube oEmbed / HTTP), all content is free, video and full playlists/courses are preferred over reading, and the plan covers both Vue and React tracks plus AI across the SDLC and a full-stack topic.

## Operating Context

- Desktop for long study sessions; phone for browsing and ticking items between sessions.
- Without a login, progress lives only in the visitor's browser (localStorage). Friends can log in with GitHub: their progress is then kept in their account, follows them between devices, and is visible to every other friend (each card shows who already finished it). Open pages update live, without a reload, over a WebSocket. There is no private option; this is for friends.
- Stored per account: GitHub id, login, name and avatar, and which sources were finished and when. No email, password or IP address.
- Shared as a link (Open Graph preview image at `og-image.png`).

## Capabilities and Constraints

- One static HTML page (`index.html`) generated from `README.md` by `build.mjs` with `template.html`; no framework, no extra build step. GitHub Pages serves the repo root.
- A small accounts API beside it: a Cloudflare Worker with a D1 database in `api/` (GitHub OAuth login, each person's progress, everyone's finished sources). It is deployed separately (`api/README.md`); the page talks to it with a bearer token and works fully without it.
- Features that must keep working: checkboxes with persisted progress, overall and per-tier/per-topic progress, filters (tier, depth, video only, hide done), Vue/React tabs, table of contents, internal anchors, the guest experience with no login, and for logged-in friends: sync between devices and friends' avatars on the cards.
- Content is Hebrew, RTL; source titles and links are English.
- Must work well on phone and support dark mode (system preference).
- Text files use CRLF.
- Counts at time of writing: 16 topics, 437 sources, 93 playlist items. They change with the README.

## Evidence on Hand

- The plan content itself (`README.md`), with verified source dates and lengths.
- No testimonials, user counts or endorsements exist; do not invent any.

## Product Principles

1. The next thing to study is always obvious.
2. Progress is visible and motivating, but never in the way of the content.
3. Ranking (importance and depth) is the core information; it must read at a glance.
4. Free and verified: no claims beyond what was checked.

## Accessibility & Inclusion

Keep WCAG 2.2 AA as the floor: keyboard access for tabs, filters and checkboxes, visible focus, sufficient contrast in both themes, reduced motion respected.

