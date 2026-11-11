-- Five made-up friends for the LOCAL database only (npm run db:seed:local). Never run --remote.
-- Their avatars are the public avatars of GitHub accounts 1-4; user 5 has none, to show the
-- initial-letter fallback. Their progress starts empty (set it with PUT /progress and dev tokens).
-- Safe to run again: it replaces the same rows.
INSERT OR REPLACE INTO users (id, login, name, avatar_url, created_at, last_seen) VALUES
	(1, 'dev-dana', 'דנה (פיתוח)', 'https://avatars.githubusercontent.com/u/1?v=4', 1762000000000, 1762000000000),
	(2, 'dev-yoav', 'יואב (פיתוח)', 'https://avatars.githubusercontent.com/u/2?v=4', 1762000000000, 1762000000000),
	(3, 'dev-noa', NULL, 'https://avatars.githubusercontent.com/u/3?v=4', 1762000000000, 1762000000000),
	(4, 'dev-omer', 'עומר (פיתוח)', 'https://avatars.githubusercontent.com/u/4?v=4', 1762000000000, 1762000000000),
	(5, 'dev-maya', 'מאיה (פיתוח)', NULL, 1762000000000, 1762000000000);

DELETE FROM progress WHERE user_id IN (1, 2, 3, 4, 5);

