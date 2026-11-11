/**
 * Checking a progress document before it is stored. Same shape as the page's localStorage:
 * {done: [itemId], dates: {itemId: timestamp}}.
 *
 * An item id is what build.mjs makes of the source's link: a base-36 hash, plus "-2", "-3" when
 * two sources share a link (itemId in build.mjs).
 */

const ITEM_ID = /^[0-9a-z]{1,8}(?:-\d{1,3})?$/;

/** The plan has about 440 items; this leaves room for growth and refuses anything that isn't ours. */
export const MAX_ITEMS = 2000;
export const MAX_BYTES = 128 * 1024;

export interface Progress {
	done: string[];
	dates: Record<string, number>;
}

/** A clean copy of a valid document, or null. Dates for items that aren't done are dropped. */
export function parseProgress(value: unknown): Progress | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	const { done, dates } = value as { done?: unknown; dates?: unknown };
	if (!Array.isArray(done) || done.length > MAX_ITEMS) return null;

	const ids = new Set<string>();
	for (const id of done) {
		if (typeof id !== 'string' || !ITEM_ID.test(id)) return null;
		ids.add(id);
	}

	const clean: Record<string, number> = {};
	if (dates !== undefined) {
		if (!dates || typeof dates !== 'object' || Array.isArray(dates)) return null;
		for (const [id, ts] of Object.entries(dates)) {
			if (typeof ts !== 'number' || !Number.isFinite(ts) || ts <= 0) return null;
			if (ids.has(id)) clean[id] = Math.round(ts);
		}
	}
	return { done: [...ids], dates: clean };
}

/** Reads a stored document; a broken one (never expected) reads as empty. */
export function readStored(data: string): Progress {
	try {
		return parseProgress(JSON.parse(data)) ?? { done: [], dates: {} };
	} catch {
		return { done: [], dates: {} };
	}
}

