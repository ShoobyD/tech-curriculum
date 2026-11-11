-- People who logged in with GitHub. The id is GitHub's user id, which survives a login rename.
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	login TEXT NOT NULL UNIQUE COLLATE NOCASE,
	name TEXT,
	-- only ever an https://avatars.githubusercontent.com/ address (checked before storing)
	avatar_url TEXT,
	created_at INTEGER NOT NULL,
	last_seen INTEGER NOT NULL
);

-- Each person's progress as one JSON document, the same shape the page keeps in localStorage:
-- {"done": [itemId, ...], "dates": {itemId: timestamp}}. Everyone's progress is visible to the
-- other friends (GET /friends).
CREATE TABLE progress (
	user_id INTEGER PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
	data TEXT NOT NULL,
	updated_at INTEGER NOT NULL
);

-- /friends lists the most recently active first
CREATE INDEX progress_by_time ON progress (updated_at DESC);

