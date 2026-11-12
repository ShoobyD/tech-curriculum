// The plan's desk (how to use and tool status as dialogs) and the separate interview prep page.
export default async function pagesSuite({ SITE, PAGE, browser, check }) {
	const A = await browser.device();
	await A.go(PAGE);
	const open = id => A.evaluate(`document.getElementById('${id}').open`);
	const focused = () => A.evaluate(`(document.activeElement.dataset.open || document.activeElement.closest('dialog')?.id || document.activeElement.tagName)`);

	check('the desk has three entries', (await A.evaluate(`[...document.querySelectorAll('.desk .desk-btn')].map(b => b.textContent.trim().split(/\\s/)[0]).join()`)) === 'איך,מצב,הכנה');
	check('the prep entry is a link to prep.html', (await A.evaluate(`document.querySelector('.desk a').getAttribute('href')`)) === 'prep.html');
	check('the old panels at the bottom are gone', await A.evaluate(`!document.querySelector('details.panel')`));

	await A.evaluate(`document.querySelector('[data-open="how"]').focus(); document.querySelector('[data-open="how"]').click()`);
	check('"how to use" opens as a modal dialog', (await open('how')) && await A.evaluate(`document.getElementById('how').matches(':modal')`));
	check('focus moves into it', (await focused()) === 'how', await focused());
	await A.key('Escape');
	check('Esc closes it', !(await open('how')));
	check('focus returns to its button', (await focused()) === 'how', await focused());

	await A.evaluate(`document.querySelector('[data-open="status"]').click()`);
	check('"tool status" opens, with the table from the README', (await open('status')) && await A.evaluate(`document.querySelectorAll('#status tbody tr').length > 5`));
	await A.evaluate(`document.querySelector('#status [data-close]').click()`);
	check('the close button closes it', !(await open('status')));

	await A.evaluate(`document.querySelector('[data-open="status"]').click()`);
	await A.tap(8, 500);
	check('a click on the backdrop closes it', !(await open('status')));

	await A.go(`${PAGE}#status`);
	check('a link to #status opens it on load', await open('status'));
	await A.key('Escape');
	check('closing it clears #status from the address', !(await A.evaluate('location.href')).includes('#status'));

	// the prep page: its own checklist, kept in this browser
	await A.go(`${SITE}/prep.html`);
	check('prep page: three sections', (await A.evaluate(`[...document.querySelectorAll('.topic')].map(s => s.id).join()`)) === 'star,ask,final');
	check('prep page: 8 checklist cards, no reading/video tags', (await A.evaluate(`document.querySelectorAll('.item').length`)) === 8 && await A.evaluate(`!document.querySelector('.item .tag')`));
	await A.evaluate(`document.querySelectorAll('.item .box')[2].click()`);
	await A.reload();
	check('prep page: a tick survives a reload, with its stamp', await A.evaluate(`document.querySelectorAll('.item')[2].classList.contains('is-done') && document.querySelectorAll('.item .stamp')[2].textContent.length > 0`));
	check('prep page: the drawer counts it', (await A.evaluate(`document.querySelector('.toc-count[data-count-for="final"]').textContent`)) === '1/8');
	check('prep page: stored apart from the plan', await A.evaluate(`JSON.parse(localStorage.getItem('tl-prep-v1')).done.length === 1 && !localStorage.getItem('tl-plan-progress-v1')`));
	check('prep page: the tool status link opens the dialog on the plan', (await A.evaluate(`[...document.querySelectorAll('a')].find(a => a.textContent === 'מצב הכלים').getAttribute('href')`)) === './#status');
}

