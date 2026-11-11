-- Three made-up friends for the LOCAL database only (npm run db:seed:local). Never run --remote.
-- Avatars are GitHub's generic placeholder images (ids 1-3); item ids are taken from index.html.
-- Safe to run again: it replaces the same rows.
INSERT OR REPLACE INTO users (id, login, name, avatar_url, created_at, last_seen) VALUES
	(1, 'dev-dana', 'דנה (פיתוח)', 'https://avatars.githubusercontent.com/u/1?v=4', 1762000000000, 1762000000000),
	(2, 'dev-yoav', 'יואב (פיתוח)', 'https://avatars.githubusercontent.com/u/2?v=4', 1762000000000, 1762000000000),
	(3, 'dev-noa', NULL, 'https://avatars.githubusercontent.com/u/3?v=4', 1762000000000, 1762000000000);

DELETE FROM progress WHERE user_id IN (1, 2, 3);

