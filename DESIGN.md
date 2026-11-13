---
name: tech-curriculum
description: A library card catalogue for a free, video-first study plan for technical interviews.
colors:
  oak-0: "#0f241d"
  oak-1: "#1a3a30"
  oak-front: "#24493c"
  oak-front-on: "#2f5d4d"
  oak-edge: "#08140f"
  brass: "#c9a352"
  holder: "#efe6cc"
  holder-ink: "#10241d"
  seal: "#e9c46a"
  cab-ink: "#eef3ec"
  cab-muted: "#a9c3b5"
  ground: "#e7eae3"
  card: "#fefefb"
  ink: "#19201c"
  muted: "#536059"
  line: "#ccd3c9"
  rule-red: "#c4432f"
  rule-blue: "#c8d9e3"
  link: "#1f4f8a"
  stamp: "#7b2a6c"
  stamp-soft: "#f3e5ef"
typography:
  display:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  brand:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "27px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-card:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "26px"
  label:
    fontFamily: "Miriam Libre, Segoe UI, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.65
  call-number:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: "26px"
    fontFeature: "tnum"
  topic-number:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tnum"
  meta:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  stamp:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  card: "2px"
  drawer: "3px"
  stamp: "4px"
  depth-tab: "6px"
  track-tab: "8px"
  round: "50%"
spacing:
  item-gap: "8px"
  card-inset: "16px"
  source-gap: "22px"
  topic-gap: "44px"
  section-gap: "72px"
  desk-gap: "10px"
  card-rule: "26px"
  rail-width: "312px"
  field-max: "920px"
components:
  index-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-card}"
    rounded: "{rounded.card}"
    padding: "14px 16px 13px"
  drawer-front:
    backgroundColor: "{colors.oak-front}"
    textColor: "{colors.cab-ink}"
    rounded: "{rounded.drawer}"
    padding: "6px 8px 7px"
  drawer-front-current:
    backgroundColor: "{colors.oak-front-on}"
    textColor: "{colors.cab-ink}"
  label-holder:
    backgroundColor: "{colors.holder}"
    textColor: "{colors.holder-ink}"
    rounded: "{rounded.card}"
    padding: "3px 9px"
  palette-swatch:
    rounded: "{rounded.round}"
    size: "24px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.drawer}"
    padding: "7px 10px"
  chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  desk-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px 16px 10px"
  dialog-sheet:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.card}"
    width: "760px"
  move-button:
    backgroundColor: "{colors.oak-front}"
    textColor: "{colors.cab-ink}"
    rounded: "{rounded.drawer}"
    size: "26px"
  hide-control:
    textColor: "{colors.muted}"
    rounded: "{rounded.card}"
    size: "28px"
  track-tab:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.track-tab}"
    padding: "11px 16px 9px"
  track-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  date-stamp:
    textColor: "{colors.stamp}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "5px 9px 4px"
  progress-seal:
    textColor: "{colors.seal}"
    rounded: "{rounded.round}"
    size: "112px"
  type-tag-video:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "4px 6px 3px"
  reader-card:
    backgroundColor: "{colors.holder}"
    textColor: "{colors.holder-ink}"
    rounded: "{rounded.card}"
    padding: "10px 12px 8px"
  reader-photo:
    rounded: "{rounded.card}"
    size: "40px"
  friend-photo:
    rounded: "{rounded.card}"
    size: "22px"
---

# Design System: tech-curriculum

## Overview

**Creative North Star: "The Card Catalogue"**

The study plan is a library card catalogue on a reading-room table. A wooden cabinet holds one drawer per topic, each with a brass label holder; the open drawer is the reading field, where every source is a ruled index card with its own call number. Finishing a source is a library date stamp, inked and slightly crooked. The drawers have no fixed rank: each reader rearranges them in the cabinet and pulls out the cards and drawers they don't need, and those leave the catalogue (and every count) until shown again. A row of small index cards on the desk above the drawers opens the how-to and the tool status as cards lifted off the desk, and leads to a separate prep page in the same materials.

