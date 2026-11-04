// Builds the study-plan artifact page from the markdown plan, so both stay identical.
import { readFileSync, writeFileSync } from 'node:fs';

// Usage: node build.mjs [md] [out]. Defaults: README.md and index.html next to this script.
const here = new URL('.', import.meta.url);
const mdPath = process.argv[2] || new URL('README.md', here);
const outPath = process.argv[3] || new URL('index.html', here);
const lines = readFileSync(mdPath, 'utf8').replace(/\r/g, '').split('\n');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ANCHORS = { '#בנק-סיפורי-star': '#star' };

// Inline markdown: `code`, [text](url) with nested brackets in text, **bold**.
function inline(src) {
  const codes = [];
  src = src.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  let out = '';
  let i = 0;
  while (i < src.length) {
    const close = src.indexOf('](', i);
    if (close === -1) { out += esc(src.slice(i)); break; }
    // walk back to the matching '['
    let depth = 0, open = -1;
    for (let j = close - 1; j >= i; j--) {
      if (src[j] === ']') depth++;
      else if (src[j] === '[') { if (depth === 0) { open = j; break; } depth--; }
    }
    const end = src.indexOf(')', close);
    if (open === -1 || end === -1) { out += esc(src.slice(i, close + 2)); i = close + 2; continue; }
    out += esc(src.slice(i, open));
    const text = src.slice(open + 1, close);
    let href = src.slice(close + 2, end);
    if (href.startsWith('#')) {
      href = ANCHORS[href] || (href.match(/^#(\d+)-/) ? '#s' + href.match(/^#(\d+)-/)[1] : undefined);
      out += href ? `<a href="${href}">${esc(text)}</a>` : esc(text);
    } else {
      out += `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
    }
    i = end + 1;
  }
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/⚠️\s*/g, '<span class="tag old" title="חומר ישן: העקרונות נכונים, שימו לב לתאריך">ישן</span> ');
  out = out.replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${esc(codes[+n])}</code>`);
  return out;
}

// ---------- document model ----------
const TIERS = {
  '🔥 עדיפות 1': { key: '1', label: 'עדיפות 1', sub: 'עולה כמעט בכל ריאיון. מתחילים כאן.' },
  '⭐ עדיפות 2': { key: '2', label: 'עדיפות 2', sub: 'נשאל לעתים קרובות, לפעמים לעומק.' },
  '➕ עדיפות 3': { key: '3', label: 'עדיפות 3', sub: 'מראה רוחב. בדרך כלל נשאל בקצרה.' },
  'לסיום': { key: 'end', label: 'לסיום', sub: 'סיפורים, שאלות למראיין והכנה אחרונה.' },
};
const END_IDS = { 'בנק סיפורי STAR': 'star', 'שאלות למראיין': 'ask', 'שבועיים לפני הריאיון': 'final' };

const intro = { note: '', how: [], status: [] };
const tiers = [];
let tier = null, section = null, sub = null, introKey = null;
const target = () => (sub ? sub.lines : section ? section.lines : null);

for (const line of lines.slice(1)) {
  let m;
  if ((m = line.match(/^# (.+)$/))) {
    tier = { ...TIERS[m[1].trim()], sections: [] };
    tiers.push(tier); section = null; sub = null; introKey = null; continue;
  }
  if ((m = line.match(/^## (.+)$/))) {
    const title = m[1].trim();
    if (!tier) {
      introKey = title.startsWith('איך') ? 'how' : title.startsWith('מצב') ? 'status' : null;
      continue;
    }
    const nm = title.match(/^(\d+)\. (.+)$/);
    section = nm
      ? { id: 's' + nm[1], num: nm[1], title: nm[2], lines: [], subs: [] }
      : { id: END_IDS[title], num: '', title, lines: [], subs: [] };
    tier.sections.push(section); sub = null; continue;
  }
  if ((m = line.match(/^### (.+)$/))) {
    sub = { title: m[1].trim(), lines: [] };
    section.subs.push(sub); continue;
  }
  if (line.trim() === '---') continue;
  if (!tier) {
    if (line.startsWith('> ') && !intro.note) intro.note = line.slice(2);
    else if (introKey) intro[introKey].push(line);
    continue;
  }
  if (target()) target().push(line);
}

// ---------- block rendering ----------
const DEPTHS = { '🟢': ['o', 'סקירה', 'עד חצי שעה'], '🟡': ['m', 'בינוני', 'שעה עד שלוש'], '🔴': ['d', 'עומק', 'קורס, תיעוד או ספר'] };
const seen = new Map();
let itemCount = 0;

function itemId(text) {
  const href = (text.match(/\]\((https?:[^)]+)\)/) || [])[1] || text;
  let h = 5381;
  for (const ch of href) h = ((h * 33) ^ ch.codePointAt(0)) >>> 0;
  const base = h.toString(36);
  const n = (seen.get(base) || 0) + 1;
  seen.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
}

// The item's own length, typed short for the card's length column: "40 דק'", "3 ש'", "15 סרט'".
// Text after "חלק מסדרה" describes the parent series, not this item, so it is ignored.
function itemLength(text) {
  const own = text.split('חלק מסדרה')[0].replace(/\]\([^)]*\)/g, ']');
  const m = own.match(/(\d+:\d{2}|\d+(?:[.,]\d+)?(?:–\d+)?)\s*(דקות|דקה|שעות|שעה|סרטונים)/);
  if (m) return `${m[1]} ${{ 'דקות': "דק'", 'דקה': "דק'", 'שעות': "ש'", 'שעה': "ש'", 'סרטונים': "סרט'" }[m[2]]}`;
  if (/כשעתיים|שעתיים/.test(own)) return "2 ש'";
  if (/כשעה|שעה אחת/.test(own)) return "1 ש'";
  return '';
}

function renderItem(text, ctx) {
  const video = /🎬/.test(text);
  const playlist = /^[^\]]*\]\(https:\/\/www\.youtube\.com\/playlist/.test(text.replace(/🎬\s*/g, ''));
  const body = inline(text.replace(/🎬\s*/g, ''));
  const id = itemId(text);
  itemCount++;
  // Call number: topic number plus the item's position in the topic (both tracks share one sequence).
  const call = ctx.num ? `${ctx.num}.${String(++ctx.counter.n).padStart(2, '0')}` : '';
  const title = (text.match(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(/) || [, text])[1].replace(/[*`]/g, '');
  const kind = video ? (playlist ? 'פלייליסט' : 'וידאו') : 'קריאה';
  return `<li class="item" data-id="${id}" data-tier="${ctx.tier}" data-depth="${ctx.depth}" data-video="${video ? 1 : 0}">` +
    `<span class="call">${call}</span>` +
    `<div class="item-body">${body}</div>` +
    `<span class="kind"><span class="tag${video ? ' video' : ''}">${kind}</span><span class="len">${itemLength(text)}</span></span>` +
    `<input type="checkbox" id="c-${id}" aria-label="${esc(`נלמד: ${title}`)}"><label for="c-${id}" class="box" aria-hidden="true"></label>` +
    `<span class="stamp" aria-hidden="true"></span></li>`;
}

// Parse list lines into a tree: {text, ordered, children}
function parseList(block) {
  const root = { children: [] };
  const stack = [{ indent: -1, node: root }];
  for (const l of block) {
    const m = l.match(/^(\s*)(-|\d+\.) (.*)$/);
    const indent = m[1].length;
    const node = { text: m[3], ordered: m[2] !== '-', children: [] };
    while (stack[stack.length - 1].indent >= indent) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  }
  return root.children;
}

function renderList(nodes, ctx) {
  // depth groups
  if (nodes.every(n => /^(🟢|🟡|🔴|רפרנס)/.test(n.text))) {
    return `<div class="sources">` + nodes.map(n => {
      const dm = n.text.match(/^(🟢|🟡|🔴)\s*(.*)$/);
      const [key, label, hint] = dm ? DEPTHS[dm[1]] : ['d', 'רפרנס', 'תיעוד ועדכונים רשמיים'];
      const extra = dm && dm[2] ? `<span class="depth-extra">${inline(dm[2])}</span>` : '';
      const c = { ...ctx, depth: key };
      return `<div class="depth-group" data-depth="${key}"><div class="depth-label"><span class="dot d-${key}"></span>${label}<span class="depth-hint">${hint}</span>${extra}</div>` +
        `<ul class="items">${n.children.map(ch => renderNode(ch, c)).join('')}</ul></div>`;
    }).join('') + `</div>`;
  }
  const tag = nodes[0].ordered ? 'ol' : 'ul';
  const allItems = nodes.every(n => n.text.startsWith('[ ] '));
  return `<${tag} class="${allItems ? 'items tasks' : 'prose-list'}">${nodes.map(n => renderNode(n, ctx)).join('')}</${tag}>`;
}

function renderNode(n, ctx) {
  if (n.text.startsWith('[ ] ')) return renderItem(n.text.slice(4), ctx);
  return `<li>${inline(n.text)}${n.children.length ? renderList(n.children, ctx) : ''}</li>`;
}

function renderTable(rows) {
  const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  return `<div class="table-wrap"><table><thead><tr>${head.map(h => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>` +
    body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') + `</tbody></table></div>`;
}

function renderBlocks(src, ctx) {
  let html = '';
  let i = 0;
  while (i < src.length) {
    const l = src[i];
    if (!l.trim()) { i++; continue; }
    if (/^\s*(-|\d+\.) /.test(l)) {
      const block = [];
      while (i < src.length && /^\s*(-|\d+\.) /.test(src[i])) block.push(src[i++]);
      html += renderList(parseList(block), ctx);
      continue;
    }
    if (l.startsWith('|')) {
      const block = [];
      while (i < src.length && src[i].startsWith('|')) block.push(src[i++]);
      html += renderTable(block);
      continue;
    }
    if (l.startsWith('> ')) { html += `<p class="callout">${inline(l.slice(2))}</p>`; i++; continue; }
    // bold-only line ending with a colon is a block heading
    const bm = l.match(/^\*\*([^*]+?):\*\*\s*(.*)$/);
    if (bm && !bm[2]) { html += `<h4>${inline(bm[1])}</h4>`; i++; continue; }
    if (bm) { html += `<p><strong class="lead">${inline(bm[1])}:</strong> ${inline(bm[2])}</p>`; i++; continue; }
    html += `<p>${inline(l)}</p>`; i++;
  }
  return html;
}

// Sources lead each topic: the prose before the first source list (why it matters, questions, practice) folds into
// a closed panel. The list starts at the heading right before the first depth group: a plain "מקורות" heading is
// dropped, a sub-part heading (3א., R1.) stays.
const SOURCES_HEAD = '<h4>מקורות</h4>';
function sourcesFirst(html) {
  const first = html.indexOf('<div class="sources">');
  if (first < 0) return html;
  let i = html.lastIndexOf('<h4>', first);
  if (i < 0 || html.indexOf('</h4>', i) + 5 !== first) i = first;
  const rest = html.startsWith(SOURCES_HEAD, i) ? html.slice(i + SOURCES_HEAD.length) : html.slice(i);
  const brief = html.slice(0, i);
  if (!brief.trim()) return rest;
  // The label names what the brief actually holds: its headings, plus practice when there is one.
  const parts = [...brief.matchAll(/<h4>([^<]+)<\/h4>/g)].map(m => m[1]);
  if (/<strong class="lead">תרגול:/.test(brief)) parts.push('תרגול');
  const label = parts.length ? `על הנושא: ${parts.join(', ')}` : 'על הנושא';
  return `<details class="brief"><summary>${label}</summary><div class="brief-body">${brief}</div></details>` + rest;
}

// Isolate Latin runs so mixed Hebrew/English drawer labels keep their order.
// A run ends on a letter, digit or ")"; trailing punctuation such as the "/" in "JS/דפדפן" stays outside.
const bdi = html => html.replace(/[A-Za-z][\w.+#-]*(?:[ ()/&+.:-]+[\w.+#-]+)*\)?/g, m => {
  const run = m.replace(/[^\w)]+$/, '');
  return `<bdi>${run}</bdi>${m.slice(run.length)}`;
});

function renderSection(s, t) {
  const ctx = { tier: t.key, depth: 'task', num: s.num, counter: { n: 0 } };
  let body = sourcesFirst(renderBlocks(s.lines, ctx));
  if (s.subs.length) {
    const tabs = s.subs.map((sb, k) => {
      const name = sb.title.replace(/^\S+\.\s*/, '').replace(/^מסלול\s*/, '');
      return { id: `${s.id}-tab-${k}`, name, html: sourcesFirst(renderBlocks(sb.lines, ctx)), key: name.toLowerCase() };
    });
    body += `<div class="tabs" data-tabs="${s.id}"><div class="tablist" role="tablist" aria-label="בחירת מסלול">` +
      tabs.map((tb, k) => `<button type="button" role="tab" id="${tb.id}" aria-controls="${tb.id}-panel" aria-selected="${k === 0}" tabindex="${k === 0 ? 0 : -1}" data-key="${tb.key}">` +
        `<span class="tab-name">מסלול ${tb.name}</span><span class="count" data-count-for="${tb.id}-panel"></span></button>`).join('') +
      `</div>` +
      tabs.map((tb, k) => `<div class="tabpanel" role="tabpanel" id="${tb.id}-panel" aria-labelledby="${tb.id}" tabindex="0"${k ? ' hidden' : ''}>${tb.html}</div>`).join('') +
      `</div>`;
  }
  return `<section class="topic" id="${s.id}" data-tier="${t.key}">` +
    `<header class="topic-head">${s.num ? `<span class="topic-num">${s.num}</span>` : ''}<h3>${inline(s.title)}</h3><span class="count" data-count-for="${s.id}"></span></header>` +
    `<div class="topic-body">${body}<p class="empty-note" hidden>אין כאן מקורות שמתאימים לסינון הנוכחי.</p></div></section>`;
}

const tiersHtml = tiers.map(t =>
  `<div class="tier" data-tier="${t.key}" id="tier-${t.key}"><div class="tier-head"><h2><span class="tier-tab">${t.label}</span><span class="tier-line">${t.sub}</span></h2><span class="count" data-count-for="tier-${t.key}"></span></div>` +
  t.sections.map(s => renderSection(s, t)).join('') + `</div>`).join('');

const toc = tiers.map(t =>
  `<div class="toc-group" data-tier="${t.key}"><div class="toc-tier">${t.label}</div><ol>` +
  t.sections.map(s => `<li><a href="#${s.id}">${s.num ? `<span class="toc-num">${s.num}</span>` : ''}<span class="toc-title">${bdi(inline(s.title))}</span><span class="toc-count" data-count-for="${s.id}"></span></a></li>`).join('') +
  `</ol></div>`).join('');

const howHtml = renderBlocks(intro.how, { tier: 'intro', depth: 'task' });
const statusHtml = renderBlocks(intro.status, { tier: 'intro', depth: 'task' });

const tpl = readFileSync(new URL('./template.html', import.meta.url), 'utf8');
const out = tpl
  .replace('{{NOTE}}', inline(intro.note))
  .replace('{{HOW}}', howHtml)
  .replace('{{STATUS}}', statusHtml)
  .replace('{{TOC}}', toc)
  .replace('{{TIERS}}', tiersHtml);
writeFileSync(outPath, out.replace(/\r?\n/g, '\r\n'));
console.log('items:', itemCount, 'sections:', tiers.reduce((a, t) => a + t.sections.length, 0), 'bytes:', Buffer.byteLength(out));
