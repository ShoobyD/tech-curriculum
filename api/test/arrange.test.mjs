// Arranging the topics by hand: the mode in the cabinet, up/down with the focus kept, dragging by
// the grip, the original order back, and the order saved to the account and seen on another device.
import { sleep, waitFor } from './helpers.mjs';

export default async function arrangeSuite({ API, PAGE, token, browser, check }) {
	const T1 = await token(1);
	const server = async () => (await fetch(`${API}/progress`, { headers: { Authorization: `Bearer ${T1}` } })).json();
	const DEFAULT = Array.from({ length: 16 }, (_, i) => `s${i + 1}`);

	const A = await browser.device();
	await A.go(`${PAGE}#session=${T1}`, 2500);
	const topicOrder = d => d.evaluate(`[...document.querySelectorAll('main .topic')].map(s => s.id)`);
	const drawerOrder = d => d.evaluate(`[...document.querySelectorAll('.toc li')].map(li => li.querySelector('a').getAttribute('href').slice(1))`);
	const shown = sel => A.evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); return !!el && el.getClientRects().length > 0; })()`);

	check('outside the mode: no grips or move buttons', !(await shown('.toc .grip')) && !(await shown('.toc .move button')));
	await A.evaluate(`document.querySelector('.arrange').click()`);
	check('"סידור" turns the mode on', (await A.evaluate(`document.querySelector('.arrange').getAttribute('aria-pressed')`)) === 'true' && await shown('.toc .grip') && await shown('.toc .move button'));
	check('in the default order, "סדר מקורי" is disabled', await A.evaluate(`document.querySelector('.reset-order').disabled && !document.querySelector('.reset-order').hidden`));
	check('the first drawer cannot go up, the last cannot go down', await A.evaluate(`document.querySelector('.toc li:first-child [data-dir="-1"]').disabled && document.querySelector('.toc li:last-child [data-dir="1"]').disabled`));

	// keyboard and touch: the buttons
	await A.evaluate(`(() => { const b = document.querySelector('.toc a[href="#s1"]').parentElement.querySelector('[data-dir="1"]'); b.focus(); b.click(); })()`);
	check('down moves the drawer one place', (await drawerOrder(A)).slice(0, 3).join() === 's2,s1,s3');
	check('the topics on the page follow', (await topicOrder(A)).slice(0, 3).join() === 's2,s1,s3');
	check('focus stays on the button that moved it', await A.evaluate(`document.activeElement.dataset.dir === '1' && document.activeElement.closest('li').querySelector('a').getAttribute('href') === '#s1'`));
	const numOf = (d, id) => d.evaluate(`[document.querySelector('.toc a[href="#${id}"] .toc-num').textContent, document.querySelector('#${id} .topic-num').textContent, document.querySelector('#${id} .call').textContent].join()`);
	check('the numbers follow: the topic now first is 1', (await numOf(A, 's2')) === '1,1,1.01');
	check('and the one moved down is 2, its cards too', (await numOf(A, 's1')) === '2,2,2.01', await numOf(A, 's1'));
	check('screen readers hear the new place',(await A.evaluate(`document.getElementById('arrange-status').textContent`)) === 'Frontend System Design: מקום 2 מתוך 16', await A.evaluate(`document.getElementById('arrange-status').textContent`));
	await A.evaluate(`document.activeElement.click()`);
	check('pressing again keeps moving it', (await drawerOrder(A)).slice(0, 3).join() === 's2,s3,s1');
	await A.evaluate(`document.querySelector('.toc a[href="#s2"]').parentElement.querySelector('[data-dir="-1"]').focus()`);
	check('"סדר מקורי" is enabled once the order changed', await A.evaluate(`!document.querySelector('.reset-order').disabled`));

	// a mouse (or a finger): drag s16 by its grip to the top
	const [from, to] = await A.evaluate(`(() => {
		const cab = document.querySelector('.cabinet');
		const li = document.querySelector('.toc a[href="#s16"]').parentElement;
		li.scrollIntoView({ block: 'center' });
		const g = li.querySelector('.grip').getBoundingClientRect();
		const first = document.querySelector('.toc li').getBoundingClientRect();
		return [[g.x + g.width / 2, g.y + g.height / 2], [g.x + g.width / 2, first.y + 4]];
	})()`);
	await A.drag(from[0], from[1], to[0], to[1], 40);
	await sleep(300);
	let order = await drawerOrder(A);
	check('dragging a drawer by its grip moves it', order[0] === 's16' || order[1] === 's16', order.join());
	check('the page follows the drag', (await topicOrder(A)).join() === order.join());
	check('nothing stays mid-drag', await A.evaluate(`!document.querySelector('.toc li.dragging') && !document.documentElement.classList.contains('dragging-drawer')`));

	await sleep(1000);
	check('the order is saved to the account', (await server()).layout.order.join() === order.join());
	await A.reload(2500);
	check('and stays after a reload', (await topicOrder(A)).join() === order.join());

	// another device of mine follows live, and so does the cabinet there
	const B = await browser.device({ width: 390, height: 900, mobile: true });
	await B.go(`${PAGE}#session=${T1}`, 2500);
	check('a second device opens in my order', (await topicOrder(B)).join() === order.join());
	check('with the same numbers', (await numOf(B, order[0])) === '1,1,1.01' && (await numOf(B, 's16')) === (await numOf(A, 's16')));
	await A.evaluate(`document.querySelector('.arrange').click(); document.querySelector('.reset-order').click()`);
	check('"סדר מקורי" restores the default here', (await topicOrder(A)).join() === DEFAULT.join() && (await A.evaluate(`document.getElementById('arrange-status').textContent`)) === 'הסדר המקורי הוחזר');
	const t = await waitFor(async () => (await topicOrder(B)).join() === DEFAULT.join() && (await drawerOrder(B)).join() === DEFAULT.join());
	check('and on the other device, live', t >= 0, `${t} ms`);
	check('the account holds no order any more', (await server()).layout.order.length === 0);
	check('the original numbers are back', (await numOf(A, 's1')) === '1,1,1.01' && (await numOf(A, 's16')) === '16,16,16.01');

	// the phone: in the mode the strip becomes a list, and the buttons work there too
	await B.evaluate(`document.querySelector('.arrange').click()`);
	check('phone: the drawers stack in the mode', await B.evaluate(`getComputedStyle(document.querySelector('.toc ol')).display === 'grid'`));
	await B.evaluate(`document.querySelector('.toc a[href="#s3"]').parentElement.querySelector('[data-dir="-1"]').click()`);
	check('phone: up moves it', (await topicOrder(B)).slice(0, 3).join() === 's1,s3,s2');
	await B.evaluate(`document.querySelector('.arrange').click()`);
	check('"סיום" leaves the mode', await B.evaluate(`document.querySelector('.arrange').getAttribute('aria-pressed') === 'false' && document.querySelector('.reset-order').hidden`));
}