Density is a reference tool's, not a dashboard's: every card keeps the same columns (call number, body, type and length, stamp, box, friends) so the eye scans down a drawer without re-reading layout. The catalogue is shared by a circle of friends: a reader who logs in carries a reader's card in the cabinet, and each index card shows the small ID photos of the friends who already stamped it. Ornament comes only from the catalogue's own materials (painted wood, brass, card stock, printed ruling, ink), and those materials now carry real surface: paper fibre, wood grain lit from above, framed label slips, ink that bites unevenly into the card. The page is Hebrew and right-to-left; English titles, call numbers and dates sit inside it as isolated left-to-right runs.

The cabinet comes in four finishes the reader picks from a swatch row in the cabinet header: the green reading room (default), oak, steel and navy. Each finish recolours the same token names, and each has a night version: wood deeper, cards dimmed, inks brighter. The frontmatter records the green reading room in daylight; the other finishes and every dark value live in the sidecar. The world refuses the default learning-tracker look: no sidebar of percentage bars, no soft rounded cards, no blue progress bars.

**Key Characteristics:**
- Wood-grained cabinet rail (right side, sticky) beside a paper-grained reading field.
- Index cards with a red head rule and blue ruling at a 26px line pitch, on fibred card stock that lifts slightly under the pointer.
- Call numbers in Courier Prime as each card's first, largest mark.
- Topics in the reader's own order, arranged in the cabinet; hidden cards and drawers leave the page and every count, and come back faded and dashed.
- Done is a rotated, ink-bitten date stamp with the real date; overall progress is a round library seal.
- Four cabinet finishes (green, oak, steel, navy) behind one set of token names.
- A reader's card (a framed paper slip with a square ID photo) for the logged-in friend, and stacked square ID photos of friends on the cards they finished.

## Colors

Painted-wood and paper neutrals, and one stamp ink that means "done". Values below describe the default green reading room; the token names are shared by every finish (the cabinet tokens keep their historical oak-* names in all four).

### Primary
- **Plum Stamp Ink** (stamp): the ink of the date stamp, the checked box, a done card's call number, a completed count, focus rings, caret and the selection background (selected text turns Card Stock). It marks the reader's own actions on the catalogue.
- **Seal Gilt** (seal): the brighter ink used only for the round progress seal on the dark cabinet, where the stamp ink would sink.
- **Plum Wash** (stamp-soft): the faint stamp tint behind inline code and callout notes.

### Secondary
- **Head Rule Red** (rule-red) and **Ruling Blue** (rule-blue): the printed lines of the index card stock. They are card material, never text or interface colour.
- **Catalogue Link Blue** (link): link text in the reading field.

### Neutral
- **Cabinet Shadow** (oak-0) and **Bottle Green** (oak-1): the cabinet body, a top-lit gradient from oak-1 down to oak-0 under the wood grain.
- **Drawer Front** (oak-front) and **Drawer Pulled** (oak-front-on): drawer faces at rest, and when hovered or current. **Cabinet Seam** (oak-edge) is the cabinet's edge line.
- **Brass** (brass): the label-holder frame, the rule above each drawer number, and the page scrollbar thumb.
- **Holder Slip** (holder) with **Holder Ink** (holder-ink): the paper slip inside each brass holder.
- **Cabinet Ink** (cab-ink) and **Cabinet Muted** (cab-muted): text on the cabinet.
- **Reading Table** (ground): the page ground behind the cards.
- **Card Stock** (card): index cards, desk cards, dialogs, chips and tabs at rest.
- **Ink** (ink), **Faded Ink** (muted), **Pencil Line** (line): text, secondary text, and dividers or borders in the reading field.

### The Four Finishes
- **Green reading room** (default, no attribute): bottle-green cabinet, brass, gilt seal, plum stamp ink.
- **Oak** (data-palette="oak"): oak cabinet, brass, lilac seal, violet stamp ink.
- **Steel** (data-palette="steel"): slate powder-coat cabinet, chrome holder frames, orange seal, orange-red stamp ink.
- **Navy** (data-palette="navy"): midnight-blue cabinet, gold, gold seal, red stamp ink.

