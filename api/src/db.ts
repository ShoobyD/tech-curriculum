import { EMPTY_LAYOUT, type Progress, readStored } from './progress';

export interface User {
	id: number;
	login: string;
	name: string | null;
	avatar: string | null;
}

/** What GET /friends returns per person: the items they finished, each with when (0 = no date). */
export interface Friend extends User {
	done: Record<string, number>;
	updatedAt: number;
}

/** Only GitHub's avatar host is ever stored or rendered (the page puts it in an <img src>). */
export function safeAvatar(url: unknown): string | null {
	if (typeof url !== 'string') return null;
	try {
		const u = new URL(url);
		return u.protocol === 'https:' && u.hostname === 'avatars.githubusercontent.com' ? u.href : null;
	} catch {
		return null;
	}
}

const USER_COLUMNS = 'id, login, name, avatar_url AS avatar';

export async function getUser(db: D1Database, id: number): Promise<User | null> {
	return db.prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`).bind(id).first<User>();
}

/** Creates or refreshes a person from their GitHub profile. */
export async function upsertUser(db: D1Database, gh: { id: number; login: string; name: string | null; avatar: string | null }, now: number) {
	await db.batch([
		// A login is unique, but GitHub logins can be renamed and then taken by someone else. If an
		// old row still holds this login, it gets a placeholder until its owner logs in again.
		db.prepare("UPDATE users SET login = login || '~' || id WHERE login = ? AND id != ?").bind(gh.login, gh.id),
		db
			.prepare(
				`INSERT INTO users (id, login, name, avatar_url, created_at, last_seen) VALUES (?, ?, ?, ?, ?, ?)
				 ON CONFLICT (id) DO UPDATE SET login = excluded.login, name = excluded.name,
				 avatar_url = excluded.avatar_url, last_seen = excluded.last_seen`,
			)
			.bind(gh.id, gh.login, gh.name, gh.avatar, now, now),
	]);
}

export async function deleteUser(db: D1Database, id: number) {
	await db.batch([
		db.prepare('DELETE FROM progress WHERE user_id = ?').bind(id),
		db.prepare('DELETE FROM users WHERE id = ?').bind(id),
	]);
}

/** My own document, always with a layout (empty lists when none was saved yet). */
export async function getProgress(db: D1Database, userId: number): Promise<Required<Progress> & { updatedAt: number }> {
	const row = await db.prepare('SELECT data, updated_at AS updatedAt FROM progress WHERE user_id = ?').bind(userId).first<{ data: string; updatedAt: number }>();
	const { done, dates, layout } = row ? readStored(row.data) : { done: [], dates: {}, layout: undefined };
	return { done, dates, layout: layout ?? EMPTY_LAYOUT, updatedAt: row?.updatedAt ?? 0 };
}

/** Replaces the whole document: the page always sends its full state (last write wins). */
export async function putProgress(db: D1Database, userId: number, progress: Progress, now: number) {
	await db.batch([
		db
			.prepare(
				`INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)
				 ON CONFLICT (user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
			)
			.bind(userId, JSON.stringify(progress), now),
		db.prepare('UPDATE users SET last_seen = ? WHERE id = ?').bind(now, userId),
	]);
}

/** Everyone who finished at least one item, most recently active first. */
export async function listFriends(db: D1Database): Promise<Friend[]> {
	const { results } = await db
		.prepare(
			`SELECT u.id, u.login, u.name, u.avatar_url AS avatar, p.data, p.updated_at AS updatedAt
			 FROM progress p JOIN users u ON u.id = p.user_id ORDER BY p.updated_at DESC`,
		)
		.all<User & { data: string; updatedAt: number }>();
	const friends: Friend[] = [];
	for (const { data, ...row } of results) {
		const { done, dates } = readStored(data);
		if (!done.length) continue;
		friends.push({ ...row, done: Object.fromEntries(done.map((id) => [id, dates[id] ?? 0])) });
	}
	return friends;
}

