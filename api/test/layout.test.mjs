// My own layout on the page: topic order and hidden topics and sources, from the account or this
// browser, applied on load and kept out of every count. (Arranging and hiding by hand come later.)
import { sleep, waitFor } from './helpers.mjs';

export default async function layoutSuite({ API, ORIGIN, PAGE, token, browser, check }) {
	const T1 = await token(1), T2 = await token(2);
	const put = (t, body) => fetch(`${API}/progress`, { method: 'PUT', headers: { Authorization: `Bearer ${t}`, Origin: ORIGIN, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
	const server = async t => (await fetch(`${API}/progress`, { headers: { Authorization: `Bearer ${t}` } })).json();
	const DEFAULT = Array.from({ length: 16 }, (_, i) => `s${i + 1}`);
	const empty = { order: [], hiddenTopics: [], hiddenItems: [] };

	const A = await browser.device();
	const topicOrder = d => d.evaluate(`[...document.querySelectorAll('main .topic')].map(s => s.id)`);
	const drawerOrder = d => d.evaluate(`[...document.querySelectorAll('.toc a')].map(a => a.getAttribute('href').slice(1))`);
	const doneOf = d => d.evaluate(`document.getElementById('done-of').textContent`);
	const visible = (d, sel) => d.evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); return !!el && !el.closest('[hidden]'); })()`);

	// no layout: the plan as built
	await A.go(PAGE);
	check('no layout: default topic order', (await topicOrder(A)).join() === DEFAULT.join());
	check('no layout: the dialogs stay after the topics', await A.evaluate(`document.querySelector('main .topic:last-of-type').nextElementSibling.matches('dialog')`));
	const total = Number((await doneOf(A)).match(/מתוך (\d+)/)[1]);
	const counts = await A.evaluate(`Object.fromEntries([...document.querySelectorAll('.topic')].map(s => [s.id, s.querySelectorAll('.item').length]))`);
	const [i0, i1] = await A.evaluate(`[...document.querySelectorAll('#s1 .item')].slice(0, 2).map(el => el.dataset.id)`);

	// the account's layout, on a device that logs in for the first time
	const order = ['s3', 's1', 's2', ...DEFAULT.slice(3).reverse()];
	await put(T1, { done: [i0, i1], dates: {}, layout: { order, hiddenTopics: ['s16'], hiddenItems: [i0] } });
	await A.go(`${PAGE}#session=${T1}`, 2500);
	check("first login: the account's order", (await topicOrder(A)).join() === order.join(), (await topicOrder(A)).join());
	check('the drawers follow', (await drawerOrder(A)).join() === order.join());
	check('a hidden topic leaves the page and the cabinet', !(await visible(A, '#s16')) && !(await visible(A, '.toc a[href="#s16"]')));
	check('a hidden source leaves its topic', !(await visible(A, `.item[data-id="${i0}"]`)) && await visible(A, `.item[data-id="${i1}"]`));
	const expectTotal = total - counts.s16 - 1;
	check('hidden sources are not counted', (await doneOf(A)) === `1 מתוך ${expectTotal} מקורות`, await doneOf(A));
	check('the percentage counts only what is shown', (await A.evaluate(`document.getElementById('pct').textContent`)) === `${Math.round(100 / expectTotal)}%`);
	const nums = d => d.evaluate(`Object.fromEntries([...document.querySelectorAll('.topic')].map(s => [s.id, [document.querySelector('.toc a[href="#' + s.id + '"] .toc-num').textContent, s.querySelector('.topic-num').textContent]]))`);
	const n = await nums(A);
	check('the numbers follow the saved order, drawer and heading alike', ['s3', 's1', 's2', 's15'].every((id, i) => n[id].join() === `${i + 1},${i + 1}`), JSON.stringify(n).slice(0, 160));
	check('a hidden topic has no number', n.s16.join() === ',');
	const subs = id => A.evaluate(`[...document.querySelectorAll('#${id} .sub-num')].map(h => h.textContent).join()`);
	check('sub-part headings take their topic\'s new number', (await subs('s3')) === '1א.,1ב.,1ג.,1ד.,1ה.', await subs('s3'));
	check('and a hidden topic\'s have none', (await subs('s16')) === ',,,,');
	check("a hidden source has no call number, and the next card takes its place", (await A.evaluate(`[${JSON.stringify(i0)}, ${JSON.stringify(i1)}].map(id => document.querySelector('.item[data-id="' + id + '"] .call').textContent).join()`)) === ',2.01');
	check("the topic's own count too",(await A.evaluate(`document.querySelector('.toc-count[data-count-for="s1"]').textContent`)) === `1/${counts.s1 - 1}`);

	// a tick on this device saves the progress with the layout, untouched
	await A.click(await A.evaluate(`[...document.querySelectorAll('.item')].findIndex(el => el.dataset.id === ${JSON.stringify(i1)})`));
	await sleep(1200);
	const after = await server(T1);
	check('a save carries the layout unchanged', JSON.stringify(after.layout) === JSON.stringify({ order, hiddenTopics: ['s16'], hiddenItems: [i0] }) && !after.done.includes(i1));

	// my other device changes the layout: this one follows without a reload
	await put(T1, { done: after.done, dates: after.dates, layout: { ...empty, hiddenTopics: ['s2'] } });
	const t = await waitFor(async () => (await topicOrder(A)).join() === DEFAULT.join() && !(await visible(A, '#s2')) && await visible(A, '#s16'));
	check('a layout changed on another device arrives live', t >= 0, t >= 0 ? `${t} ms` : 'timed out ' + JSON.stringify(await A.evaluate(`({o: [...document.querySelectorAll('main .topic')].map(s => s.id + (s.hidden ? '-h' : '')).join(), st: document.getElementById('save-status').textContent, ls: localStorage.getItem('tl-plan-layout-v1'), p: localStorage.getItem('tl-plan-progress-v1').slice(-60)})`)));

	// a friend's layout never touches mine
	await put(T2, { done: [i0], layout: { order: [...DEFAULT].reverse(), hiddenTopics: ['s1'], hiddenItems: [] } });
	await sleep(1500);
	check("a friend's layout doesn't change mine", (await topicOrder(A)).join() === DEFAULT.join() && await visible(A, '#s1'));

	// a guest: the layout lives in this browser
	const B = await browser.device();
	await B.go(PAGE);
	await B.evaluate(`localStorage.setItem('tl-plan-layout-v1', JSON.stringify({ order: ['s2', 's1'], hiddenTopics: [], hiddenItems: [${JSON.stringify(i1)}] }))`);
	await B.reload();
	check("guest: this browser's layout applies", (await topicOrder(B)).slice(0, 3).join() === 's2,s1,s3' && !(await visible(B, `.item[data-id="${i1}"]`)));
	// first login with an empty account: this browser's layout goes up
	const T3 = await token(3);
	await B.go(`${PAGE}#session=${T3}`, 3000);
	const up = await server(T3);
	check("first login, empty account: this browser's layout is uploaded", up.layout.order.slice(0, 2).join() === 's2,s1' && up.layout.hiddenItems.includes(i1), JSON.stringify(up.layout).slice(0, 120));
}