### Named Rules
**The Stamp Ink Rule.** The stamp ink means the reader did something: done, focused, selected. It never decorates headings or navigation chrome, in any finish.

**The One Channel Rule.** Each variable has exactly one visual channel. Depth is the fill of a ring (empty, half, full) in the current text colour; done is the stamp; hidden is a fade with a dashed edge. Never colour-code depth.

**The Card Stock Rule.** Head-rule red and ruling blue belong to the card's printed lines only (the desk cards and dialog heads reuse the head rule as card stock, never as a signal).

**The Same Names Rule.** A finish is a set of values under the shared token names, defined for light and dark. Surfaces use tokens only; the one place palette-literal colours appear is a swatch face, which previews its finish (cabinet colour against seal or brass, split diagonally). A finish sets the cabinet, paper and ink values for both light and dark.

**The Reader's Finish Rule.** The finish is a reader preference: chosen from the swatch row, saved with the other preferences, and applied before first paint as an attribute on the root. The default finish carries no attribute, so a page with no stored preference paints green with no flash.

## Typography

**Display Font:** Miriam Libre (with Segoe UI, Arial)
**Body Font:** Miriam Libre (with Segoe UI, Arial)
**Label/Mono Font:** Courier Prime (with Courier New)

**Character:** Miriam Libre is the catalogue's Hebrew voice for titles and prose; Courier Prime is the typewriter that filled in the cards: call numbers, counts, lengths, dates and the stamp.

### Hierarchy
- **Display** (700, 22px, 1.25; 19px on phone): the title of a dialog card.
- **Brand** (700, 27px, 1.15; 21px on phone): the plan title on the cabinet.
- **Headline** (700, 24px, 1.25; 20px on phone): topic heading, beside the topic number.
- **Call number** (Courier Prime 700, 21px on the 26px card line; 18px on phone): each card's headline.
- **Topic number** (Courier Prime 700, 26px, 1; 21px on phone): the drawer number beside a topic heading, in Faded Ink.
- **Body** (400, 16px, 1.65): prose in the reading field, capped at 70ch. Card body runs at 15px on the 26px ruling.
- **Meta** (Courier Prime 400, 13px): counts and item lengths; 12px for drawer counts in the cabinet.
- **Label** (700, 12px): filter group labels, table headers, the cabinet's "נושאים" label and its arranging actions; the swatch-row label is 12px regular in Cabinet Muted. Type tags are 11px 700. Desk cards are 15px 700 (14px on phone).
- **Stamp** (Courier Prime 700, 14px, 0.08em tracking, uppercase month): the date stamp.

### Named Rules
**The Typewriter Rule.** Every number a visitor scans (call number, topic number, count, length, date, percentage) is Courier Prime with tabular figures. Prose and titles never are.

**The Isolated Run Rule.** English, numbers and dates inside Hebrew are set left-to-right and isolated (ltr direction or a bdi run), so a call number like 3.12 never flips.

## Layout

Desktop is a two-column shell: a sticky, full-height cabinet rail on the right that scrolls on its own, and the reading field on the left, centred at its maximum width with max(16px, 3vw) side padding. The cabinet header stacks the title, the swatch row (four 24px swatches, 8px apart) and the subtitle; below it come the ledger (seal, count, sync status line) and the reader's card, then the drawers under a "נושאים" row that holds the arranging toggle. A sticky, lightly blurred filter bar sits at the top of the field; below it, before the opening note and the first topic, the desk row of three small index cards (how to use, tool status, interview prep).

Vertical rhythm is set in catalogue units: section-gap before the footer, topic-gap between topics, source-gap between depth groups, item-gap between index cards, desk-gap between desk cards. Card content snaps to the card-rule line pitch.

The index card is a fixed six-column grid on desktop (call number 70px, body, type 72px, stamp 118px, box 28px, friends 76px). In right-to-left order the friends column is the last, on the far left, beside the box. The hide control sits in the box column, under the checkbox, so the columns never move (a one-line card grows by about 10px to hold it).

