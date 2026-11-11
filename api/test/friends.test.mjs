// Friends' photos on the cards: counts, order, "+N", the letter fallback, never yourself.
export default async function friendsSuite({ API, ORIGIN, PAGE, SITE, token, ids, browser, check }) {
	const T = await Promise.all([1, 2, 3, 4, 5].map(token));
	const t0 = 1762000000000;
	const put = (t, done) => fetch(`${API}/progress`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${t}`, Origin: ORIGIN, 'Content-Type': 'application/json' },
		body: JSON.stringify({ done: Object.keys(done), dates: done }),
	});
	// card 0: users 2, 3, 4, 5 (4 newest)   card 1: user 2   card 2: users 2 and 5 (no avatar)
	// card 3: users 1, 2, 3                 card 4: nobody
	await put(T[0], { [ids[3]]: t0 + 9 });
	await put(T[1], { [ids[0]]: t0 + 1, [ids[1]]: t0 + 1, [ids[2]]: t0 + 1, [ids[3]]: t0 + 1 });
	await put(T[2], { [ids[0]]: t0 + 2, [ids[3]]: t0 + 2 });
	await put(T[3], { [ids[0]]: t0 + 8 });
	await put(T[4], { [ids[0]]: t0 + 3, [ids[2]]: t0 + 3 });

	const clusters = d => d.evaluate(`[...document.querySelectorAll('.item')].slice(0, 5).map(el => {
		const f = el.querySelector('.friends');
		return f ? { faces: f.querySelectorAll('.friend').length, more: f.querySelector('.friends-more')?.textContent || '', label: f.title, tags: [...f.querySelectorAll('.friend')].map(x => x.tagName) } : null;
	})`);

	const A = await browser.device();
	await A.go(`${PAGE}#session=${T[0]}`, 2500);
	let c = await clusters(A);
	check('4 friends: 3 photos and +1', c[0]?.faces === 3 && c[0].more === '+1', JSON.stringify(c[0]));
	check('whoever finished last comes first', c[0]?.label.startsWith('סיימו: עומר (פיתוח), מאיה (פיתוח)'), c[0]?.label);
	check('1 friend: one photo', c[1]?.faces === 1 && c[1].more === '');
	check('no avatar: a letter instead', [...(c[2]?.tags ?? [])].sort().join() === 'IMG,SPAN', JSON.stringify(c[2]));
	check('I am not in my own cluster', c[3]?.faces === 2 && !c[3].label.includes('דנה'), JSON.stringify(c[3]));
	check('nobody: no cluster', c[4] === null);
	check('screen readers get the names', (await A.evaluate(`document.querySelector('.item .friends .sr')?.textContent || ''`)).startsWith('סיימו:'));
	check('the checkbox column stays aligned', await A.evaluate(`(() => { const xs = [...document.querySelectorAll('.item')].slice(0, 5).map(el => Math.round(el.querySelector('.box').getBoundingClientRect().left)); return xs.every(x => x === xs[0]); })()`));

	const B = await browser.device();
	await B.go(PAGE);
	c = await clusters(B);
	check('a guest sees everyone, user 1 included', c[3]?.faces === 3, JSON.stringify(c[3]));

	const D = await browser.device();
	await D.go(`${SITE}/?api=http://localhost:1`);
	check('API unreachable: no clusters', (await D.evaluate(`document.querySelectorAll('.friends').length`)) === 0);
}

