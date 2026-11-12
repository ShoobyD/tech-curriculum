/**
 * Checking a progress document before it is stored. Same shape as the page's localStorage:
 * {done: [itemId], dates: {itemId: timestamp}, layout?: {order, hiddenTopics, hiddenItems}}.
 *
 * The layout is the person's own arrangement of the plan: topic order, hidden topics and sources.
 * It is private: GET /friends and the live room only ever carry `done`.
 *
 * An item id is what build.mjs makes of the source's link: a base-36 hash, plus "-2", "-3" when
 * two sources share a link (itemId in build.mjs).
 */

const ITEM_ID = /^[0-9a-z]{1,8}(?:-\d{1,3})?$/;
/** A topic id from build.mjs: s1 … s16. */
const TOPIC_ID = /^s\d{1,3}$/;

/** The plan has about 440 items; this leaves room for growth and refuses anything that isn't ours. */
export const MAX_ITEMS = 2000;
export const MAX_TOPICS = 200;
export const MAX_BYTES = 128 * 1024;

export interface Progress {
	done: string[];
	dates: Record<string, number>;
	layout?: Layout;
}

export interface Layout {
	/** Topics in the person's order; topics missing from it keep their default place. */
	order: string[];
	hiddenTopics: string[];
	hiddenItems: string[];
}

export const EMPTY_LAYOUT: Layout = { order: [], hiddenTopics: [], hiddenItems: [] };

/** The ids of a list without repeats, or null if it is too long or any id doesn't match. */
function idList(value: unknown, pattern: RegExp, max: number): string[] | null {
	if (!Array.isArray(value) || value.length > max) return null;
	const ids = new Set<string>();
	for (const id of value) {
		if (typeof id !== 'string' || !pattern.test(id)) return null;
		ids.add(id);
	}
	return [...ids];
}

/** A clean copy of a valid layout, or null. All three lists are required, and may be empty. */
export function parseLayout(value: unknown): Layout | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	const { order, hiddenTopics, hiddenItems } = value as Record<string, unknown>;
	const o = idList(order, TOPIC_ID, MAX_TOPICS);
	const t = idList(hiddenTopics, TOPIC_ID, MAX_TOPICS);
	const i = idList(hiddenItems, ITEM_ID, MAX_ITEMS);
	return o && t && i ? { order: o, hiddenTopics: t, hiddenItems: i } : null;
}

/**
 * A clean copy of a valid document, or null. Dates for items that aren't done are dropped.
 * `layout` is optional; a document sent without one has none (PUT /progress then keeps the stored one).
 */
export function parseProgress(value: unknown): Progress | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	const { done, dates, layout } = value as { done?: unknown; dates?: unknown; layout?: unknown };
	const list = idList(done, ITEM_ID, MAX_ITEMS);
	if (!list) return null;
	const ids = new Set(list);

	const clean: Record<string, number> = {};
	if (dates !== undefined) {
		if (!dates || typeof dates !== 'object' || Array.isArray(dates)) return null;
		for (const [id, ts] of Object.entries(dates)) {
			if (typeof ts !== 'number' || !Number.isFinite(ts) || ts <= 0) return null;
			if (ids.has(id)) clean[id] = Math.round(ts);
		}
	}
	if (layout === undefined) return { done: list, dates: clean };
	const cleanLayout = parseLayout(layout);
	return cleanLayout ? { done: list, dates: clean, layout: cleanLayout } : null;
}

/** Reads a stored document; a broken one (never expected) reads as empty. */
export function readStored(data: string): Progress {
	try {
		return parseProgress(JSON.parse(data)) ?? { done: [], dates: {} };
	} catch {
		return { done: [], dates: {} };
	}
}

