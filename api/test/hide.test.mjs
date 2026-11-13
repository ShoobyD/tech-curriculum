// Hiding by hand: a source from its card, a topic from its drawer, "הצג מוסתרים" and the topic
// head's count, restoring, counts, another device, and friends never seeing any of it.
import { sleep, waitFor } from './helpers.mjs';

export default async function hideSuite({ API, PAGE, token, browser, check }) {
	const T1 = await token(1);
	const server = async () => (await fetch(`${API}/progress`, { headers: { Authorization: `Bearer ${T1}` } })).json();

	const A = await browser.device();
	await A.go(`${PAGE}#session=${T1}`, 2500);
	const doneOf = () => A.evaluate(`document.getElementById('done-of').textContent`);
	const total = () => doneOf().then(t => Number(t.match(/מתוך (\d+)/)[1]));
	const on = sel => A.evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); return !!el && el.getClientRects().length > 0; })()`);
	const start = await total();
	const [id0, id1] = await A.evaluate(`[...document.querySelectorAll('#s1 .item')].slice(0, 2).map(el => el.dataset.id)`);
	const card = id => `.item[data-id="${id}"]`;

	check('every card has a hide button, named for its source', await A.evaluate(`document.querySelectorAll('.item .hide-btn').length === document.querySelectorAll('.item').length && document.querySelector('.hide-btn').getAttribute('aria-label').startsWith('הסתרת המקור: ')`));
	check('nothing hidden: no "הצג מוסתרים" chip, no count in the topic', !(await on('[data-f="showHidden"]')) && !(await on('#s1 .topic-hidden')));

	// a finished source, then hidden: it leaves the page and every count
	await A.click(1);
	await A.evaluate(`document.querySelector('${card(id1)} .hide-btn').click()`);
	check('the card leaves the page', !(await on(card(id1))));
	check('it is not counted, though it was finished', (await doneOf()) === `0 מתוך ${start - 1} מקורות`, await doneOf());
	const calls = () => A.evaluate(`[...document.querySelectorAll('#s1 .item')].slice(0, 3).map(el => el.querySelector('.call').textContent).join()`);
	check('it gives up its call number, and the next card takes it', (await calls()) === '1.01,,1.02', await calls());
	check('the topic head says so',(await A.evaluate(`document.querySelector('#s1 .topic-hidden').textContent`)) === 'מקור אחד מוסתר');
	check('focus goes to that line, which brings it back', await A.evaluate(`document.activeElement.matches('#s1 .topic-hidden')`));
	check('screen readers hear it', (await A.evaluate(`document.getElementById('arrange-status').textContent`)) === 'המקור הוסתר. בנושא הזה: מקור אחד מוסתר.');
	check('the chip appears with the count', (await on('[data-f="showHidden"]')) && (await A.evaluate(`document.querySelector('[data-f="showHidden"] .chip-n').textContent`)) === '1');

	// "הצג מוסתרים": it comes back faded, with its restore button
	await A.evaluate(`document.querySelector('#s1 .topic-hidden').click()`);
	check('the topic\'s count shows the hidden card, faded', (await on(card(id1))) && await A.evaluate(`document.querySelector('${card(id1)}').classList.contains('is-hidden')`));
	check('and the chip is on', (await A.evaluate(`document.querySelector('[data-f="showHidden"]').getAttribute('aria-pressed')`)) === 'true');
	check('shown, it is still not counted', (await total()) === start - 1);
	check('nor numbered', (await calls()) === '1.01,,1.02');
	check('its button now restores', (await A.evaluate(`document.querySelector('${card(id1)} .hide-btn').getAttribute('aria-label')`)).startsWith('החזרת המקור: '));
	await sleep(800);
	check('the account has it hidden, still finished', await server().then(p => p.layout.hiddenItems.includes(id1) && p.done.includes(id1)));

	// a second device follows; the friends list knows nothing of it
	const B = await browser.device({ width: 390, height: 900, mobile: true });
	await B.go(`${PAGE}#session=${T1}`, 2500);
	check('another device of mine hides it too', await B.evaluate(`document.querySelector('${card(id1)}').hidden`));
	const friends = await (await fetch(`${API}/friends`)).json();
	check('friends see the finished source, not that it is hidden', JSON.stringify(friends).includes(id1) && !JSON.stringify(friends).includes('hidden') && !JSON.stringify(friends).includes('layout'));

	// restore it from the card
	await A.evaluate(`document.querySelector('${card(id1)} .hide-btn').click()`);
	check('restoring brings it back, counted', !(await A.evaluate(`document.querySelector('${card(id1)}').classList.contains('is-hidden')`)) && (await total()) === start);
	check('the topic\'s count is gone', !(await on('#s1 .topic-hidden')));
	check('and its number is back', (await calls()) === '1.01,1.02,1.03');
	check('the other device follows, live', (await waitFor(() => B.evaluate(`!document.querySelector('${card(id1)}').hidden`))) >= 0);

	// a whole topic, from its drawer while arranging
	const s16 = await A.evaluate(`document.querySelectorAll('#s16 .item').length`);
	await A.evaluate(`document.querySelector('[data-f="showHidden"]').click()`); // off again
	await A.evaluate(`document.querySelector('.arrange').click(); document.querySelector('.toc a[href="#s16"]').parentElement.querySelector('[data-act="hide"]').click()`);
	check('a hidden topic leaves the page', !(await on('#s16')));
	check('while arranging, its drawer stays, marked', (await on('.toc a[href="#s16"]')) && await A.evaluate(`document.querySelector('.toc a[href="#s16"]').parentElement.classList.contains('is-hidden')`));
	check('its drawer, heading and cards have no number', (await A.evaluate(`[document.querySelector('.toc a[href="#s16"] .toc-num').textContent, document.querySelector('#s16 .topic-num').textContent, ...[...document.querySelectorAll('#s16 .call')].map(c => c.textContent)].join('')`)) === '');
	check('focus stays on its button, which now restores', await A.evaluate(`document.activeElement.dataset.act === 'hide' && document.activeElement.getAttribute('aria-label').startsWith('החזרת הנושא')`));
	check('its sources are not counted', (await total()) === start - s16);
	await A.evaluate(`document.querySelector('.toc a[href="#s16"]').parentElement.querySelector('[data-dir="-1"]').click()`);
	check('moved while hidden, it is still unnumbered, and screen readers hear its place in the whole order', (await A.evaluate(`document.querySelector('.toc a[href="#s16"] .toc-num').textContent`)) === '' && (await A.evaluate(`document.getElementById('arrange-status').textContent`)).endsWith(': מוסתר, מקום 15 מתוך 16'), await A.evaluate(`document.getElementById('arrange-status').textContent`));
	check('the topic it passed keeps the last number', (await A.evaluate(`document.querySelector('.toc a[href="#s15"] .toc-num').textContent`)) === '15');
	await A.evaluate(`document.querySelector('.arrange').click()`);
	check('out of the mode, the drawer is gone too', !(await on('.toc a[href="#s16"]')));
	await A.evaluate(`document.querySelector('[data-f="showHidden"]').click()`);
	check('"הצג מוסתרים" shows the topic, faded, with "החזרת הנושא"', (await on('#s16')) && (await A.evaluate(`document.querySelector('#s16 .topic-hidden').textContent`)) === 'החזרת הנושא');
	await A.evaluate(`document.querySelector('#s16 .topic-hidden').click()`);
	check('"החזרת הנושא" restores it', !(await A.evaluate(`document.getElementById('s16').classList.contains('is-hidden')`)) && (await total()) === start);
	await sleep(800);
	check('with nothing hidden, "הצג מוסתרים" turns itself off', await A.evaluate(`document.querySelector('[data-f="showHidden"]').hidden && document.querySelector('[data-f="showHidden"]').getAttribute('aria-pressed') === 'false'`));
	check('the account ends with nothing hidden', await server().then(p => !p.layout.hiddenItems.length && !p.layout.hiddenTopics.length));

	// every source of a topic hidden: the empty topic says why
	await A.evaluate(`for (const b of document.querySelectorAll('#s15 .hide-btn')) b.click()`);
	check('a topic with all its sources hidden says so', (await A.evaluate(`document.querySelector('#s15 .empty-note:not([hidden])')?.textContent`)) === 'כל המקורות בנושא הזה מוסתרים.');
}