At 900px and below the cabinet becomes a static header: title and swatches share one wrapping row (the swatch label hides), a 72px seal, the reader's card as one compact row (photo, name, actions stacked at the end) with its guest note hidden, and the drawers as a horizontal scroll-snapped strip; in arranging mode the strip becomes a vertical list, so up and down mean what they say. Filters become one scrolling row that fades out at the far edge; the desk cards wrap onto two lines and drop the tool-status date. Cards reflow to call number and box on the first line, body below, type and length on a third line with the friends' photos and then the hide control at the far end of that line; the stamp overlays the call-number line. Dialogs take the width less 12px on each side, up to 88% of the height.

### Named Rules
**The Fixed Columns Rule.** Every index card in a drawer uses the same column grid; a missing value leaves its column empty rather than letting the others shift.

## Elevation & Depth

Depth is physical and layered: every surface reads as the material it is. The ground and every card carry a fine SVG-noise paper fibre; the cabinet and each drawer front carry a stretched wood grain over a top-lit gradient (light falling from above, a faint diagonal sheen on the cabinet, an inset shadow along its inner edge). Label holders are framed slips: a brass ring with a dark outer hairline and an inset shadow so the slip sits behind the frame. The stamp and the seal are masked with an ink-bite noise so the ink takes unevenly. Shadows are soft and stacked (a contact line, a short drop, a long ambient fall), all in neutral black so they work on every finish. There are no hard offset shadows and no glows.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 1px 1px rgba(0,0,0,.07), 0 3px 6px -2px rgba(0,0,0,.10), 0 14px 26px -14px rgba(0,0,0,.40)`): index cards at rest.
- **Card lift, hover** (`box-shadow: 0 2px 2px rgba(0,0,0,.08), 0 8px 14px -6px rgba(0,0,0,.16), 0 22px 36px -16px rgba(0,0,0,.45)`): an index card under the pointer, with a 2px rise.
- **Desk card** (the card lift, and the hover lift with a 2px rise): the desk row's buttons.
- **Dialog** (`box-shadow: 0 2px 4px rgba(0,0,0,.18), 0 34px 70px -24px rgba(0,0,0,.7)`): a card lifted off the desk, over a backdrop of the cabinet shadow at 64%.
- **Dragged drawer** (`box-shadow: 0 18px 28px -10px rgba(0,0,0,.85)`): a drawer held by its grip, lifted, slid 10px out and tilted -1deg.
- **Drawer at rest** (`box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 4px 8px -3px rgba(0,0,0,.65), 0 1px 2px rgba(0,0,0,.4)`): drawer fronts.
- **Drawer pulled** (`box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 14px 22px -8px rgba(0,0,0,.8), 0 2px 4px rgba(0,0,0,.45)`): the current drawer, with a 22px slide out of the cabinet.
- **Holder frame** (`box-shadow: 0 0 0 2px var(--brass), 0 0 0 3px rgba(0,0,0,.35), inset 0 1px 3px rgba(0,0,0,.28)`): the label holder's brass frame and recessed slip.
- **Chip** (`box-shadow: 0 1px 2px rgba(0,0,0,.10)`; pressed: `inset 0 1px 2px rgba(0,0,0,.35)`): filter chips sit up at rest and press in when on.

### Named Rules
**The Material Depth Rule.** Depth comes only from the catalogue's materials: paper fibre on paper, wood grain on the cabinet, a recessed slip in a brass frame, ink that bites. Textures are low-opacity SVG noise drawn in the page, never photographs or raster files, and gradients are limited to light falling from above.

**The Pulled Drawer Rule.** Raised depth answers the reader. The drawer for the topic in view slides out and deepens its shadow; a drawer held by its grip lifts and tilts; an index card or desk card under the pointer rises 2px into the hover lift. Nothing else in the reading field moves, and under reduced motion the cards do not rise.

## Shapes

Corners are nearly square, like cut card stock: card radius for index cards, label holders, tags and the checkbox; drawer radius for drawer fronts, chips, the arranging buttons and focus rings; stamp radius for the date stamp. Tabs are the one rounded silhouette: the Vue/React track tabs round their top corners only at track-tab radius, depth-group tabs at depth-tab radius. Full circles are reserved for the progress seal, the depth rings and the palette swatches; people's photos are square-cornered ID photos at card radius, never circles.

The first card under a depth tab loses its top-start corner so tab and card read as one piece. Card ruling is drawn with background gradients, never borders.

## Components

### Index Card (signature)
Fibred card stock with a red head rule near the top and blue ruling every 26px, the card lift, near-square corners. Columns: call number, body (title link bold), type tag over length, stamp, checkbox, friends' photos. On hover it rises 2px into the hover lift over 0.35s `cubic-bezier(.16,1,.3,1)`. A done card fades its body text to Faded Ink and turns its call number to the stamp ink.

### Date Stamp (signature)
A double-ruled box in the stamp ink (2.5px border plus a 1px outline 2px out) with an uppercase Courier date such as "4 NOV 2026", rotated -7deg at 0.82 opacity, masked with the ink bite and multiplied onto the card (screen blend in dark mode). On tick it lands in 0.42s `cubic-bezier(.2,1.4,.4,1)` from 1.7x scale with a brief blur; under reduced motion it appears instantly.

### Progress Seal
A round library stamp in Seal Gilt: 4px ring with an inner 1.5px ring 11px in, rotated -8deg, masked with the ink bite, the percentage in Courier Prime 30px over a small Hebrew word.

### Drawers (navigation)
Each topic is a wood-grained drawer front, lit from above: topic number with a 3px brass rule above it, a framed label holder with the title, and a Courier count. Hover and current use the lighter front; current also slides 22px out over 0.35s `cubic-bezier(.16,1,.3,1)` and takes the pulled shadow. The drawers stand in the reader's order, and a hidden topic's drawer is gone. On phone they form a horizontal strip and do not slide.

### Arranging (the cabinet)
A "נושאים" row above the drawers holds a text action, "סידור", with a drawn grip. Pressed, it becomes a framed holder slip reading "סיום", and "סדר מקורי" appears beside it (disabled while the order is the default). In the mode each drawer gets a grip on its start edge (drag it with a mouse, pen or finger; the drawer lifts, the others make room, and the cabinet scrolls along near its edges) and three 26px wood buttons at its end: up, down, and an eye that hides or shows the topic. The counts give way to them. Focus stays on the button that moved the drawer, and a polite live region says the new place ("…: מקום 2 מתוך 16"). A hidden topic's drawer stays in the cabinet while arranging, at 45% with its title struck through, so it can be shown again. Call numbers never renumber: 3.12 stays 3.12 wherever topic 3 stands.

### Reader's Card (account)
The account area in the cabinet, built from the label-holder material: a Holder Slip with the holder frame shadow (brass ring, dark hairline, recessed slip) at card radius.
- **Guest:** the slip is a button, "התחברות עם GitHub" with the GitHub mark drawn in the holder ink, rising 1px on hover; a Cabinet Muted note under it says what logging in gives.
- **Logged in:** a 40px square ID photo (card radius, dark hairline), the name in 14px 700 and the @login in Courier Prime 12px, then a dashed rule and two text actions: "התנתקות" (700) and, at the far end, "מחיקת החשבון" (400), which asks for confirmation.
- **Sync status:** the 12px status line under the count in the ledger tells where progress is kept: only in this browser, loading, saving, saved in the account, or a problem. Problems switch it to Cabinet Ink at 700; it is a polite live region.

User data (name, login, photo address) is only ever set as text or as an image on GitHub's avatar host.

### Friend Photos
On every index card a friend has finished, the friends' 22px square ID photos stack in the friends column, overlapping by 6px, each ringed 2px in Card Stock with a short neutral shadow; the friend who finished it last is first (beside the box) and on top. Up to three photos, then a Courier "+N" in Faded Ink. A friend without a photo gets the first letter of the name on a Faded Ink square. The names ("סיימו: …") are the cluster's tooltip and screen-reader text. The reader never appears in their own cluster: their mark is the stamp. If the friends list can't be loaded, the column stays empty and nothing else changes.

### Palette Swatches
Four round 24px buttons in the cabinet header, each split diagonally between its finish's cabinet colour and its seal or brass colour, ringed 2px in the cabinet shadow with a faint light outer ring. Hover scales to 1.1 over 0.2s; the chosen swatch (aria-pressed) swaps the light ring for a 2px Cabinet Ink ring. Each carries the finish's Hebrew name as its accessible label.

### Hide Control and Hidden State
A 28px icon button in each card's box column, under the checkbox: a drawn eye with a slash, in Faded Ink at 40% at rest, full on the card's hover, on focus and always on touch screens. It hides the source from the plan; the card leaves the page and every count (seal, totals, percentage, drawer counts), finished or not, and focus moves to the topic head's line. That line, a Faded Ink text action beside the count, says "מקור אחד מוסתר" or "N מוסתרים" and shows them; for a hidden topic it reads "החזרת הנושא". The filter bar's "הצג מוסתרים" chip appears only when something is hidden, with the count, and turns itself off when nothing is left. Shown, a hidden card sits at 60% inside a dashed Faded Ink edge, and its eye (without the slash) restores it; a hidden topic shows at 60% with a dashed head rule. A topic whose every source is hidden says so in place of its empty note.

### Desk and Dialogs
The desk is a row of small index cards above the opening note: card stock with the red head rule, 15px 700, the card lift and the hover rise. "איך להשתמש בתכנית" and "מצב הכלים" (with its date in Courier, from the README heading) open a native modal dialog; "הכנה לריאיון" is a link to the prep page with a drawn chevron. A dialog is a fibred index card, up to 760px wide, its title in Display over a red head rule, a 36px framed close button, and a body that scrolls on its own; the backdrop is the cabinet shadow at 64%. Esc, the close button and a click on the backdrop close it, focus returns to the desk card, and the page behind does not scroll. A link to `#how` or `#status` opens the dialog.

### Prep Page
`prep.html` is the same catalogue for the interview itself: a cabinet with the title, a framed holder link back to the plan ("לתכנית הלימודים", drawn chevron) and three drawers (STAR bank, questions for the interviewer, two weeks before). The reading field uses the plan's prose, tables and index cards; the two-weeks checklist uses index cards without call numbers or type tags, stamped like the plan's, and kept in the browser only.

### Chips (filters)
Card-stock buttons with a 1px Pencil Line border, 13px text and the chip shadow. Hover darkens the border to Faded Ink; pressed inverts to Ink with Card Stock text and presses in. Depth chips lead with their depth ring.

### Track Tabs
Vue/React tabs are folder tabs on a 3px Ink baseline: Card Stock with Faded Ink text at rest, inverted to Ink when selected. Arrow keys follow RTL order.

### Tags
Small bordered labels in Ink. Video and playlist tags are filled Ink; the "old material" tag is outlined in Faded Ink at regular weight.

### Brief
Each topic's brief (why it matters, expected questions, practice) folds between two Pencil Lines. Disclosure is a drawn plus/minus mask in Faded Ink.

## Do's and Don'ts

### Do:
- **Do** put the call number first on every index card, in Courier Prime 700 at 21px on the 26px ruling.
- **Do** keep depth on the empty, half or full ring, and hidden on the fade with a dashed edge.
- **Do** reserve the stamp ink for done, focus, caret and selection, and the seal ink for the seal on the cabinet.
- **Do** set every scanned number in Courier Prime with tabular figures, isolated left-to-right inside Hebrew.
- **Do** keep paper and wood corners at 2-4px; only tabs get 6-8px top corners.
- **Do** read colour only through tokens, and give any new finish its own light and dark values.
- **Do** give every motion a reduced-motion path that lands the final state instantly.

### Don't:
- **Don't** use percentage bars, blue progress bars or soft rounded tracker cards; progress is the seal and the stamps.
- **Don't** colour-code depth, and don't rank topics: their order is the reader's.
- **Don't** renumber call numbers when topics move.
- **Don't** use hard offset shadows or glows; depth is the layered, neutral-black shadows and material textures above.
- **Don't** add texture that is not the material's own: no photographic or raster textures; grain belongs to paper and wood.
- **Don't** let index-card columns shift between cards, on desktop or phone.
- **Don't** draw the card ruling as borders or use the ruling colours for text.

