# תכנית לימודים לריאיונות טכניים

**[לגרסה האינטראקטיבית של התכנית](https://shoobyd.github.io/tech-curriculum/)**: סימון מקורות עם חותמת תאריך, סינון לפי עומק, סדר נושאים משלך והסתרת מה שלא רלוונטי, ושמירת ההתקדמות בחשבון GitHub, כולל מה שהחברים כבר סיימו.

**[הכנה לריאיון](interview-prep.md)**: בנק סיפורי STAR, שאלות למראיין ורשימה לשבועיים לפני הריאיון, בדף נפרד.

> המקורות נבדקו ב־31.10.2026. כל קישור כאן נפתח ונבדק (בסרטונים מול YouTube, בדפים מול האתר), וכל התוכן חינמי. אם לא כתוב אחרת, אין צורך בהרשמה.

## איך להשתמש בתכנית

- **רמת העומק של כל מקור:**
  - **🟢 סקירה:** עד כחצי שעה.
  - **🟡 בינוני:** הרצאה או קורס קצר, שעה עד שלוש.
  - **🔴 עומק:** קורס מלא, תיעוד, מפרט או ספר.
- **🎬** מסמן וידאו.
- **⚠️** מסמן חומר ישן. העקרונות בו עדיין נכונים, אבל כדאי לשים לב לתאריך.
- **פלייליסטים וקורסים מצולמים** מסומנים כ"פלייליסט" או באורך הקורס, וקישורי "חלק מסדרה" מובילים לפלייליסט המלא של הסדרה.
- **איך לעבור על כל נושא:** קודם כל 🟢, אחר כך 🟡, ו־🔴 רק בנושאים שבהם רוצים להעמיק. אחר כך עוברים על השאלות הצפויות ומנסחים תשובה בקול.
- **מעקב:** ליד כל מקור יש `[ ]`. אפשר לסמן בו `[x]` כשמסיימים.
- **סדר משלך:** בגרסה האינטראקטיבית אפשר לסדר את הנושאים בסדר שבוחרים, ולהסתיר מקורות ונושאים שלא רלוונטיים.

## מצב הכלים נכון לסוף אוקטובר 2026

שווה לדעת את זה בריאיון:

| כלי | מצב |
|---|---|
| Vue | ‏3.6 עדיין ב־RC (‏rc.14). ‏Vapor Mode הוא opt-in ולא יציב. בריאיון כדאי לומר "בדרך, לא לפרודקשן עדיין" |
| Vite | ‏Vite 8 עם Rolldown יצא במרץ 2026. ‏Vite+ זמין |
| Nuxt | ‏Nuxt 4 יצא ביולי 2025 |
| React | ‏19.3. ‏React Compiler 1.0 יציב מאוקטובר 2025 |
| Next.js | ‏16, עם Cache Components ו־`use cache` |
| React Router | ‏v8 מיוני 2026. ‏Remix מוזג לתוכו. התמיכה ב־RSC עדיין unstable |
| TanStack Start | ‏v1 |
| Angular | ‏v22. מ־v21 אפליקציות חדשות הן zoneless כברירת מחדל. ‏signals, ‏standalone ו־control flow הם הסטנדרט |
| Svelte | ‏5 יציב, עם runes |
| Node.js | ‏26 הוא Active LTS מ־28.10.2026. ‏24 ו־22 ב־Maintenance LTS, ו־20 כבר EOL. מ־Node 27 כל גרסה הופכת ל־LTS ל־30 חודשים |
| TC39 Signals | עדיין **Stage 1**. יש בלוג שטוען Stage 4, וזה לא נכון |
| State of JS 2025 | ‏React בשימוש הנרחב ביותר, אבל עם חוסר שביעות רצון. ‏Solid מוביל בשביעות רצון. ‏Astro בעלייה. ‏Next.js הוא הכלי השנוי ביותר במחלוקת. הנתונים ממקור משני, אז כדאי לבדוק באתר הרשמי לפני שמצטטים מספרים |

## תוכן עניינים

1. [Frontend System Design](#1-frontend-system-design)
2. [ארכיטקטורה ופריימוורק: מסלול Vue ומסלול React](#2-ארכיטקטורה-ופריימוורק)
3. [AI לאורך ה־SDLC](#3-ai-לאורך-ה-sdlc-agentic-engineering)
4. [הובלה טכנית](#4-הובלה-טכנית)
5. [ביצועים](#5-ביצועים)
6. [אסטרטגיית בדיקות](#6-אסטרטגיית-בדיקות)
7. [יסודות JS/דפדפן ו־live coding](#7-יסודות-jsדפדפן-ו-live-coding)
8. [TypeScript מתקדם](#8-typescript-מתקדם)
9. [מגמות רוחב בין פריימוורקים](#9-מגמות-רוחב-בין-פריימוורקים)
10. [השוואה ובחירת פריימוורק](#10-השוואה-ובחירת-פריימוורק)
11. [אבטחה](#11-אבטחה)
12. [נגישות](#12-נגישות)
13. [Design Systems ו־Web Components](#13-design-systems-ו-web-components)
14. [כלים, CI/CD ו־Observability](#14-כלים-cicd-ו-observability)
15. [פיצ'רים של AI בצד הלקוח](#15-פיצרים-של-ai-בצד-הלקוח)
16. [פולסטאק ובקאנד](#16-פולסטאק-ובקאנד)

**בדף נפרד:** [הכנה לריאיון](interview-prep.md): בנק סיפורי STAR, שאלות למראיין ושבועיים לפני הריאיון.

---

## 1. Frontend System Design

**למה זה חשוב:**
- זה הסבב שמבדיל ארכיטקט ממפתח בכיר.
- דוגמה אמיתית מהעבודה שווה הרבה בסבב הזה. כדאי להגיע עם מערכת שעבדת עליה, למשל גלריית תמונות, חנות או widget שמוטמע באתרים של לקוחות.

**מסגרת התשובה:** בדרך כלל לפי RADIO:
1. Requirements: דרישות.
2. Architecture: ארכיטקטורה.
3. Data model: מודל הנתונים.
4. Interface: ‏API.
5. Optimizations: אופטימיזציות, ובתוכן ביצועים, נגישות ו־i18n.

**שאלות צפויות:**
- תכנן news feed: ‏pagination לפי cursor או offset, ‏virtualization וזיכרון מוגבל, ‏optimistic posting.
- תכנן autocomplete: ‏debounce, ‏cache, ‏race conditions ונגישות.
- תכנן גלריית תמונות: ‏responsive images, ‏lazy loading ומניעת CLS.
- תכנן checkout: ‏state machine, ‏retry עם idempotency, ‏iframe של תשלום ואבטחה.
- תכנן widget שמוטמע באתרים של לקוחות: בידוד סגנונות ב־Shadow DOM, ניהול גרסאות, גודל bundle ו־CSP.
- איך המערכת מתמודדת עם offline ועם כשלים?

**תרגול:** בחר מערכת שעבדת עליה ותכנן אותה בקול, כאילו זו שאלה בריאיון. אחר כך עשה אותו דבר עם checkout. לשלושה תרגילים (checkout, ‏widget מוטמע, ‏virtualized list) לא נמצא מקור חינמי, אז כדאי לבנות אותם מעקרונות היסוד.

**מקורות:**
- 🟢
  - [ ] [The RADIO Framework](https://www.greatfrontend.com/front-end-system-design-playbook/framework). ‏GreatFrontEnd, כ־20 דקות קריאה. השלד של כל תשובה.
- 🟡
  - [ ] 🎬 [Real Senior Frontend System Design Interview 2026](https://www.youtube.com/watch?v=gXwF0VbTKvs). ‏theSeniorDev, 40 דקות, 2026. ריאיון מלא ועדכני, כולל עבודה עם AI. חלק מסדרה: [Frontend Interview Questions](https://www.youtube.com/playlist?list=PLyS0ae3XTiIHuaqjX9sWHkBaF8r_bIysK), 34 סרטונים.
  - [ ] 🎬 [Cracking Frontend System Design Interview, Ep. 2](https://www.youtube.com/watch?v=QemIfzcEeMM). ‏Chirag Goel, 46 דקות, 2022. חלק מסדרה: [Frontend System Design | Chakde](https://www.youtube.com/playlist?list=PL4CFloQ4GGWICE0Tz6iXKfN3XWkXRlboU), 22 סרטונים.
  - [ ] 🎬 [Facebook News Feed: Front End System Design](https://www.youtube.com/watch?v=5vyKhm2NTfw). ‏Front-End Engineer, 47 דקות, ⚠️ 2020. תרגיל ה־news feed הקלאסי. חלק מסדרה: [Front-End System Design](https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT), 13 סרטונים.
  - [ ] 🎬 [Design Autocomplete / Typeahead](https://www.youtube.com/watch?v=Ntmy-z-b4pk). ‏Shivam Bhalla, 37 דקות, 2023. חלק מסדרה: [Frontend System Design (Shivam Bhalla)](https://www.youtube.com/playlist?list=PLdDT54c2vNM4NW8wXHcdfQPOzVxyvMWpI), 5 סרטונים.
  - [ ] 🎬 [System Design Explained for Frontend Engineers](https://www.youtube.com/watch?v=zQ_wmJV8l44). ‏Dmitriy Zhiganov, 33 דקות. מושגי בקאנד שארכיטקט frontend צפוי להכיר.
  - [ ] 🎬 [Real Frontend System Design (from a Senior Engineer)](https://www.youtube.com/watch?v=OWq74_L5vn0). ‏theSeniorDev, 48 דקות. השלמה לריאיון של 2026.
  - [ ] 🎬 [55 Frontend system design concepts](https://www.youtube.com/watch?v=MsKyeVbHRZs). ‏Learnersbucket, 41 דקות, 2026. סקירה מהירה של המושגים לפני ריאיון.
  - [ ] 🎬 [Frontend System Design Interview Questions](https://www.youtube.com/playlist?list=PLKhlp2qtUcSaSnNnNffRPIU3DRQ2xAdj8). ‏RoadsideCoder, פלייליסט של 5 סרטונים. קצר וקונקרטי.
- 🔴
  - [ ] [Front End System Design Playbook](https://www.greatfrontend.com/front-end-system-design-playbook). ‏GreatFrontEnd. המדריך חינמי, אבל רוב 20 השאלות בתשלום.
  - [ ] 🎬 [Frontend System Design: case studies](https://www.youtube.com/playlist?list=PL4OG1laG0gW_AcchCg1_adOzDAtnxMjPN). ‏Dmitriy Zhiganov, פלייליסט של 15 סרטונים, 2023–2026. תכנון מלא של מערכות אמיתיות. הסדרה העדכנית ביותר שנמצאה.
  - [ ] 🎬 [Frontend System Design: Building Blocks](https://www.youtube.com/playlist?list=PL4OG1laG0gW9BNGye9I8LYroxIDoMU5Er). ‏Dmitriy Zhiganov, פלייליסט של 16 סרטונים, 2024–2026. אבני הבניין: אחסון בדפדפן, עדכונים בזמן אמת ועוד.

---

## 2. ארכיטקטורה ופריימוורק

> בחר מסלול ראשי לפי הסטאק שלך ולפי המשרה, ובו העמק. את המסלול השני כדאי לעבור לפחות ברמת 🟢 ו־🟡, כי ארכיטקט צפוי לדבר בביטחון גם על הפריימוורק שהוא לא עובד בו.

### 2א. מסלול Vue

**למה זה חשוב:**
- במשרות Vue, כאן ישאלו הכי לעומק.
- מיגרציה הדרגתית ממערכת legacy (למשל jQuery) ל־Vue היא דוגמה קלאסית ל־**Strangler Fig**. כדאי להכיר את המונח.

**שאלות צפויות:**
- מתי state נשאר ב־composable ומתי עובר ל־Pinia store?
- איך אוכפים גבולות בין מודולים ב־monorepo?
- מתי **לא** לבחור ב־micro-frontends?
- ספר על מיגרציה ממערכת legacy (למשל jQuery) ל־Vue: הסיכונים, והשלבים לפי strangler fig.
- האם לאמץ את Vapor כשהוא עדיין ב־RC?
- מה Rolldown ב־Vite 8 משנה ב־pipeline?
- Nuxt או SPA על Vite, ולמה?

**ארכיטקטורה, state ו־composables:**
- 🟢
  - [ ] [State Management](https://vuejs.org/guide/scaling-up/state-management) ו־[Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq). תיעוד Vue.
  - [ ] [Vue Composables patterns](https://www.patterns.dev/vue/composables). ‏patterns.dev.
- 🟡
  - [ ] 🎬 [Patterns for Large Scale Vue.js Applications](https://www.youtube.com/watch?v=0SuU_GaqTzg). ‏Daniel Kelly, 24 דקות, ⚠️ 2021.
  - [ ] 🎬 [Beyond State Management with Pinia](https://www.youtube.com/watch?v=eflJ3VQZi6g). ‏Eduardo San Martin Morote, יוצר Pinia, 26 דקות, ⚠️ 2022. חלק מסדרה: [Vue.js Nation 2022](https://www.youtube.com/playlist?list=PLxddmVXxb3HspeTGtpGC1KdJJgFw8E092), 37 סרטונים.
  - [ ] 🎬 [The Best way to learn Vue: Crash Course](https://www.youtube.com/watch?v=s9URD3PefTk). ‏Vue Mastery, 57 דקות. קורס מקוצר וחינמי של Vue Mastery.
- 🔴
  - [ ] 🎬 [Vue.js Course for Beginners](https://www.youtube.com/watch?v=8pn9KEuXG28). ‏freeCodeCamp, 6:56 שעות. קורס Vue 3 מלא. מתאים גם למי שמגיע ממסלול React.
  - [ ] 🎬 [Vue 3](https://www.youtube.com/playlist?list=PL06MUQt-_wltZJLflDQPs1IennEwcSSKI). ‏Alexander Lichter, פלייליסט של 30 סרטונים, 2024–2026. צלילות עומק מחבר צוות הליבה של Nuxt.

**Micro-frontends ומיגרציה:**
- 🟢
  - [ ] [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html). ‏Martin Fowler, 10 דקות. השם המקצועי למיגרציה הדרגתית.
  - [ ] 🎬 [Micro-Frontends Decisions Framework](https://www.youtube.com/watch?v=1co8055hi_I). ‏Luca Mezzalira, 27 דקות, ⚠️ 2021.
  - [ ] 🎬 [Why Your Micro-Frontends are a Distributed Monolith](https://www.youtube.com/watch?v=CpBP4FInj0g). ‏Mezzalira, 25 דקות, 2026. הצד השני: אנטי־דפוסים.
- 🟡
  - [ ] 🎬 [Vite and Module Federation Makes Micro-Frontends EASY](https://www.youtube.com/watch?v=t-nchkL9yIg). ‏Jack Herrington, 27 דקות, ⚠️ 2023.
  - [ ] 🎬 [SSR with Micro-Frontends: How Composition Works with Modern Frameworks](https://www.youtube.com/watch?v=3h3AsjTmp7A). ‏Luca Mezzalira, JetBrains, 35 דקות. הרכבה של micro-frontends בצד השרת.
  - [ ] 🎬 [Micro-Frontends Author Luca Mezzalira on What Most Teams Get Wrong](https://www.youtube.com/watch?v=PbSYWBx-gVw). ‏GitNation, 33 דקות, 2026. ריאיון על הטעויות הנפוצות.
- 🔴
  - [ ] [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html). ‏Cam Jackson, ‏martinfowler.com. המאמר הקנוני.
  - [ ] 🎬 [Module Federation](https://www.youtube.com/playlist?list=PLNqp92_EXZBLr7p7hn6IYa1YPNs4yJ1t1). ‏Jack Herrington, פלייליסט של 30 סרטונים, ⚠️ 2020–2022. כולל Vue 3. העקרונות תקפים, ה־APIs ישנים.

**עדכוני הסביבה (Vapor, Vite 8, Rolldown):**
- 🟢
  - [ ] 🎬 [State of Vue 2026](https://www.youtube.com/watch?v=a9_Ud5MFTjU). ‏Evan You, ‏Vuejs Amsterdam, 37 דקות, 2026. חלק מסדרה: [Vuejs Amsterdam 2026](https://www.youtube.com/playlist?list=PLCxzy-hmQq9FXSiPXPy60R5D7QrrkjOra), 21 סרטונים.
  - [ ] 🎬 [Preview of Vue 3.6 & Vapor Mode](https://www.youtube.com/watch?v=zvjOT7NHl4Q). ‏Evan You, 33 דקות, 2025. חלק מסדרה: [Vue.js Nation 2025](https://www.youtube.com/playlist?list=PLxddmVXxb3HuX-HX1ZRP-emyJ9w4GeNZZ), 45 סרטונים.
  - [ ] 🎬 [Developer Tooling in the Agentic Era](https://www.youtube.com/watch?v=FpC35eggY6Y). ‏Evan You, ‏ViteConf 2026, 24 דקות. החומר העדכני ביותר.
  - [ ] 🎬 [Vite Beyond a Build Tool](https://www.youtube.com/watch?v=x7Jsmt_o9ek). ‏Evan You, ‏ViteConf 2025, 36 דקות. ההכרזה על Vite+. חלק מסדרה: [ViteConf 2025](https://www.youtube.com/playlist?list=PLqGQbXn_GDmkJaoykvHCUmXUPjhgH2bVr), 25 סרטונים.
  - [ ] 🎬 [Rolldown: How Vite bundles at the speed of Rust](https://www.youtube.com/watch?v=3PFLeteDuyQ). ‏Alexander Lichter, 24 דקות. חלק מסדרה: [ViteConf 2025](https://www.youtube.com/playlist?list=PLqGQbXn_GDmkJaoykvHCUmXUPjhgH2bVr), 25 סרטונים.
- 🟡
  - [ ] 🎬 [Nuxt Crash Course](https://www.youtube.com/watch?v=RhZZ0whiuT8). ‏Syntax, 41 דקות. עוזר לענות על "Nuxt או SPA על Vite".
  - [ ] 🎬 [VITE: The Documentary](https://www.youtube.com/watch?v=bmWQqAKLgT4). ‏CultRepo, 39 דקות. הרקע לסיפור של Vite 8, ‏Rolldown ו־Vite+.
- 🔴
  - [ ] 🎬 [Nuxt](https://www.youtube.com/playlist?list=PL06MUQt-_wlsRNxmbIvgVuhsXG_dN1XaO). ‏Alexander Lichter, פלייליסט של 88 סרטונים, 2023–2026. ספריית הווידאו הגדולה ביותר על Nuxt. בוחרים לפי נושא.
  - [ ] 🎬 [Vuejs Amsterdam 2025](https://www.youtube.com/playlist?list=PLCxzy-hmQq9H0buUj1I_IWEOB9jqR3tFg). ‏Vuejs Amsterdam, פלייליסט של 25 סרטונים, 2025.
  - [ ] 🎬 [VueConf US 2024](https://www.youtube.com/playlist?list=PLJNLwTPak6djqhjpffgLe39YkhP7greGM). ‏Vue Mastery, פלייליסט של 27 סרטונים, 2024.
  - [ ] 🎬 [Frontend Nation 2026](https://www.youtube.com/playlist?list=PLRRLRwvPfvEw). ‏Unlearn, פלייליסט של 28 סרטונים, 2026. כולל "Vue Vapor: Goodbye Virtual DOM", וגם הרצאות על AI ובדיקות.
- רפרנס
  - [ ] [Announcing Vite 8](https://vite.dev/blog/announcing-vite8)
  - [ ] [Nuxt 4](https://nuxt.com/blog/v4)
  - [ ] [Vite+](https://viteplus.dev/)

### 2ב. מסלול React

**למה זה חשוב:**
- רוב משרות הארכיטקט בישראל הן ב־React.
- למי שמגיע מ־Vue כבר יש מודל מנטלי של reactivity. צריך בעיקר ללמוד במה React **שונה**: ‏re-render של קומפוננטה שלמה, ‏hooks וחוקיהם, ו־RSC.

**שאלות צפויות:**
- מה ההבדל בין מודל ה־re-render של React ל־fine-grained reactivity של Vue? מתי memoization עדיין חשוב כשיש Compiler?
- מתי `useEffect` הוא הכלי הלא נכון?
- ממש `useDebounce` או `useFetch` עם ביטול ו־race conditions, וכתוב להם טסטים.
- איך מחלקים בין server state, ‏client state, ‏URL state ו־form state? ‏TanStack Query, ‏RTK, ‏Zustand או context?
- RSC מול SSR מול client components: איפה עובר הגבול, ומה עובר סריאליזציה?
- Next.js 16, ‏React Router 8 או TanStack Start למוצר חדש?
- Server Actions, ‏`useActionState` ו־`useOptimistic`: עדכון אופטימי עם rollback.
- Transitions ו־Suspense: איך שומרים על הקלדה חלקה ברשימה כבדה?
- API לספריית קומפוננטות headless ונגישה: ‏compound components, ‏hooks או render props?
- ארכיטקטורת תיקיות ל־20 מפתחים ומעלה: ‏FSD או Bulletproof, ואכיפת גבולות.
- איך מאבחנים עמוד איטי?
- מיגרציה הדרגתית מ־Vue ל־React.

**R1. ‏React למפתחי Vue:**
- 🟢
  - [ ] 🎬 [React explained for Vue developers in 7 mins](https://www.youtube.com/watch?v=oipl-RXyLTw). ‏Justin Brooks, ⚠️ 2021. הגשר היחיד שנמצא.
  - [ ] 🎬 [You might not need useEffect()](https://www.youtube.com/watch?v=V1f8MOQiHRw). ‏Academind, 21 דקות, 2024.
  - [ ] 🎬 [Every React Concept Explained in 12 Minutes](https://www.youtube.com/watch?v=wIyHSOugGGw). ‏Code Bootcamp, 12 דקות. מפת מושגים מהירה.
  - [ ] 🎬 [AI Helped Me Learn: Vue Through the Lens of a React Developer](https://www.youtube.com/watch?v=foOOku3P9uQ). ‏CascadiaJS, 10 דקות, 2026. הגשר בכיוון ההפוך, ועדיין שימושי.
- 🟡
  - [ ] [Thinking in React](https://react.dev/learn/thinking-in-react), ‏[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), ‏[Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks), ‏[Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks). מהתיעוד הרשמי. ‏custom hooks הם המקבילה ל־composables.
  - [ ] [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/). ‏Josh Comeau, 30 דקות. ההבדל המהותי מול Vue.
- 🔴
  - [ ] 🎬 [React Course for Beginners [2025]](https://www.youtube.com/watch?v=IJ85kCdqWao). ‏freeCodeCamp, 4:42 שעות. אפשר לדלג על חלקים ולצפות במהירות 1.5.
  - [ ] [react.dev Learn](https://react.dev/learn). המדריך המלא.
  - [ ] 🎬 [React Tutorial Full Course: Beginner to Pro](https://www.youtube.com/watch?v=TtPXvEcE11E). ‏SuperSimpleDev, 11:32 שעות. קורס React 19 החינמי המלא ביותר.

**R2. ‏State ונתונים:**
- 🟢
  - [ ] 🎬 [Comparing the Top 5 React State Management Libraries](https://www.youtube.com/watch?v=Qbaw_ZQdfWo). ‏Cosden Solutions, 22 דקות, 2025.
  - [ ] 🎬 [React Query API Design – Lessons Learned](https://www.youtube.com/watch?v=QB-S6UU5YEU). ‏TkDodo, 19 דקות, 2024. חלק מסדרה: [React Advanced 2024](https://www.youtube.com/playlist?list=PLNBNS7NRGKMFWmsXfShz4gwDPqCy470Xq), 7 סרטונים.
  - [ ] 🎬 [Zustand: Complete Tutorial](https://www.youtube.com/watch?v=_ngCLZ5Iz-0). ‏Cosden Solutions, 19 דקות.
- 🟡
  - [ ] TkDodo: ‏[Practical React Query](https://tkdodo.eu/blog/practical-react-query), ‏[React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager), ‏[Working with Zustand](https://tkdodo.eu/blog/working-with-zustand). הכתיבה הכי טובה על server state מול client state.
  - [ ] 🎬 [TanStack Query Full Course 2026](https://www.youtube.com/watch?v=mqV5OvbyXcM). ‏PedroTech, 41 דקות.
  - [ ] 🎬 [TanStack Query: How to Master React Query](https://www.youtube.com/watch?v=KkxPtimqaew). ‏Austin Davis, 1:23 שעות. חלופה מעמיקה יותר לסרטון של PedroTech.
- 🔴
  - [ ] [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
  - [ ] [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)
  - [ ] [Jotai](https://jotai.org/docs/introduction)
  - [ ] [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
  - [ ] [React Hook Form](https://react-hook-form.com/get-started)

**R3. ‏React העדכני (19, Compiler, Suspense):**
- 🟢
  - [ ] 🎬 [What's new in React 19](https://www.youtube.com/watch?v=AJOGzVygGcY). ‏Lydia Hallie, ‏React Conf, 20 דקות. חלק מסדרה: [React Conf 2024](https://www.youtube.com/playlist?list=PLNG_1j3cPCaapCRvpsyQ2CrNtnTtLf2jz), 25 סרטונים.
  - [ ] 🎬 [Master React 19.2 Async Everywhere](https://www.youtube.com/watch?v=KI4gjUrOfOs). ‏Jack Herrington, 10 דקות, 2025.
- 🟡
  - [ ] 🎬 [React Conf 2025 Keynote](https://www.youtube.com/watch?v=bf3rxc26cC4). 55 דקות. ‏Compiler 1.0, ‏Activity, ‏ViewTransition. חלק מסדרה: [React Conf 2025](https://www.youtube.com/playlist?list=PLNG_1j3cPCaZ-pYFoA9WUwDgvMmVUi1eu), 26 סרטונים.
  - [ ] 🎬 [Async React](https://www.youtube.com/watch?v=B_2E96URooA). ‏Ricky Hanlon מצוות הליבה, 43 דקות. ‏transitions ו־concurrent rendering. חלק מסדרה: [React Conf 2025](https://www.youtube.com/playlist?list=PLNG_1j3cPCaZ-pYFoA9WUwDgvMmVUi1eu), 26 סרטונים.
  - [ ] 🎬 [React Compiler Deep Dive](https://www.youtube.com/watch?v=uA_PVyZP7AI) (31 דקות) ו־[Compiler at Sanity](https://www.youtube.com/watch?v=SnrSA8D11K8) (19 דקות). חלק מסדרה: [React Conf 2024](https://www.youtube.com/playlist?list=PLNG_1j3cPCaapCRvpsyQ2CrNtnTtLf2jz), 25 סרטונים.
  - [ ] 🎬 [What's New in React 19: Actions, use(), Compiler](https://www.youtube.com/watch?v=81uAxzeyL2I). ‏freeCodeCamp, 1:08 שעות.
  - [ ] 🎬 [React Conf 2025 Interviews](https://www.youtube.com/playlist?list=PLNG_1j3cPCaZQCTcTinGsD-s8Wt9PIsYA). ‏React Conf, פלייליסט של 23 סרטונים, 2025. ראיונות קצרים עם צוות React.
- 🔴
  - [ ] [React 19](https://react.dev/blog/2024/12/05/react-19)
  - [ ] [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)
  - [ ] [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1)
  - [ ] [Compiler docs](https://react.dev/learn/react-compiler)
  - [ ] [useTransition](https://react.dev/reference/react/useTransition)

**R4. ‏RSC ו־meta-frameworks:**
- 🟢
  - [ ] 🎬 [And Now You Understand React Server Components](https://www.youtube.com/watch?v=pOo7x8OiAec). ‏Kent C. Dodds, 21 דקות. חלק מסדרה: [React Conf 2024](https://www.youtube.com/playlist?list=PLNG_1j3cPCaapCRvpsyQ2CrNtnTtLf2jz), 25 סרטונים.
  - [ ] 🎬 [React for Two Computers](https://www.youtube.com/watch?v=ozI4V_29fj4). ‏Dan Abramov, 28 דקות. יש גם [גרסה כתובה](https://overreacted.io/react-for-two-computers/). חלק מסדרה: [React Conf 2024](https://www.youtube.com/playlist?list=PLNG_1j3cPCaapCRvpsyQ2CrNtnTtLf2jz), 25 סרטונים.
  - [ ] 🎬 [The React Router take on RSC](https://www.youtube.com/watch?v=OQ6yT0zJA0A) ו־[TanStack Start](https://www.youtube.com/watch?v=_3TbZtQ-9rg). 11 דקות כל אחד. חלק מסדרה: [React Conf 2025](https://www.youtube.com/playlist?list=PLNG_1j3cPCaZ-pYFoA9WUwDgvMmVUi1eu), 26 סרטונים.
- 🟡
  - [ ] 🎬 [Next.js Conf 25: Opening Keynote](https://www.youtube.com/watch?v=myjrQS_7zNk). 44 דקות. ‏Next 16 ו־`use cache`. חלק מסדרה: [Next.js Conf 2025](https://www.youtube.com/playlist?list=PLBnKlKpPeagkc4H_987rIiRt3Mkb9HrMp), 13 סרטונים.
  - [ ] [Making Sense of RSC](https://www.joshwcomeau.com/react/server-components/), ‏[The Two Reacts](https://overreacted.io/the-two-reacts/), ‏[Next.js caching](https://nextjs.org/docs/app/getting-started/caching-and-revalidating). עדיף לקרוא את התיעוד העדכני של caching ולא סרטונים מ־2024.
  - [ ] 🎬 [React Server Components: Where are we at?](https://www.youtube.com/watch?v=1QXqWQ0yNfg). ‏Syntax, 31 דקות. מצב RSC וה־trade-offs.
  - [ ] 🎬 [Next.js Tutorial 2026: Full Course](https://www.youtube.com/watch?v=jZInNd6djz4). ‏ByteGrad, 1:28 שעות, 2026. האפשרות העדכנית הקצרה ביותר.
  - [ ] 🎬 [TanStack Start Tutorial](https://www.youtube.com/playlist?list=PLOQjd5dsGSxIEKFg4dnSQ4zQkmTktfszp). ‏Dev Leonardo, פלייליסט של 11 סרטונים.
- 🔴
  - [ ] [Next.js Learn: Dashboard App](https://nextjs.org/learn/dashboard-app). 6–10 שעות. ייתכן שהוא מפגר אחרי השינויים ב־Next 16.
  - [ ] [React Router modes](https://reactrouter.com/start/modes), ‏[upgrading v7→v8](https://reactrouter.com/upgrading/v7), ‏[TanStack Start docs](https://tanstack.com/start/latest/docs/framework/react/overview)
  - [ ] 🎬 [Next.js 16 Full Course](https://www.youtube.com/watch?v=I1V9YWqRIeI). ‏JavaScript Mastery, 4:10 שעות. חלופה מצולמת ל־Next.js Learn.
  - [ ] 🎬 [NextJS 16 Full Course 2026](https://www.youtube.com/watch?v=vCIsrOGNhas). ‏PedroTech, 5:34 שעות, 2026.

**R5. ‏ארכיטקטורה וביצועים:**
- 🟢
  - [ ] 🎬 [Compound Components in React](https://www.youtube.com/watch?v=N_WgBU3S9W8). ‏Cosden Solutions, 18 דקות. חלק מסדרה: [Design Patterns in React](https://www.youtube.com/playlist?list=PLApy4UwQM3Updrw-4mOXTwgsWar9bqk6i), 14 סרטונים.
  - [ ] 🎬 [Preventing architectural debt with Feature-Sliced Design](https://www.youtube.com/watch?v=RZ1tmO7Au5U). ‏Conf42, 17 דקות.
- 🟡
  - [ ] 🎬 [Profiling with React Performance tracks](https://www.youtube.com/watch?v=CclO4tPoebs) (18 דקות) ו־[Exploring React Performance](https://www.youtube.com/watch?v=uAmRtE52mYk) (24 דקות). ‏React Conf 2025. חלק מסדרה: [React Conf 2025](https://www.youtube.com/playlist?list=PLNG_1j3cPCaZ-pYFoA9WUwDgvMmVUi1eu), 26 סרטונים.
  - [ ] 🎬 [Effective React: Lessons from 10 Years](https://www.youtube.com/watch?v=Ktg8eLUiCk8). ‏Cory House, 59 דקות, 2025.
  - [ ] 🎬 [React Performance Optimization Patterns Course](https://www.youtube.com/watch?v=keTcXT145CI). ‏freeCodeCamp, 1:36 שעות, 2026.
  - [ ] 🎬 [Code Review (React app reviews)](https://www.youtube.com/playlist?list=PLApy4UwQM3Ur3K-fWrKu5vxNMv1PHvB_8). ‏Cosden Solutions, פלייליסט של 14 סרטונים, 2023–2025. תרגול טוב לסבב "תעשה review לקוד הזה".
- 🔴
  - [ ] [Bulletproof React](https://github.com/alan2207/bulletproof-react)
  - [ ] [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview)
  - [ ] [patterns.dev/react](https://www.patterns.dev/react/)
  - [ ] [useMemo & useCallback](https://www.joshwcomeau.com/react/usememo-and-usecallback/)
  - [ ] [Inversion of Control](https://kentcdodds.com/blog/inversion-of-control)
  - [ ] 🎬 [React Summit 2026](https://www.youtube.com/playlist?list=PLNBNS7NRGKME4bbm8XbgxWFRI-J9RRR0Q). ‏GitNation, פלייליסט של 13 סרטונים, 2026. פלייליסט הכנס העדכני ביותר על React.

**R6. ‏בדיקות ב־React:**
- 🟢
  - [ ] 🎬 [Vitest with RTL, jest-dom & MSW](https://www.youtube.com/watch?v=Aqz43LVbnTk). 18 דקות.
- 🟡
  - [ ] 🎬 [React Testing Full Course 2026](https://www.youtube.com/watch?v=6dOpQIwyV6g). ‏RoadsideCoder, 48 דקות.
  - [ ] 🎬 [React Testing with Playwright](https://www.youtube.com/watch?v=3NW0Mz943_E). ‏Cosden Solutions, 32 דקות.
  - [ ] 🎬 [React Testing for Beginners](https://www.youtube.com/watch?v=8Xwq35cPwYg). ‏Programming with Mosh, 1:17 שעות.
  - [ ] 🎬 [React Vite Testing Tutorial: Vitest Crash Course](https://www.youtube.com/watch?v=CxSL0knFxAs). ‏PedroTech, 39 דקות.
- 🔴
  - [ ] [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [ ] [Common mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
  - [ ] [MSW](https://mswjs.io/docs/)
  - [ ] [Playwright Component Tests](https://playwright.dev/docs/test-components). עדיין experimental.

**R7. ‏הכנה לריאיון React:**
- 🟢
  - [ ] 🎬 [React Custom Hooks: useDebounce](https://www.youtube.com/watch?v=gwIkg1acujU). ‏Cosden Solutions, 10 דקות, ⚠️ 2023.
- 🟡
  - [ ] 🎬 [React.js Live Coding Mock Interview](https://www.youtube.com/watch?v=UmrbK-sMXZg). ‏theSeniorDev, 22 דקות. חלק מסדרה: [React.js Interviews: Senior & Midlevel](https://www.youtube.com/playlist?list=PLyS0ae3XTiIF0SEk5w48NshPIamDRmNvU), 9 סרטונים.
- 🔴
  - [ ] [top-reactjs-interview-questions](https://github.com/greatfrontend/top-reactjs-interview-questions). ‏GreatFrontEnd.
  - [ ] 🎬 [React JS Interview Questions](https://www.youtube.com/playlist?list=PLKhlp2qtUcSZiWKJTi5-5r6IRdHhxP9ZU). ‏RoadsideCoder, פלייליסט של 27 סרטונים, 2023–2025.
  - [ ] 🎬 [Frontend Machine Coding Interview Questions](https://www.youtube.com/playlist?list=PLKhlp2qtUcSYQojD5G-ElgHezoCyq2Hgo). ‏RoadsideCoder, פלייליסט של 37 סרטונים, 2023–2026. תרגילי בנייה חיה ב־React.

**תרגול:** כתוב פרויקט קטן קיים מחדש ב־React עם TanStack Query. כך יהיה לך ניסיון מעשי להצביע עליו בריאיון.

---

## 3. AI לאורך ה־SDLC (agentic engineering)

**למה זה חשוב:**
- בכל ריאיון ל־Tech Lead ב־2026 שואלים על AI.
- השאלה היא בדרך כלל לא "אתה משתמש?" אלא "**איך הובלת אימוץ בצוות**, ואיך מוודאים איכות".
- כדאי להגיע עם דוגמאות קונקרטיות מהעבודה: ‏skills, ‏project rules, ‏plan mode, ‏SDD, ‏MCP, או כלי שהצגת לצוות.

**שאלות צפויות:**
- איך תטמיע כלי AI בצוות של 10? מה ה־guardrails, הכללים והמדדים?
- ה־throughput עלה, אבל היציבות ירדה (הממצא של DORA). איך מאבחנים?
- כמה review אנושי צריך קוד שנכתב ב־AI? האם זה משתנה בין UI, תשתית ואבטחה?
- מתי SDD שווה את ה־overhead? איך מונעים drift בין ה־spec לקוד?
- תאר את ה־context engineering שלך: ‏CLAUDE.md, ‏skills, ‏subagents. איך משתפים ומנהלים אותם בצוות?
- מה הסיכונים של MCP: ‏prompt injection וה־lethal trifecta?
- איך מודדים אם האימוץ באמת משתלם, מעבר ל־"שורות קוד שנוצרו"?

**3א. ‏Workflows ו־context engineering:**
- 🟢
  - [ ] 🎬 [Karpathy: From Vibe Coding to Agentic Engineering](https://www.youtube.com/watch?v=96jN2OCOfLs). ‏Sequoia, 30 דקות, אפריל 2026. המונחים שכדאי להשתמש בהם. חלק מסדרה: [AI Ascent 2026](https://www.youtube.com/playlist?list=PLOhHNjZItNnOkkZThzULo1Ygg7JR6T3MG), 14 סרטונים.
  - [ ] 🎬 [Claude Code in Action](https://www.youtube.com/playlist?list=PLDM4zut-OsZ0). ‏Claude, פלייליסט של 9 סרטונים, כ־27 דקות, 2026. ‏plan mode, ‏CLAUDE.md, ‏hooks, הרשאות ו־review ב־GitHub. משלים את הקורס של Anthropic Academy.
  - [ ] 🎬 [Claude Code 101](https://www.youtube.com/playlist?list=PLmWCw1CzcFilebjK89WLb5cAvM8K0cLB3). ‏Claude, פלייליסט של 9 סרטונים, כ־27 דקות, 2026. ה־workflow של Explore, ‏Plan, ‏Code, ‏Commit וניהול context.
  - [ ] 🎬 [GitHub Copilot CLI for Beginners](https://www.youtube.com/playlist?list=PL0lo9MOBetEHvO-spzKBAITkkTqv4RvNl). ‏GitHub, פלייליסט של 6 סרטונים, כ־24 דקות, 2026. אותם רעיונות בכלי אחר: plan, ‏delegate, ‏review, ‏MCP ו־skills.
- 🟡
  - [ ] 🎬 [Full Walkthrough: Workflow for AI Coding](https://www.youtube.com/watch?v=-QFHIoCo-Ko). ‏Matt Pocock, ‏AI Engineer, 1:36 שעות, 2026. יש גם [repo של skills](https://github.com/mattpocock/skills). חלק מסדרה: [Coding Agents & Developer Workflows @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0XFXogv-as7Zu9SrGdiQLgt), 92 סרטונים.
  - [ ] 🎬 [Building Claude Code with Boris Cherny](https://www.youtube.com/watch?v=julbw1JuAz0). ‏Pragmatic Engineer, 1:38 שעות, 2026. סוכנים במקביל ואיך עובדים באנתרופיק.
  - [ ] 🎬 [Head of Claude Code: What happens after coding is solved](https://www.youtube.com/watch?v=We7BZVKbCVw). ‏Lenny's Podcast, 1:28 שעות, 2026. הזווית הארגונית. חלק מסדרה: [Lenny's Podcast: Artificial Intelligence](https://www.youtube.com/playlist?list=PL2fLjt2dG0N6eLIdntKZrq-BhdnC4pJhW), 88 סרטונים.
  - [ ] [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action). ‏Anthropic Academy, כשעה של וידאו. דורש הרשמה חינמית, ויש תעודה בסיום.
  - [ ] 🎬 [Skills @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0VMXKaxLPxeQBR3AuQfw8cA). ‏AI Engineer, פלייליסט של 11 סרטונים, 2026. איך בונים ומשתפים skills בצוות.
- 🔴
  - [ ] [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices). התיעוד הרשמי.
  - [ ] [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). ‏Anthropic Engineering.
  - [ ] [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/). ‏Simon Willison, מדריך מתעדכן.
  - [ ] [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice). אוסף פרקטיקות וסרטונים.
  - [ ] 🎬 [Context Engineering @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0X1DNKK3SyZ2Qbl3QxBfHr3). ‏AI Engineer, פלייליסט של 30 סרטונים, 2026. מומלץ להתחיל ב־"Context Engineering in 2026".
  - [ ] 🎬 [Code with Claude 2026: London](https://www.youtube.com/playlist?list=PLmWCw1CzcFilPJdvw6scjHjbBripZWFps). ‏Claude, פלייליסט של 37 סרטונים, 2026. למשל "Running an AI-native engineering org" ו־"Tool, skill, or subagent?".

**3ב. ‏Spec-driven development:**
- 🟢
  - [ ] [Understanding SDD: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html). ‏Birgitta Böckeler, 2025. טקסונומיה ומבט ביקורתי.
- 🟡
  - [ ] 🎬 [Spec-driven Development: How AI Changed Everything (And Nothing)](https://www.youtube.com/watch?v=35dH6q18UtI). ‏Simon Martinelli, ‏Spring I/O, 44 דקות, 2026.
  - [ ] 🎬 [The ONLY guide you'll need for GitHub Spec Kit](https://www.youtube.com/watch?v=a9eR1xsfvHg). ‏Den Delimarsky, המתחזק, 40 דקות, 2025. חלק מסדרה: [Tinkering & Code](https://www.youtube.com/playlist?list=PLA3LBCXrOOm2vjSKTyuYWyt8n6wGE8QIX), 28 סרטונים.
  - [ ] 🎬 [Spec-Driven Development with Coding Agents](https://www.deeplearning.ai/short-courses/spec-driven-development-with-coding-agents/). ‏DeepLearning.AI ו־JetBrains, 1:16 שעות. דורש הרשמה חינמית.
  - [ ] 🎬 [Up & Running with GitHub Spec Kit](https://www.youtube.com/playlist?list=PL4cUxeGkcC9h9RbDpG8ZModUzwy45tLjb). ‏Net Ninja, פלייליסט של 9 סרטונים, כ־1:20 שעות, 2025. מעבר מסודר על כל פקודה. ‏Spec Kit השתנה מאז, אז כדאי להשלים עם הפרקים של Den.
  - [ ] 🎬 [Unlock LLM Potential with Spec-driven Development](https://www.youtube.com/watch?v=9Goq80lgxSY). ‏DORA, 31 דקות, 2025. ‏SDD מנקודת המבט של הארגון.
  - [ ] 🎬 [Kiro Agentic IDE Workshop](https://www.youtube.com/watch?v=DHwWtNNf-Cs). ‏Frontend Nation 2026, 1:21 שעות. סדנה מעשית על specs ב־Kiro.
- 🔴
  - [ ] 🎬 [Open Source Friday: Spec Kit part 2](https://www.youtube.com/watch?v=8hHCpNVLhmI). ‏GitHub, אוקטובר 2026. יש גם [part 1](https://www.youtube.com/watch?v=2IArMAhkJcE).
  - [ ] [Spec Kit repo](https://github.com/github/spec-kit) ו־[Kiro Specs](https://kiro.dev/docs/specs/).
  - [ ] 🎬 [Software Factories @ AI Engineer](https://www.youtube.com/playlist?list=PLf1igrJ_Pssk). ‏AI Engineer, פלייליסט של 7 סרטונים, כ־2:10 שעות, 2026. השלב שאחרי SDD. עוזר לשאלה "מתי זה שווה את ה־overhead".

**3ג. ‏MCP:**
- 🟢
  - [ ] [What is MCP](https://modelcontextprotocol.io/docs/getting-started/intro). הסקירה הרשמית.
- 🟡
  - [ ] 🎬 [MCP: Build Rich-Context AI Apps with Anthropic](https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/). ‏DeepLearning.AI, 1:38 שעות, 2025. דורש הרשמה חינמית.
  - [ ] 🎬 [MCP for Beginners](https://www.youtube.com/playlist?list=PLlrxD0HtieHjYfVUpGl_-ai7D6FRBjV-d). ‏Microsoft Developer, פלייליסט של 12 סרטונים, 2025. המפרט התקדם מאז, בעיקר בנושא auth.
  - [ ] 🎬 [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol). ‏Anthropic Academy. קורס וידאו, דורש הרשמה חינמית. יש גם [MCP: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics).
- 🔴
  - [ ] [Hugging Face MCP Course](https://huggingface.co/learn/mcp-course/unit0/introduction). 10–15 שעות.
  - [ ] [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). ‏confused deputy, ‏token passthrough.
  - [ ] 🎬 [MCP Dev Summit North America 2026](https://www.youtube.com/playlist?list=PLjULwdJUtFdhIBhibLEogtK1XYCNaFyFl). ‏Agentic AI Foundation, פלייליסט של 108 סרטונים, 2026. הכנס הרשמי של MCP. בוחרים הרצאות, למשל על אבטחה ועל OAuth.
  - [ ] 🎬 [MCP Dev Summit Europe](https://www.youtube.com/playlist?list=PLjULwdJUtFdjEl2jZif3XgtTgvNDpJFlO). ‏Agentic AI Foundation, פלייליסט של 34 סרטונים.

**3ד. ‏Review, בדיקות ואיכות:**
- 🟢
  - [ ] 🎬 [Playwright: From MCP to Playwright Agents](https://www.youtube.com/watch?v=_AifxZGxwuk). 6 דקות. ‏planner, ‏generator ו־healer. חלק מסדרה: [Playwright MCP](https://www.youtube.com/playlist?list=PLQ6Buerc008cRjk0f4kEIiiQQoajK4Tq2), 9 סרטונים.
  - [ ] [Playwright Test Agents docs](https://playwright.dev/docs/test-agents). ‏`init-agents --loop=claude`.
  - [ ] 🎬 [Lessons from millions of AI code reviews](https://www.youtube.com/watch?v=TswQeKftnaw). ‏Graphite, 10 דקות, 2025. חלק מסדרה: [SWE Agents: AI Engineer World's Fair 2025](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0UwfWS-f6KDInzHc3um4naZ), 19 סרטונים.
- 🟡
  - [ ] 🎬 [Should AI Engineers Still Read Code in 2026?](https://www.youtube.com/watch?v=ZpK5PWX2YRM). ‏AI Engineer, 22 דקות, 2026. מסגרת להחלטה כמה review אנושי צריך. חלק מסדרה: [AI Architects @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0VeXEfQTcsO7buehrFvQAKj), 43 סרטונים.
  - [ ] 🎬 [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents). ‏DeepLearning.AI ו־Arize, 2:16 שעות, 2025. ‏tracing, ‏evals מבוססי קוד ו־LLM-as-judge. דורש הרשמה חינמית.
  - [ ] 🎬 [Playwright Live](https://www.youtube.com/playlist?list=PLQ6Buerc008cBoHB1_qxrnT3jYtuIMyCg). ‏Playwright, פלייליסט של 10 סרטונים, 2024–2025. שידורים חיים, כולל Playwright Agents ו־MCP.
- 🔴
  - [ ] [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). ‏Anthropic, 2026.
  - [ ] 🎬 [LLM Evals](https://www.youtube.com/playlist?list=PLgIaq8VgndJvt-HKMHPXehyJNNXQsAVHD). ‏Hamel Husain, פלייליסט של 35 סרטונים, 2025–2026. מומלץ במיוחד: "How to Ace AI Eval Interview Questions".
  - [ ] 🎬 [Evals & Benchmarks @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0XZS6wXjyB_8zuZBXHFTwYM). ‏AI Engineer, פלייליסט של 72 סרטונים, 2025–2026.
  - [ ] 🎬 [Full Workshops: AI Engineer World's Fair 2026](https://www.youtube.com/playlist?list=PLdaH-g_u9XSM). ‏AI Engineer, פלייליסט של 35 סרטונים, 2026. סדנאות של כשעה, למשל quality gates ב־agentic coding.
  - [ ] 🎬 [AI Dev 26 × SF](https://www.youtube.com/playlist?list=PLkDaE6sCZn6FcbioyqaUdO_NaNLF2JgcJ). ‏DeepLearning.AI, פלייליסט של 48 סרטונים, 2026. כולל "Deploying AI Code Review at Scale".

**3ה. ‏הובלת אימוץ, מדידה וסיכונים:**
- 🟢
  - [ ] [DORA AI Capabilities Model](https://dora.dev/ai/capabilities-model). שבע היכולות שמגבירות את התועלת מ־AI. נקודות מצוינות לריאיון.
  - [ ] [The Lethal Trifecta](https://simonwillison.net/2025/Aug/9/bay-area-ai/). ‏Simon Willison. המודל המנטלי ל־prompt injection.
- 🟡
  - [ ] 🎬 [DORA: State of AI-assisted Software Development](https://www.youtube.com/watch?v=Sz8NWaTiWfE). כותבי הדו"ח, 39 דקות, 2025. חלק מסדרה: [DORA Community Discussions 2025](https://www.youtube.com/playlist?list=PLMtxeMdO4DaAyqLaGrm8q55COt8eCMrKl), 19 סרטונים.
  - [ ] 🎬 [DORA: Code Reviews](https://www.youtube.com/watch?v=ZilOHXNJ7gU). 50 דקות, 2025. למה ה־review הופך לצוואר הבקבוק. חלק מסדרה: [DORA Community Discussions 2025](https://www.youtube.com/playlist?list=PLMtxeMdO4DaAyqLaGrm8q55COt8eCMrKl), 19 סרטונים.
  - [ ] 🎬 [The Pragmatic Summit 2026](https://www.youtube.com/playlist?list=PLzwJJv8h-icjtYA5oHmc7g6qU1t4OqDqb). ‏The Pragmatic Engineer, פלייליסט של 14 סרטונים, 2026. ‏Nicole Forsgren, ‏Simon Willison ו־Uber על הובלה בעידן AI.
- 🔴
  - [ ] [DORA 2025 Report](https://dora.dev/research/2025/dora-report/). הממצא המרכזי: "AI is an amplifier".
  - [ ] [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/).
  - [ ] 🎬 [DORA Community Discussions 2026](https://www.youtube.com/playlist?list=PLMtxeMdO4DaDD3a3jPyPTkiU8mC9xRt8M). ‏DORA, פלייליסט של 13 סרטונים, 2026. כולל סרטון על DORA AI Capabilities Model.
  - [ ] 🎬 [LDX3 London 2026](https://www.youtube.com/playlist?list=PLSYC7P4B7SSI). ‏LeadDev, פלייליסט של 50 סרטונים, 2026. הרצאות על אימוץ AI בארגונים, וגם על הובלה טכנית.
  - [ ] 🎬 [Augmented Engineering in Action](https://www.youtube.com/playlist?list=PLBzScQzZ83I_7XPSEBgFe6LkLZiyC0Dh6). ‏LeadDev, פלייליסט של 5 סרטונים, כשעה כל אחד, 2025. מקרי בוחן של אימוץ כלי AI בצוותים.

**תרגול:** נסח תשובה של 2–3 דקות ל־"איך הובלת אימוץ AI". השתמש בדוגמאות קונקרטיות (כלי שהצגת לצוות, כללי פרויקט, ‏plan mode), וחבר את התשובה ל־DORA AI Capabilities.

---

## 4. הובלה טכנית

**למה זה חשוב:**
- הסבב ההתנהגותי מכריע במשרות טק ליד.
- לרוב המועמדים יש מספיק סיפורים, אבל צריך לנסח אותם מראש. ראה את [בנק סיפורי STAR](interview-prep.md#בנק-סיפורי-star).

**שאלות צפויות:**
- החלטה טכנית שהובלת כשאחרים לא הסכימו. איך הגעת להסכמה?
- design doc או RFC שכתבת. אילו חלופות דחית?
- איך מחליטים בין חוב טכני לפיצ'רים?
- הערכת זמנים שהתבררה כשגויה מאוד. מה שינית אחריה?
- איך קידמת מפתח צעיר? מה הייתה התוצאה?
- תקלה בפרודקשן, בעיית אבטחה או בעיית נגישות שלקחת עליה אחריות מקצה לקצה.
- איך קובעים סטנדרט ל־code review?
- מקרה שבו אמרת "לא" לבעל עניין.

**מקורות:**
- 🟢
  - [ ] 🎬 [Navigating team friction](https://www.youtube.com/watch?v=lqqBktWqPLo). ‏Lara Hogan, ‏LeadDev, 29 דקות, ⚠️ 2019. מסגרת לקונפליקטים. חלק מסדרה: [The Lead Developer London 2019](https://www.youtube.com/playlist?list=PLBzScQzZ83I9uW36NnjX6Pe5P63EpEk_q), 29 סרטונים.
  - [ ] 🎬 [Balancing direction and empowerment](https://www.youtube.com/watch?v=8mAtWhCIw-o). ‏Lara Hogan, ‏LDX3 2025, 24 דקות. חלק מסדרה: [LDX3 London 2025](https://www.youtube.com/playlist?list=PLBzScQzZ83I-k4wuKlvrOcp106jtYVHIJ), 78 סרטונים.
  - [ ] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/). ‏Malte Ubl, 15 דקות.
  - [ ] [Google Engineering Practices: Code Review](https://google.github.io/eng-practices/review/).
  - [ ] [ADR: Architecture Decision Records](https://adr.github.io/).
- 🟡
  - [ ] 🎬 [Talking With Tech Leads](https://www.youtube.com/watch?v=F81W-JcRgXM). ‏Patrick Kua, ‏GOTO, 35 דקות. מה זה בכלל טק ליד. חלק מסדרה: [GOTOpia November 2020](https://www.youtube.com/playlist?list=PLEx5khR4g7PI4l8PnLCv9j3PlePzuQPbm), 25 סרטונים.
  - [ ] 🎬 [Level Up: Choosing the Technical Leadership Path](https://www.youtube.com/watch?v=h4o0qcq1Kys). ‏Patrick Kua, ‏GOTO 2025, 40 דקות. חלק מסדרה: [GOTO Copenhagen 2025](https://www.youtube.com/playlist?list=PLEx5khR4g7PINwOsYrkwz3lTTJUYoXC53), 63 סרטונים.
  - [ ] 🎬 [Will Larson Reflects on Staff Engineer](https://www.youtube.com/watch?v=RBPtGtMY8bE). ‏Book Overflow, 63 דקות, 2025. השפעה בלי סמכות. חלק מסדרה: [Book Overflow: Author Interviews](https://www.youtube.com/playlist?list=PL0QgKDBEHsh-MlBfp17ITMLYQ72ZjejZf), 23 סרטונים.
  - [ ] [Scaling the Practice of Architecture, Conversationally](https://martinfowler.com/articles/scaling-architecture-conversationally.html). ‏Andrew Harmel-Law. ה־advice process.
- 🔴
  - [ ] [StaffEng: guides and book](https://staffeng.com/guides/). ‏Will Larson, חינמי במלואו.
  - [ ] 🎬 [StaffPlus New York 2025](https://www.youtube.com/playlist?list=PLBzScQzZ83I-XQzdocmMEHDXn5TTBJtYg). ‏LeadDev, פלייליסט של 26 סרטונים, 2025. השפעה בלי סמכות, אסטרטגיה ומתי לרדת לקוד.
  - [ ] 🎬 [LeadDev New York 2025](https://www.youtube.com/playlist?list=PLBzScQzZ83I9KlDOPtnjaUYr9Q7u84mmE). ‏LeadDev, פלייליסט של 26 סרטונים, 2025.
  - [ ] 🎬 [Culture & Human Factor](https://www.youtube.com/playlist?list=PLEx5khR4g7PJquVHXtkcdo-QzK54bfmY9). ‏GOTO, פלייליסט של 205 סרטונים. פלייליסט נושאי. בוחרים הרצאות ולא צופים ברצף.

**ריאיון התנהגותי:**
- 🟢
  - [ ] [Tech Interview Handbook: Behavioral](https://www.techinterviewhandbook.org/behavioral-interview/).
- 🟡
  - [ ] 🎬 [Tech Lead Manager Behavioral Interview](https://www.youtube.com/watch?v=EcaxGJc5e9c). ‏interviewing.io, 61 דקות. ריאיון סימולציה ברמה הנכונה. חלק מסדרה: [interviewing.io: Behavioral](https://www.youtube.com/playlist?list=PLm6XThSMgu_F7qBnIVsM1b80rhgwAd37W), 7 סרטונים.
  - [ ] 🎬 [Senior Engineer Behavioral Mock Interview](https://www.youtube.com/watch?v=c3TE7h9gA4g). ‏Aced, לשעבר Exponent, 78 דקות, 2025.

---

## 5. ביצועים

**למה זה חשוב:** ביצועים עולים כמעט בכל ריאיון, ובמיוחד במוצרים כבדים בתמונות ובווידאו. כדאי להגיע עם סיפור על בעיית ביצועים שאבחנת ופתרת.

**שאלות צפויות:**
- איך מאבחנים INP גרוע?
- SSR, ‏SSG או islands למוצר נתון?
- איך אוכפים performance budget ב־CI?
- איך מקטינים bundle גדול?
- אסטרטגיית תמונות בלי CLS.
- מה ההבדל בין field data ל־lab data?

**מקורות:**
- 🟢
  - [ ] [Web Vitals](https://web.dev/articles/vitals) ו־[INP](https://web.dev/articles/inp). ‏web.dev.
  - [ ] 🎬 [How to optimize web responsiveness with INP](https://www.youtube.com/watch?v=KZ1kxzsJZ5g). ‏Chrome for Developers, 15 דקות, ⚠️ 2023.
  - [ ] [Islands Architecture](https://www.patterns.dev/vanilla/islands-architecture). ‏patterns.dev.
  - [ ] 🎬 [Web Vitals Explained](https://www.youtube.com/watch?v=KY6Cr6t-cuA). ‏Syntax, 23 דקות. גרסה מצולמת למאמרים של web.dev על Web Vitals ו־INP.
  - [ ] 🎬 [The Chrome DevTools Performance Panel](https://www.youtube.com/watch?v=nJ-h7UWdXZA). ‏Rick Viscomi, ‏SquiggleConf, 30 דקות. עוזר לענות על "איך מאבחנים עמוד איטי".
- 🟡
  - [ ] [Optimize INP](https://web.dev/articles/optimize-inp) ו־[Rendering on the Web](https://web.dev/articles/rendering-on-the-web). ‏web.dev.
  - [ ] 🎬 [Speculations about Web Performance](https://www.youtube.com/watch?v=DqE9WV76wFo). ‏Barry Pollard, 45 דקות, 2025. ‏Speculation Rules ו־prerendering. חלק מסדרה: [performance.now() 2025](https://www.youtube.com/playlist?list=PLjnstNlepBvMaPzdydTZkU2tkfqnKqQbd), 15 סרטונים.
- 🔴
  - [ ] [Learn Performance](https://web.dev/learn/performance) ו־[Learn Images](https://web.dev/learn/images). ‏web.dev, 6–8 שעות.
  - [ ] 🎬 [Lightning-Fast Web Performance](https://www.youtube.com/playlist?list=PLLJVBc54k0YuAY22CyeTXt8fWNT2GXGxp). ‏Scott Jehl, ‏Catchpoint, פלייליסט של 11 סרטונים. קורס מלא וחינמי. התוכן מלפני INP, אז כדאי להשלים עם החומר על INP.
  - [ ] 🎬 [performance.now() 2024](https://www.youtube.com/playlist?list=PLjnstNlepBvOxZeta4-yAFDllxfW-A5EC). ‏Web Conferences Amsterdam, פלייליסט של 16 סרטונים, 2024.
  - [ ] 🎬 [Developer Tooling Tips (#DevToolsTips)](https://www.youtube.com/playlist?list=PLNYkxOF6rcIAcezfL8q0rjt13ufKseL5X). ‏Chrome for Developers, פלייליסט של 50 סרטונים, 2021–2026. כולל הקלטה וניתוח של performance trace.

---

## 6. אסטרטגיית בדיקות

**למה זה חשוב:** טק ליד הוא זה שמחליט מה בודקים, באיזו רמה, וכמה.

**שאלות צפויות:**
- testing trophy או pyramid?
- מה בודקים ב־unit, מה ב־integration ומה ב־E2E?
- איך מתמודדים עם טסטים לא יציבים (flaky)?
- contract tests מול backend.
- visual regression.
- איפה AI עוזר בבדיקות? ראה 3ד.

**מקורות:**
- 🟢
  - [ ] 🎬 [Write tests. Not too many. Mostly integration.](https://www.youtube.com/watch?v=aHYtZsoXs2w). ‏Kent C. Dodds, 25 דקות, ⚠️ 2018.
  - [ ] [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications).
- 🟡
  - [ ] [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html). ‏Ham Vocke, כולל contract tests.
  - [ ] 🎬 [Testing Web Applications with Playwright](https://www.youtube.com/watch?v=xkSnDXjCEvU). ‏Debbie O'Brien, ‏vuejs.de, 27 דקות, ⚠️ 2022. חלק מסדרה: [Playwright Conference Talks](https://www.youtube.com/playlist?list=PLQ6Buerc008dz_QCdbMO3dfix1ndbCdz4), 19 סרטונים.
  - [ ] 🎬 [Vitest Browser Mode with Vladimir Sheremet](https://www.youtube.com/watch?v=p2cCpG2FeLU). מתחזק Vitest, 91 דקות, 2024.
  - [ ] [Visual Testing Handbook](https://storybook.js.org/tutorials/visual-testing-handbook/). ‏Storybook.
  - [ ] 🎬 [Get started with end-to-end testing: Playwright](https://www.youtube.com/playlist?list=PLQ6Buerc008ed-F9OksF7ek37wR3y916p). ‏Playwright, פלייליסט של 7 סרטונים, כ־43 דקות. גרסה מצולמת לתיעוד של Playwright.
  - [ ] 🎬 [What's new in Playwright](https://www.youtube.com/playlist?list=PLQ6Buerc008fTzmUIPkPo3Eis0vjx7ykn). ‏Playwright, פלייליסט של 32 סרטונים. סרטוני גרסה של כ־6 דקות. מספיק לצפות בשלושה־ארבעה האחרונים.
  - [ ] 🎬 [Unit Testing (Vitest) Crash Course](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iyuClsf48SSgsJPBStHo7F). ‏Net Ninja, פלייליסט של 14 סרטונים, כ־2:35 שעות, 2025. גרסה מצולמת לתיעוד של Vitest.
  - [ ] 🎬 [Storybook Test Bootcamp](https://www.youtube.com/playlist?list=PLw6GJy26kmCKgVZR2_82AfKPyQRSIH-B0). ‏Chromatic, פלייליסט של 8 סרטונים, 1:35 שעות, 2025. בדיקות קומפוננטות, ויזואליות ונגישות. גרסה מצולמת ל־Visual Testing Handbook.
- 🔴
  - [ ] [Vitest](https://vitest.dev/guide/)
  - [ ] [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro)
  - [ ] [Playwright](https://playwright.dev/docs/intro)
  - [ ] [Pact](https://docs.pact.io/)

---

## 7. יסודות JS/דפדפן ו־live coding

**למה זה חשוב:** גם בריאיונות לבכירים יש לפעמים סבב קוד. כדאי לרענן את הנושאים האלה כדי שלא תיתפס לא מוכן.

**שאלות צפויות:**
- מה סדר ההדפסות כשמעורבים microtasks ו־macrotasks?
- ממש debounce ו־throttle עם leading ו־trailing.
- deep clone שמטפל במעגלים.
- `Promise.all` ו־`allSettled`.
- event emitter עם `off` ו־`once`.
- רשימה וירטואלית.

**מקורות:**
- 🟢
  - [ ] 🎬 [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ). ‏Philip Roberts, 26 דקות. ⚠️ ישן, אבל לא מתיישן.
  - [ ] 🎬 [In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0). ‏Jake Archibald, 35 דקות. ‏microtasks ו־rAF. חובה.
  - [ ] [Front End Interview Playbook](https://www.greatfrontend.com/front-end-interview-playbook). מבנה הסבבים.
  - [ ] 🎬 [JavaScript Visualized: Event Loop, Web APIs, (Micro)task Queue](https://www.youtube.com/watch?v=eiC58R16hb8). ‏Lydia Hallie, 13 דקות. השלמה עדכנית ל־Roberts ול־Archibald. יש גם [Promise Execution](https://www.youtube.com/watch?v=Xs1EMmBLpn4).
- 🟡
  - [ ] 🎬 [JavaScript: Understanding the Weird Parts](https://www.youtube.com/watch?v=Bv_5Zv5c-Ts). ‏Tony Alicea, 3:32 שעות, ⚠️ 2015. ‏closures, ‏this ו־scope.
- 🔴
  - [ ] [GreatFrontEnd JS questions](https://www.greatfrontend.com/questions/javascript-functions). רבות מהשאלות חינמיות.
  - [ ] [BFE.dev](https://bigfrontend.dev/). מאגר תרגילים חינמי.
  - [ ] 🎬 [Learn how to THINK in code: The Hard & Conceptual Parts of JavaScript](https://www.youtube.com/watch?v=x7u2c0DhWEU). ‏freeCodeCamp, 4:41 שעות, 2026. תחליף עדכני ל־"Understanding the Weird Parts".
  - [ ] 🎬 [Javascript Interview Questions](https://www.youtube.com/playlist?list=PLKhlp2qtUcSaCVJEt4ogEFs6I41pNnMU5). ‏RoadsideCoder, פלייליסט של 16 סרטונים, 2022–2026. שאלות output ו־polyfills לפי נושא.
  - [ ] 🎬 [Javascript Polyfill Series](https://www.youtube.com/playlist?list=PLQOMi2yb4hF0xc__bNw-S9WIwK9fWdvgM). ‏Frontend Master, פלייליסט של 26 סרטונים, 2025–2026. תואם את התרגילים כאן: debounce, ‏Promise.all ודומיהם.
  - [ ] 🎬 [Technical Interview Questions for JavaScript Developers](https://www.youtube.com/playlist?list=PLyS0ae3XTiIHj0tUGW6R6cUH7vgooPxSE). ‏theSeniorDev, פלייליסט של 34 סרטונים, 2024–2026.
  - [ ] 🎬 [HTTP 203](https://www.youtube.com/playlist?list=PLNYkxOF6rcIAKIQFsNbV0JDws_G_bnNo9). ‏Jake Archibald ו־Surma, פלייליסט של 140 סרטונים, ⚠️ 2018–2022. מאחורי הקלעים של הדפדפן. בוחרים פרקים.

---

## 8. TypeScript מתקדם

**שאלות צפויות:**
- הקלדה של `get(obj, "a.b.c")` עם template literal types.
- event emitter עם טיפוסים.
- מתי משתמשים ב־`infer`?
- overloads או generics?
- branded types.
- API client עם type safety מקצה לקצה.

**מקורות:**
- 🟢
  - [ ] 🎬 [Generics: The most intimidating TypeScript feature](https://www.youtube.com/watch?v=dLPgQRbVquo). ‏Matt Pocock, 18 דקות. חלק מסדרה: [Advanced TypeScript (Matt Pocock)](https://www.youtube.com/playlist?list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b), 38 סרטונים.
  - [ ] 🎬 [Infer is easier than you think](https://www.youtube.com/watch?v=hLZXJTm7TEk). ‏Matt Pocock, 13 דקות. חלק מסדרה: [Advanced TypeScript (Matt Pocock)](https://www.youtube.com/playlist?list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b), 38 סרטונים.
  - [ ] 🎬 [TypeScript 7 Is Here](https://www.youtube.com/watch?v=OytpXXeNmTQ). ‏Microsoft Developer, 11 דקות, 2026. הפורט ל־Go. לעומק: [A 10x Faster TypeScript](https://www.youtube.com/watch?v=UJfF3-13aFo) עם Anders Hejlsberg.
  - [ ] 🎬 [Learn Advanced TypeScript In 25 Minutes](https://www.youtube.com/watch?v=bnTAOB3P6nM). ‏Web Dev Simplified, 26 דקות. ‏infer, ‏extends ו־conditional types.
- 🟡
  - [ ] [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html). ה־Handbook.
  - [ ] 🎬 [Advanced TypeScript Workshop: Conditional Typing, Discriminated Unions, Mapped Types](https://www.youtube.com/watch?v=nDMjpsJkkHU). ‏This Dot Media, 1:18 שעות. גרסה מצולמת ל־"Creating Types from Types".
- 🔴
  - [ ] [Total TypeScript Essentials](https://www.totaltypescript.com/books/total-typescript-essentials). ספר חינמי. יש גם [tutorials](https://www.totaltypescript.com/tutorials).
  - [ ] [type-challenges](https://github.com/type-challenges/type-challenges). רמות medium ו־hard.
  - [ ] 🎬 [The TypeScript Course for JS Devs](https://www.youtube.com/watch?v=K01hLNDdqg4). ‏Boot.dev ו־Web Dev Simplified, 4:24 שעות. קורס מלא וחינמי.
  - [ ] 🎬 [Advanced TypeScript](https://www.youtube.com/playlist?list=PLMVa1aNuMvMcL81jW1lImg11w-UQOXp1N). ‏Typed Rocks, פלייליסט של 33 סרטונים, 2024–2026. תכנות ברמת הטיפוסים.
  - [ ] 🎬 [TypeScript Type Challenges: SOLVED](https://www.youtube.com/playlist?list=PLBO33OUk67hb5dHW6_vS_o33CMqmDQQ6m). ‏Phil Goodbread, פלייליסט של 40 סרטונים, 2024–2025. פתרונות מצולמים ל־type-challenges.

---

## 9. מגמות רוחב בין פריימוורקים

**למה זה חשוב:**
- ארכיטקט צפוי להבין לאן התחום הולך, ולא רק את הכלי שלו.
- הנושאים המרכזיים: ‏signals מתכנסים בכל הפריימוורקים; הדיון ב־VDOM מול compiled (ו־Vapor הוא בדיוק התשובה של Vue); והדרכים להוריד את עלות ה־hydration.

**שאלות צפויות:**
- VDOM diffing מול fine-grained signals: מתי כל אחד מנצח?
- למה signals מתכנסים בכל הפריימוורקים, ומה הצעת TC39 מנסה לתקנן?
- מה העלות של hydration, ואיך islands, ‏partial hydration, ‏resumability ו־RSC מורידים אותה?
- SSR, ‏SSG, ‏ISR או CSR: מתי כל אחד? ואיך עובד streaming SSR?
- Nuxt, ‏Next, ‏Astro או TanStack Start: למה כל אחד מהם מכוון?
- מה השתנה ב־Angular המודרני, והאם היית בוחר בו היום?

**9א. ‏Signals ומודלי reactivity:**
- 🟢
  - [ ] 🎬 [What Every React Developer Should Know About Signals](https://www.youtube.com/watch?v=VgGl9i-OBBI). ‏Ryan Carniato, 11 דקות, 2025.
  - [ ] 🎬 [Svelte 5: Introducing Runes](https://www.youtube.com/watch?v=RVnxF3j3N8U). ‏Rich Harris, 13 דקות, 2023.
  - [ ] [React vs Signals: 10 Years Later](https://dev.to/this-is-learning/react-vs-signals-10-years-later-3k71) ו־[The Evolution of Signals in JavaScript](https://dev.to/this-is-learning/the-evolution-of-signals-in-javascript-8ob). ‏Ryan Carniato.
  - [ ] 🎬 [How to deeply understand Angular signals](https://www.youtube.com/watch?v=C_xXv27_gHg). ‏Joshua Morony, 11 דקות.
- 🟡
  - [ ] 🎬 [Beyond Signals](https://www.youtube.com/watch?v=DZPSAOBnBAM). ‏Ryan Carniato, ‏JetBrains, 34 דקות, 2025. חלק מסדרה: [SolidJS Talks](https://www.youtube.com/playlist?list=PL16vUvov3c5D1_KlYevpriA9QMkVkY32l), 23 סרטונים.
  - [ ] 🎬 [Fine-grained everything](https://www.youtube.com/watch?v=xSr-gAZ8yeg). ‏Rich Harris, 43 דקות, 2026. חלק מסדרה: [performance.now() 2025](https://www.youtube.com/playlist?list=PLjnstNlepBvMaPzdydTZkU2tkfqnKqQbd), 15 סרטונים.
  - [ ] 🎬 [PodRocket: Rich Harris on fine-grained reactivity](https://www.youtube.com/watch?v=isp32w1uJ3k). 48 דקות, 2026.
  - [ ] [A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf). בונים signals מאפס.
- 🔴
  - [ ] [TC39 proposal-signals](https://github.com/tc39/proposal-signals). ‏Stage 1.
  - [ ] [Vue Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html), ‏[Angular Signals](https://angular.dev/guide/signals), ‏[Preact Signals](https://preactjs.com/guide/v10/signals/). כדאי להשוות בין ה־APIs.
  - [ ] 🎬 [Designing Async-First Signals](https://www.youtube.com/watch?v=ori9xZhvNlc). ‏Ryan Carniato, סטרים של 6.5 שעות. מומלץ לצפות בחלקים. חלק מסדרה: [JavaScript Friday Streams](https://www.youtube.com/playlist?list=PL16vUvov3c5DBCiUSlh6gPr3Ws7VectSj), 135 סרטונים.
  - [ ] 🎬 [Svelte Summit Spring 2025](https://www.youtube.com/playlist?list=PL8bMgX1kyZThKy_B41FQHk_xsHMQouV1Z). ‏Svelte Society, פלייליסט של 15 סרטונים, 2025.
  - [ ] 🎬 [Angular Signals](https://www.youtube.com/playlist?list=PLErOmyzRKOCr07Kcnx75Aqh6PWSbIokPB). ‏Deborah Kurata, פלייליסט של 18 סרטונים, 2023–2025.

**9ב. ‏אסטרטגיות רינדור:**
- 🟢
  - [ ] 🎬 [Rethinking reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao). ‏Rich Harris, 37 דקות, ⚠️ 2019 (קלאסיקה). הטענה ש־"virtual DOM is pure overhead".
  - [ ] 🎬 [Hydration, Islands, Streaming, Resumability… Oh My!](https://www.youtube.com/watch?v=GpUJAH7XgFk). ‏Matheus Albuquerque, ‏CityJS, 21 דקות. גרסה מצולמת ל־Rendering on the Web ול־islands. רלוונטי גם לנושא 5.
- 🟡
  - [ ] 🎬 [Resumability vs Hydration](https://www.youtube.com/watch?v=0LR-eb6gYKg). ‏Miško Hevery, 28 דקות, 2023.
  - [ ] 🎬 [Rendering on the Web](https://www.youtube.com/watch?v=k-A2VfuUROg). ‏Google I/O, 33 דקות, ⚠️ 2019. חלק מסדרה: [Web at Google I/O 2019](https://www.youtube.com/playlist?list=PLNYkxOF6rcIATmAmz7HcCzongGvQEtx8i), 28 סרטונים.
  - [ ] [Islands Architecture](https://jasonformat.com/islands-architecture/). ‏Jason Miller, המאמר המקורי.
- 🔴
  - [ ] [Progressive Hydration](https://www.patterns.dev/react/progressive-hydration). ‏patterns.dev.
  - [ ] [Qwik: Resumable](https://qwik.dev/docs/concepts/resumable/), ‏[React Server Components](https://react.dev/reference/rsc/server-components), ‏[Vue Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html).
  - [ ] 🎬 [React SSR and RSC (stream)](https://www.youtube.com/watch?v=dnuh-jKuDpk). ‏Ryan Carniato, 3 שעות, ⚠️ 2022.

**9ג. ‏Meta-frameworks:**
- 🟢
  - [ ] 🎬 [What are Islands?](https://www.youtube.com/watch?v=6F-lQe_BzeM). ‏Astro, 2 דקות. חלק מסדרה: [Why Astro?](https://www.youtube.com/playlist?list=PL8Qn4kutqAEtWP59rzrNdMOUt-w5Q8UoF), 7 סרטונים.
  - [ ] 🎬 [TanStack Start](https://www.youtube.com/watch?v=_3TbZtQ-9rg). ‏React Conf, 11 דקות, 2026.
  - [ ] 🎬 [Astro 5.0 Crash Course](https://www.youtube.com/watch?v=eQXG75XirdE). ‏Coding in Public, 28 דקות.
- 🔴 לקרוא את עמוד ה־"למה" של כל אחד:
  - [ ] [Nuxt rendering](https://nuxt.com/docs/guide/concepts/rendering)
  - [ ] [Next server/client components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [ ] [SvelteKit](https://svelte.dev/docs/kit/introduction)
  - [ ] [SolidStart](https://docs.solidjs.com/solid-start)
  - [ ] [Astro islands](https://docs.astro.build/en/concepts/islands/)
  - [ ] [Analog](https://analogjs.org/docs)

**9ד. ‏Angular ברמת סקירה:**
- 🟢
  - [ ] 🎬 [What's new in Angular v22](https://www.youtube.com/watch?v=h5OJUSS_8IA). רשמי, 17 דקות, 2026. חלק מסדרה: [Angular v22](https://www.youtube.com/playlist?list=PL1w1q3fL4pmjc2HqYCRIBuaNnT0qZuRdU), 4 סרטונים.
  - [ ] 🎬 [What's new in Angular v21](https://www.youtube.com/watch?v=DDAHORVzQ5g). רשמי, 15 דקות, 2025. הגרסה שבה zoneless נהיה ברירת המחדל. חלק מסדרה: [Angular v21](https://www.youtube.com/playlist?list=PL1w1q3fL4pmjOMxZM9zPgCC1BBw11S1--), 10 סרטונים.
  - [ ] 🎬 [Getting started with Angular Signals](https://www.youtube.com/watch?v=EEzDLpIbW9w). רשמי, 11 דקות.
  - [ ] 🎬 [No Zone, No Problem: Building Angular Apps without Zone.js](https://www.youtube.com/watch?v=kuoUzniDupw). ‏angularday, 30 דקות, 2026. גרסה מצולמת לתיעוד על zoneless.
- 🟡
  - [ ] 🎬 [Angular Signals Crash Course](https://www.youtube.com/watch?v=8cdtNWtjADM). ‏Zoaib Khan, 45 דקות.
- 🔴
  - [ ] [Zoneless](https://angular.dev/guide/zoneless)
  - [ ] [Control flow](https://angular.dev/guide/templates/control-flow)
  - [ ] [Components](https://angular.dev/guide/components)
  - [ ] 🎬 [Angular v20](https://www.youtube.com/playlist?list=PL1w1q3fL4pmh04gfVuEhZeUjOygtlv9fR). ‏Angular, פלייליסט של 15 סרטונים, 2025. יחד עם v21 ו־v22 זו היסטוריה רשמית של שלוש הגרסאות האחרונות.
  - [ ] 🎬 [Angular Day by Frontend Nation 2025](https://www.youtube.com/playlist?list=PLxddmVXxb3Ht8EPV7tecBz-SALVw6jGcE). ‏Unlearn, פלייליסט של 13 סרטונים, 2025.

---

## 10. השוואה ובחירת פריימוורק

**למה זה חשוב:**
- כדאי להגיע עם סיפור על בחירת טכנולוגיה שהשתתפת בה או הובלת.
- שאלה צפויה: **"מה היית מחליט אחרת ב־2026?"**

**קריטריונים לבחירה:** אפשר להשתמש ברשימה הזו כשלד לתשובה בריאיון.
1. הכישורים של הצוות ועלות הלמידה.
2. שוק הגיוס המקומי. בישראל React מוביל, ו־Vue ו־Angular הם נישה.
3. בשלות האקוסיסטם: ‏UI kits, טפסים, ‏i18n, בדיקות ו־devtools.
4. התאמה לבעיה: אתר תוכן, אפליקציה או דשבורד, ומה זה אומר על הרינדור וה־SSR.
5. תקציב ביצועים: ‏bundle, עלות hydration ו־CWV.
6. אריכות ימים וממשל: חברה או קהילה, קצב שחרורים ו־bus factor.
7. עלות מיגרציה ו־interop: מסלול הדרגתי (strangler, ‏micro-frontends) ו־Web Components.
8. איכות התמיכה ב־TypeScript ובכלים: ‏Vite, ‏lint ו־IDE.
9. תלות בספק או בפלטפורמת אחסון, למשל Next.js ו־Vercel.
10. מדיניות אבטחה ו־LTS, וכמה כואב לשדרג.
11. "Innovation tokens": לבחור טכנולוגיה משעממת, להוכיח את הבחירה ב־PoC ולמדוד.
12. לתעד ב־ADR את החלופות, משקלות הקריטריונים ותאריך לבחינה מחדש.

**שאלות צפויות:**
- ספר על בחירת פריימוורק שהובלת. מה היית עושה אחרת היום?
- איך מאזנים בין שוק הגיוס לבין היתרונות הטכניים? מה נכנס ל־ADR?
- Web Components או Lit ל־design system שמשרת כמה פריימוורקים? מה ה־trade-offs ב־SSR, בטפסים וב־theming?
- איך מעבירים אפליקציה גדולה בהדרגה בלי להקפיא פיתוח?

**מקורות:**
- 🟢
  - [ ] [Choose Boring Technology](https://mcfunley.com/choose-boring-technology). ‏Dan McKinley, 15 דקות, ⚠️ 2015 (קלאסיקה). מקור המונח "innovation tokens".
  - [ ] 🎬 [A Plea for Boring Tech](https://www.youtube.com/watch?v=75dQlJKIfV0). ‏Jason Lengstorf, 22 דקות, 2023. הזווית של frontend.
  - [ ] 🎬 [Vue.js: The Documentary](https://www.youtube.com/watch?v=OrxmtDw4pVI). 35 דקות. איך ולמה ארגונים אימצו את Vue. חלק מסדרה: [Documentaries for Developers](https://www.youtube.com/playlist?list=PLtEPUaeDclku1ECmuN3IsUimHApukWIOf), 20 סרטונים.
  - [ ] 🎬 [I built the same app 10 times](https://www.youtube.com/watch?v=cuHDQhDhvPE). ‏Fireship, 22 דקות, ⚠️ 2021. רענון קליל בלבד.
  - [ ] 🎬 [The Front-end Frameworks Guide 2026](https://www.youtube.com/watch?v=qwDp5pZA_TA). ‏Code Hub, 16 דקות, 2026. סקירה עדכנית במקום הסרטון של Fireship מ־2021.
- 🟡
  - [ ] [boringtechnology.club](https://boringtechnology.club/). הגרסה המורחבת של "Choose Boring Technology".
  - [ ] [State of JS 2025: Front-end Frameworks](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/). נתוני שימוש ושביעות רצון.
  - [ ] 🎬 [Introduction to Lit](https://www.youtube.com/watch?v=uzFakwHaSmw) ו־[Lit docs](https://lit.dev/docs/). אלטרנטיבה שלא תלויה בפריימוורק. חלק מסדרה: [Lit University](https://www.youtube.com/playlist?list=PLbhRdTr_I1Ti6cdipmHHGeNag2cT7znEF), 3 סרטונים.
  - [ ] 🎬 [React.js: The Documentary](https://www.youtube.com/watch?v=8pDqJVdNa44). ‏CultRepo, 1:18 שעות. יש גם [Angular: The Documentary](https://www.youtube.com/watch?v=cRC9DlH45lA). הסיפורים מאחורי האימוץ של כל פריימוורק.
  - [ ] 🎬 [TypeScript Origins: The Documentary](https://www.youtube.com/watch?v=U6s2pdxebSo). ‏OfferZen Origins, 1:22 שעות. אימוץ וממשל של TypeScript.
  - [ ] 🎬 [Architectural Decision Records: The Why and How](https://www.youtube.com/watch?v=HNgZo4r4y7U). ‏Venkat Subramaniam, 58 דקות, 2026. וידאו לקריטריון 12, ‏ADR.
  - [ ] 🎬 [How to use Web Components, and why you'd want to](https://www.youtube.com/watch?v=qUhtlnL48yA). ‏Kevin Powell, 39 דקות. לשאלה על Web Components ל־design system חוצה פריימוורקים.
  - [ ] 🎬 [The Open Web Panel](https://www.youtube.com/watch?v=hWjixVxUt40). ‏Vercel, 41 דקות. הזווית של תלות בספק, קריטריון 9.

---

## 11. אבטחה

**למה זה חשוב:** כמעט כל מוצר צריך התחברות, אז כדאי לדעת להסביר token מול cookie, ‏BFF ו־OAuth, וגם 2FA וכניסה חברתית.

**שאלות צפויות:**
- XSS ו־CSP: ‏strict CSP ו־Trusted Types.
- CSRF.
- איפה שומרים tokens ב־SPA?
- OAuth/OIDC ותבנית ה־BFF.
- supply chain ב־npm, למשל תולעת Shai-Hulud.
- prompt injection בפיצ'רים של AI. ראה 3ה.

**מקורות:**
- 🟢
  - [ ] 🎬 [OWASP Top 10 2025: complete guide](https://www.youtube.com/watch?v=Jzr0Jdnq_EI). ‏Aikido, 24 דקות, 2025.
  - [ ] [OWASP Top 10:2025](https://owasp.org/Top10/2025/).
  - [ ] [Strict CSP](https://web.dev/articles/strict-csp) ו־[Trusted Types](https://web.dev/articles/trusted-types). ‏web.dev.
  - [ ] 🎬 [Shai-Hulud: the npm worm explained](https://www.youtube.com/watch?v=c6iq-3-PPJE). ‏Sysdig, 3 דקות, 2025.
- 🟡
  - [ ] 🎬 [Breaking & Securing OAuth 2.0 in Frontends](https://www.youtube.com/watch?v=oGktdQ45bTg). ‏Philippe De Ryck, ‏YOW! 2025, 40 דקות. גניבת tokens ו־BFF.
  - [ ] 🎬 [Introduction to OAuth 2.0 and OpenID Connect](https://www.youtube.com/watch?v=GyCL8AJUhww). ‏Philippe De Ryck, 47 דקות, ⚠️ 2018.
  - [ ] 🎬 [Identity Explained](https://www.youtube.com/playlist?list=PLshTZo9V1-aEgjy9YxxlDVpsTDhQVlxZ1). ‏OktaDev, פלייליסט של 9 סרטונים, 1:42 שעות, 2023–2024. כולל auth ב־SPA, ‏refresh tokens ו־passkeys. עונה ישירות על "איפה שומרים tokens".
- 🔴
  - [ ] [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/). ‏XSS, ‏CSRF, ‏CSP ו־NPM Security.
  - [ ] [PortSwigger Web Security Academy](https://portswigger.net/web-security). המעבדות דורשות הרשמה חינמית.
  - [ ] [OAuth 2.0 for Browser-Based Apps (IETF)](https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/).
  - [ ] 🎬 [OWASP Global AppSec DC 2025](https://www.youtube.com/playlist?list=PLpr-xdpM8wG8MryXHpJ_KqCuJMplXB5-K). ‏OWASP, פלייליסט של 24 סרטונים, 2025. כולל את ההכרזה על OWASP Top 10 2025.
  - [ ] 🎬 [OWASP 25th Anniversary Virtual Conference](https://www.youtube.com/playlist?list=PLpr-xdpM8wG--oYd1Ho10KRpzKQ7bGBNI). ‏OWASP, פלייליסט של 16 סרטונים, 2026. אבטחה ל־"vibe coders" ו־zero trust לסוכנים.
  - [ ] 🎬 [PortSwigger Research Presentations](https://www.youtube.com/playlist?list=PLoX0sUafNGbEkK0ai5P_DB2HDnljRAJyZ). ‏PortSwigger, פלייליסט של 26 סרטונים, 2017–2026. מחקר התקפי לעומק. הצד המצולם של Web Security Academy.

---

## 12. נגישות

**למה זה חשוב:** נגישות היא דרישה חוקית בהרבה מוצרים, ומעט מועמדים מגיעים אליה עם עומק. כדאי לרענן את WCAG 2.2 ולהכין סיפור שמראה הבנה מעשית.

**מקורות:**
- 🟢
  - [ ] [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). ‏W3C. תשעה קריטריונים חדשים, ו־4.1.1 הוסר.
  - [ ] 🎬 [What's New in WCAG 2.2](https://www.youtube.com/watch?v=QRQ1EV7WMhA). 11 דקות.
  - [ ] 🎬 [Screen Reader Basics: VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms) ו־[NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU). ‏A11ycasts, ⚠️ 2016. חלק מסדרה: [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g), 30 סרטונים.
- 🟡
  - [ ] [Learn Accessibility](https://web.dev/learn/accessibility). ‏web.dev, כשלוש שעות.
  - [ ] 🎬 [Learn Accessibility: Full a11y Tutorial](https://www.youtube.com/watch?v=e2nkq3h1P68). ‏freeCodeCamp, 1:33 שעות, 2024. גרסה מצולמת ל־Learn Accessibility של web.dev.
- 🔴
  - [ ] [ARIA Authoring Practices Guide: Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/).
  - [ ] [WCAG 2.2](https://www.w3.org/TR/WCAG22/) ו־[WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/).
  - [ ] 🎬 [Web Accessibility for Beginners](https://www.youtube.com/playlist?list=PLadWW12WRDFNrIb1jHDWso76xb2m3oLtz). ‏Stefany Newman, פלייליסט של 33 סרטונים, 2026. ‏ARIA, בדיקה עם NVDA ו־audit של WCAG צעד אחר צעד.
  - [ ] 🎬 [Trending A11Y](https://www.youtube.com/playlist?list=PLdhQLgcmuKTt_LSUskFGMeYMiX736O74M). ‏Deque Systems, פלייליסט של 28 סרטונים, 2025–2026. הרצאות מ־axe-con 2025, ‏AI ונגישות, ו־EAA.

---

## 13. Design Systems ו־Web Components

**למה זה חשוב:**
- Web Components עם Shadow DOM הם הכלי הטבעי ל־widget שמוטמע באתרים זרים, ול־design system שמשרת כמה פריימוורקים.
- design system משותף לכל הצוותים הוא תחום אחריות טבעי של ארכיטקט.

**מקורות:**
- 🟢
  - [ ] 🎬 [Web Components Crash Course](https://www.youtube.com/watch?v=PCWaFLy3VUo). ‏Traversy, 28 דקות, ⚠️ 2020.
  - [ ] 🎬 [Styling Web Components with Shadow DOM](https://www.youtube.com/watch?v=Y0uxb4ga44Y). ‏Vaadin, 12 דקות. ‏CSS variables ו־`::part`.
  - [ ] 🎬 [Come to the light side: HTML Web Components](https://www.youtube.com/watch?v=uIuf5LlA6KQ). ‏Chris Ferdinandi, ‏11ty Conf, 20 דקות, 2024. תחליף עדכני ל־crash course של Traversy.
- 🟡
  - [ ] 🎬 [Design Tokens Explained](https://www.youtube.com/watch?v=eWT394G04Os). 49 דקות. חלק מסדרה: [Into Design Systems](https://www.youtube.com/playlist?list=PLMGy4p_QbO8zsUMBkcKsEm7kmAP2CWI2l), 8 סרטונים.
  - [ ] 🎬 [Agile Design Systems in Vue](https://www.youtube.com/watch?v=f19AtZvQ4gs). ‏Miriam Suzanne, 28 דקות, ⚠️ 2018.
  - [ ] 🎬 [Web Components Can't Save Us](https://www.youtube.com/watch?v=SGFx71uNbe4). ‏Scott Jehl, ‏Syntax, 51 דקות, 2024. מבט ביקורתי: מתי Web Components עוזרים ומתי לא.
  - [ ] 🎬 [Storybook Day 2023](https://www.youtube.com/playlist?list=PLw6GJy26kmCKP_dueaIyjqzYGAmTAMfSh). ‏Chromatic, פלייליסט של 16 סרטונים, 2:24 שעות, 2023. גרסה מצולמת ל־Intro to Storybook.
  - [ ] 🎬 [The Future of Design Systems Conference](https://www.youtube.com/playlist?list=PLMGy4p_QbO8wSGTDVyBxVV4I8wr7qsank). ‏Into Design Systems, פלייליסט של 8 סרטונים. ‏design tokens ו־multibrand.
- 🔴
  - [ ] [Vue and Web Components](https://vuejs.org/guide/extras/web-components.html), ‏[Custom Elements Everywhere](https://custom-elements-everywhere.com/), ‏[MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).
  - [ ] [Intro to Storybook](https://storybook.js.org/tutorials/intro-to-storybook/) ו־[Design Tokens Community Group](https://www.designtokens.org/).
  - [ ] 🎬 [U.S. Web Design System (USWDS)](https://www.youtube.com/playlist?list=PLd9b-GuOJ3nGqDYCNsCMHCQ9MdD5jfB01). ‏DigitalGov, פלייליסט של 56 סרטונים. ‏design system ציבורי אמיתי שעובר ל־Web Components, כולל ממשל.
  - [ ] 🎬 [Schema by Figma 2025](https://www.youtube.com/playlist?list=PLXDU_eVOJTx4w2uvC2CAoftEUM7V2Scmw). ‏Figma, פלייליסט של 14 סרטונים, 3:30 שעות, 2025. מפרט ה־tokens של DTCG, ‏multi-brand ו־design-to-code.

---

## 14. כלים, CI/CD ו־Observability

**מקורות:**
- 🟢
  - [ ] [DORA metrics: the four keys](https://dora.dev/guides/dora-metrics-four-keys/).
  - [ ] [monorepo.tools](https://monorepo.tools/). השוואת כלים. נכתב על ידי צוות Nx, אז קצת מוטה.
- 🟡
  - [ ] 🎬 [Measuring DevOps: The Four Keys Project](https://www.youtube.com/watch?v=2rzvIL29Nz0). ‏Dina Graves Portman, 33 דקות, ⚠️ 2021.
  - [ ] 🎬 [Learn Monorepos From Scratch (pnpm + Turborepo)](https://www.youtube.com/watch?v=IC8K0JsF8fM). 51 דקות, 2026.
  - [ ] [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html). ‏Pete Hodgson. הטקסט הקנוני.
  - [ ] 🎬 [Managing Feature Flags at Scale](https://www.youtube.com/watch?v=uFW4SSRtkUU). ‏Pete Hodgson, 60 דקות, ⚠️ 2018.
  - [ ] 🎬 [Observability](https://www.youtube.com/playlist?list=PLPXBnDoWo1HS3SapEe557ZqiWF-BKHZDD). ‏Better Stack, פלייליסט של 21 סרטונים, 2:12 שעות. ‏traces מול spans, ‏OTel Collector ו־sampling.
- 🔴
  - [ ] [Sentry JavaScript](https://docs.sentry.io/platforms/javascript/)
  - [ ] [OpenFeature](https://openfeature.dev/docs/reference/intro)
  - [ ] [Turborepo](https://turborepo.com/docs)
  - [ ] 🎬 [CI/CD Tutorials](https://www.youtube.com/playlist?list=PLy7NrYWoggjzSIlwxeBbcgfAdYoxCIrM2). ‏TechWorld with Nana, פלייליסט של 14 סרטונים, כ־7 שעות. ‏GitHub Actions, ‏DevSecOps ו־ArgoCD.
  - [ ] 🎬 [Complete GitHub Actions Course: From Beginner to Pro](https://www.youtube.com/watch?v=Xwpi0ITkL3U). ‏DevOps Directive, 3:42 שעות, 2025. קורס GitHub Actions המלא והעדכני ביותר שנמצא.
  - [ ] 🎬 [OTel in Practice](https://www.youtube.com/playlist?list=PLVYDBkQ1TdyxKgdGE4ThYLkNRCuLLYy9x). ‏OpenTelemetry, פלייליסט של 15 סרטונים, 2022–2025. ‏instrumentation, ‏context propagation ו־Collector.

---

## 15. פיצ'רים של AI בצד הלקוח

**שאלה צפויה:** תכנן פיצ'ר LLM עם streaming ב־Vue: תוצאה חלקית, שגיאות, ביטול, ו־UX לתשובות לא דטרמיניסטיות.

**מקורות:**
- 🟢
  - [ ] 🎬 [Beyond Components: Designing Generative UI for MCP Apps](https://www.youtube.com/watch?v=hCMrEfPG2Yg). ‏Ruben Casas, ‏AI Engineer, 17 דקות, 2026. חלק מסדרה: [MCP @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0UqhUyxuMMMmDwyiApd4sDw), 39 סרטונים.
- 🟡
  - [ ] [AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/overview). ‏Vercel. דפוסים ל־streaming chat ו־tool UI, כולל תמיכה ב־Vue.
- 🔴
  - [ ] 🎬 [Design Engineering @ AI Engineer](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0VSUinKVkozYixYWE5eMdDv). ‏AI Engineer, פלייליסט של 25 סרטונים, 2025–2026. ‏UX לפיצ'רים של AI ו־generative UI.
  - [ ] 🎬 [AI SDK V5 Tutorials](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhZHH2BksCOYAxLmYrQL__H). ‏Codevolution, פלייליסט של 31 סרטונים, כ־5:30 שעות, 2025. ‏streaming, ‏tool call UI ו־structured data. ה־SDK כבר אחרי v5, אבל העקרונות נשארו.
  - [ ] 🎬 [Ship SF 2026](https://www.youtube.com/playlist?list=PLYFw-5QW84Ks). ‏Vercel, פלייליסט של 18 סרטונים, 2026. כולל סדנה על הטמעת generative UI agents.

---

## 16. פולסטאק ובקאנד

> למשרות פולסטאק, זה מהנושאים החשובים ביותר, וכדאי להתחיל ממנו.

**למה זה חשוב:**
- במשרות פולסטאק מצפים לתכנן מערכת מקצה לקצה, ולא רק את הצד של הדפדפן.
- גם במשרות frontend, ארכיטקט צריך לדבר עם הבקאנד בשפה שלו: ‏API, ‏caching, עקביות נתונים ותורים.

**כבר מכוסה בנושאים אחרים:**
- [אבטחה](#11-אבטחה): ‏OWASP, ‏OAuth/OIDC, ‏BFF ו־CSRF. רוב החומר שם הוא צד שרת.
- [כלים, CI/CD ו־Observability](#14-כלים-cicd-ו-observability): ‏DORA, ‏monorepo ו־feature flags.
- [אסטרטגיית בדיקות](#6-אסטרטגיית-בדיקות): ‏contract tests עם Pact.
- [TypeScript מתקדם](#8-typescript-מתקדם): ‏API client עם type safety מקצה לקצה.
- [מגמות רוחב](#9-מגמות-רוחב-בין-פריימוורקים) ו־R4 ב[מסלול React](#2-ארכיטקטורה-ופריימוורק): ‏SSR, ‏streaming, ‏RSC ו־Server Actions.
- [יסודות JS](#7-יסודות-jsדפדפן-ו-live-coding): ה־event loop, שהוא הבסיס גם ל־Node.

**שאלות צפויות:**
- תכנן URL shortener, ‏news feed או צ'אט מקצה לקצה: דרישות, ‏API, מודל נתונים ו־scaling.
- איפה שמים cache, ואיך מבטלים אותו? ‏cache-aside מול write-through, ‏TTL ו־cache stampede.
- מתי מכניסים תור? ‏at-least-once, ‏consumers אידמפוטנטיים ו־DLQ.
- CAP ו־PACELC על דוגמה מוצרית: מתי עקביות חזקה ומתי eventual.
- איך מממשים rate limiter מבוזר? ‏token bucket ו־Redis.
- replication מול sharding: איך בוחרים shard key, ומה עושים עם hot partitions?
- SQL או NoSQL לפיצ'ר נתון? מתי אינדקס לא עוזר, ומה סדר העמודות באינדקס מורכב?
- isolation levels והאנומליות שהם מונעים, ואיך מונעים הזמנה כפולה.
- מה זו בעיית N+1, ואיך מגלים ומתקנים אותה?
- מיגרציה של סכמה בלי downtime: ‏expand/contract ו־backfill.
- offset או cursor pagination? ואיך idempotency keys עובדים ב־`POST /payments`?
- REST, ‏GraphQL, ‏tRPC או gRPC: מתי כל אחד? ואיך בונים webhooks אמינים?
- שלבי ה־event loop ב־Node: ‏`process.nextTick` מול microtasks מול `setImmediate`. מה חוסם את ה־loop, ואיך מגלים את זה בפרודקשן?
- streams ו־backpressure: מה קורה כשמתעלמים מהערך שמחזיר `write()`?
- Express, ‏Fastify, ‏NestJS או Hono לשירות חדש?
- מה צריך להיות ב־Dockerfile טוב לאפליקציית Node? ‏serverless, ‏containers או edge?
- logs, ‏metrics ו־traces: איך עוקבים אחרי בקשה מהדפדפן ועד מסד הנתונים עם OpenTelemetry? מה הם SLIs, ‏SLOs ו־error budgets?

**16א. ‏System design של בקאנד:**
- 🟢
  - [ ] 🎬 [System Design Interview: A Step-By-Step Guide](https://www.youtube.com/watch?v=i7twT3x5yv8). ‏ByteByteGo, 9 דקות, 2023. מסגרת של ארבעה שלבים לתשובה. חלק מסדרה: [ByteByteGo: System Design Interview](https://www.youtube.com/playlist?list=PLCRMIe5FDPseVvwzRiCQBmNOVUIZSSkP8), 20 סרטונים.
  - [ ] 🎬 [How to Prepare for System Design Interviews](https://www.youtube.com/watch?v=Ru54dxzCyD0). ‏Hello Interview, 18 דקות, 2025. מה מצפים לראות ברמת senior ו־staff. חלק מסדרה: [Hello Interview: Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2), 10 סרטונים.
  - [ ] 🎬 [What is a LOAD BALANCER really about?](https://www.youtube.com/watch?v=LQuuoHTyYz8). ‏ByteByteGo, 6 דקות, 2025. ‏L4 מול L7, אלגוריתמים ו־health checks. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] 🎬 [Cache Systems Every Developer Should Know](https://www.youtube.com/watch?v=dGAgxozNWFE) (5 דקות) ו־[Caching Pitfalls Every Developer Should Know](https://www.youtube.com/watch?v=wh98s0XhMmQ) (6 דקות). ‏ByteByteGo. שכבות ה־cache, ו־stampede ו־avalanche. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] 🎬 [Caching in System Design Interviews](https://www.youtube.com/watch?v=1NngTUYPdpI). ‏Hello Interview, 30 דקות, 2025. ‏invalidation ו־hot keys. חלק מסדרה: [Hello Interview: Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2), 10 סרטונים.
  - [ ] 🎬 [Rate Limiter System Design](https://www.youtube.com/watch?v=YXkOdWBwqaA). ‏ByteByteGo, 7 דקות, 2025. ‏token bucket ו־leaky bucket. חלק מסדרה: [ByteByteGo: System Design Interview](https://www.youtube.com/playlist?list=PLCRMIe5FDPseVvwzRiCQBmNOVUIZSSkP8), 20 סרטונים.
  - [ ] 🎬 [Apache Kafka Fundamentals You Should Know](https://www.youtube.com/watch?v=-RDyEFvnTXI). ‏ByteByteGo, 4 דקות, 2024. ‏topics, ‏partitions ו־consumer groups. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] 🎬 [CAP Theorem in System Design Interviews](https://www.youtube.com/watch?v=VdrEq0cODu4). ‏Hello Interview, 13 דקות, 2024. חלק מסדרה: [Hello Interview: Deep Dives](https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6), 15 סרטונים.
  - [ ] 🎬 [Sharding in System Design Interviews](https://www.youtube.com/watch?v=L521gizea4s). ‏Hello Interview, 30 דקות, 2025. ‏shard keys ו־resharding. חלק מסדרה: [Hello Interview: Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2), 10 סרטונים.
  - [ ] 🎬 [7 Must-know Strategies to Scale Your Database](https://www.youtube.com/watch?v=_1IKwnbscQU). ‏ByteByteGo, 8 דקות, 2024. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] [System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction). ‏Hello Interview. המדריך הבסיסי חינמי, ‏deep dives מסוימים בתשלום.
- 🟡
  - [ ] 🎬 [System Design Course: APIs, Databases, Caching, CDNs, Load Balancing](https://www.youtube.com/watch?v=C842vFY5kRo). ‏freeCodeCamp, 2:05 שעות, 2026. מכסה את רוב התת־נושא.
  - [ ] 🎬 [Design Software Systems Like a Senior Engineer](https://www.youtube.com/watch?v=soTfFFIQQ8U). ‏freeCodeCamp, 3:16 שעות, אוקטובר 2026. חשיבה על trade-offs ברמה בכירה.
  - [ ] 🎬 [Designing Data-intensive Applications with Martin Kleppmann](https://www.youtube.com/watch?v=SVOrURyOu_U). ‏Pragmatic Engineer, 1:25 שעות, 2026. סביב המהדורה השנייה של DDIA.
- 🔴
  - [ ] [system-design-primer](https://github.com/donnemartin/system-design-primer). המקור הפתוח הקלאסי, כולל כרטיסי Anki.
  - [ ] [Amazon Builders' Library](https://aws.amazon.com/builders-library/). ‏timeouts, ‏retries ו־backoff, ‏load shedding ו־caching מפרודקשן אמיתי.
  - [ ] 🎬 [Distributed Systems lecture series](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB). ‏Martin Kleppmann, ‏Cambridge, ⚠️ 2020. הרצאות קצרות על שעונים, ‏replication ו־consensus. יש גם [סיכומי הרצאות](https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/dist-sys-notes.pdf).
  - [ ] [Consistency Models](https://jepsen.io/consistency). ‏Jepsen. מפה מדויקת של linearizable, ‏serializable ו־causal.
  - [ ] 🎬 [System Design Walkthroughs](https://www.youtube.com/playlist?list=PL5q3E8eRUieWtYLmRU3z94-vGRcwKr9tM). ‏Hello Interview, פלייליסט של 18 סרטונים, 2024–2026. ריאיונות מלאים של כשעה: Ticketmaster, ‏Uber, ‏Dropbox, ‏WhatsApp.
  - [ ] 🎬 [Arpit's System Design Masterclass: Pre-requisites](https://www.youtube.com/playlist?list=PLsdq-3Z1EPT36NJXTutvKcreetuHCr9a-). ‏Arpit Bhayani, פלייליסט של 22 סרטונים, 7:36 שעות, 2023–2024.
  - [ ] 🎬 [System Design Playlist](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX). ‏Gaurav Sen, פלייליסט של 26 סרטונים, ⚠️ 2018–2020. קלאסיקה. היסודות עדיין מדויקים.
  - [ ] 🎬 [MIT 6.824 Distributed Systems](https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB). ‏MIT, פלייליסט של 20 סרטונים, ⚠️ 2020. ‏Raft, ‏Spanner ועקביות. חלופה אקדמית ל־Kleppmann.

**16ב. ‏מסדי נתונים:**
- 🟢
  - [ ] 🎬 [DB Indexing in System Design Interviews](https://www.youtube.com/watch?v=BHCSL_ZifI0). ‏Hello Interview, 14 דקות, 2025. ‏B-tree, אינדקס גיאוגרפי ו־inverted index. חלק מסדרה: [Hello Interview: Deep Dives](https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6), 15 סרטונים.
  - [ ] 🎬 [Data Modeling in System Design Interviews](https://www.youtube.com/watch?v=TUcPS6dsWx4). ‏Hello Interview, 30 דקות, 2025. נרמול מול דה־נרמול ובחירת מסד נתונים. חלק מסדרה: [Hello Interview: Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2), 10 סרטונים.
  - [ ] 🎬 [How To Choose The Right Database?](https://www.youtube.com/watch?v=kkeFE6iRfMM). ‏ByteByteGo, 6 דקות, 2022. משפחות SQL ו־NoSQL במבט אחד. חלק מסדרה: [ByteByteGo: Database](https://www.youtube.com/playlist?list=PLCRMIe5FDPsdnSszazqVIQFh99t1ExH19), 7 סרטונים.
  - [ ] 🎬 [Serializable vs Repeatable Read Isolation Level](https://www.youtube.com/watch?v=KoULlXKK1H8). ‏Hussein Nasser, 8 דקות, ⚠️ 2021. חלק מסדרה: [Hussein Nasser: Database Engineering](https://www.youtube.com/playlist?list=PLQnljOFTspQXjD0HOzN7P2tgzu7scWpl2), 118 סרטונים.
  - [ ] 🎬 [Scaling Postgres to the next level at OpenAI](https://www.youtube.com/watch?v=NvY2kvi1Fa0). ‏POSETTE 2025, 24 דקות. ‏read replicas ו־connection pooling בקנה מידה אמיתי. חלק מסדרה: [PostgreSQL at scale](https://www.youtube.com/playlist?list=PLH8y1BNPAKjJdJalnyHz7DqShLyXaczl6), 35 סרטונים.
  - [ ] 🎬 [Zero-downtime migrations](https://www.youtube.com/watch?v=mr_J5v398Qo). ‏Postgres.FM, 31 דקות, 2023. ‏expand/contract ונעילות. חלק מסדרה: [Postgres.FM: Schema changes](https://www.youtube.com/playlist?list=PLH8y1BNPAKjLdOE1HbYUpJO-vRHtft4N8), 5 סרטונים.
  - [ ] [What is the N+1 Query Problem and How to Solve it?](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it). ‏PlanetScale.
- 🟡
  - [ ] 🎬 [Relational Database ACID Transactions](https://www.youtube.com/watch?v=pomxJOFVcQs). ‏Hussein Nasser, 42 דקות, ⚠️ 2019. קלאסיקה שעדיין מדויקת. חלק מסדרה: [Hussein Nasser: Database Engineering](https://www.youtube.com/playlist?list=PLQnljOFTspQXjD0HOzN7P2tgzu7scWpl2), 118 סרטונים.
  - [ ] 🎬 [MySQL for Developers](https://planetscale.com/learn/courses/mysql-for-developers). ‏PlanetScale, ‏Aaron Francis. קורס וידאו חינמי: סכמה, אינדקסים ואופטימיזציה של שאילתות.
  - [ ] [Prisma's Data Guide](https://www.prisma.io/dataguide). מידול נתונים וסוגי מסדי נתונים.
  - [ ] 🎬 [PostgreSQL and MySQL Internals](https://www.youtube.com/playlist?list=PLsdq-3Z1EPT1cL2FsCkxLlw-VLqK0GU-F). ‏Arpit Bhayani, פלייליסט של 7 סרטונים, 1:18 שעות. מודל החיבורים, אלגוריתמי join ואיך ה־planner בוחר.
- 🔴
  - [ ] [Use The Index, Luke!](https://use-the-index-luke.com/). ‏Markus Winand, ספר חינמי. המקור על אינדקסים ב־SQL למפתחים.
  - [ ] [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) ו־[MVCC](https://www.postgresql.org/docs/current/mvcc-intro.html). התיעוד של PostgreSQL 18.
  - [ ] 🎬 [CMU Intro to Database Systems (15-445, Fall 2025)](https://www.youtube.com/playlist?list=PLSE8ODhjZXjYMAgsGH-GtY5rJYZ6zjsd5). ‏Andy Pavlo, סמסטר שלם. יש גם [אתר קורס](https://15445.courses.cs.cmu.edu/fall2025/).
  - [ ] 🎬 [Databases 101](https://www.youtube.com/playlist?list=PL5Lsd0YA4OME2HC5m9QSfXG9cxb9Cvz5L). ‏Software Developer Diaries, פלייליסט של 16 סרטונים, 3:48 שעות. ‏outbox, ‏expand/contract, מיגרציות ו־concurrency. תואם את השאלות כאן.
  - [ ] 🎬 [MVCC in Postgres. Transactions. Locks](https://www.youtube.com/playlist?list=PLH8y1BNPAKjKfhRfAucGgB543W9FkjS7J). ‏PostgresTV, פלייליסט של 12 סרטונים, 7:42 שעות, 2025–2026. גרסה מצולמת לתיעוד על isolation ו־MVCC.
  - [ ] 🎬 [POSETTE: An Event for Postgres 2025](https://www.youtube.com/playlist?list=PLlrxD0HtieHjHHYfXx3llOlESrX1IpJro). ‏Microsoft Developer, פלייליסט של 42 סרטונים, 2025. הכנס של ההרצאה של OpenAI.

**16ג. ‏API design:**
- 🟢
  - [ ] 🎬 [Good APIs Vs Bad APIs: 7 Tips for API Design](https://www.youtube.com/watch?v=_gQaygjm_hg). ‏ByteByteGo, 5 דקות, 2024.
  - [ ] 🎬 [API Design in System Design Interviews](https://www.youtube.com/watch?v=DQ57zYedMdQ). ‏Hello Interview, 28 דקות, 2025. ‏REST, ‏GraphQL או RPC. חלק מסדרה: [Hello Interview: Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2), 10 סרטונים.
  - [ ] 🎬 [Top 6 Most Popular API Architecture Styles](https://www.youtube.com/watch?v=4vLxWqE94l4). ‏ByteByteGo, 4 דקות, 2023. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] 🎬 [API Pagination: Offset and Cursor Pagination Explained](https://www.youtube.com/watch?v=mvlzhBgGS4s). ‏Caleb Curry, 25 דקות, 2025. חלק מסדרה: [Caleb Curry: Backend Engineering](https://www.youtube.com/playlist?list=PL_c9BZzLwBRIHUNeoywVJXViXGEsk6PDr), 8 סרטונים.
  - [ ] 🎬 [Build a robust Payments service using Idempotency Keys](https://www.youtube.com/watch?v=m6DtqSb1BDM). ‏Arpit Bhayani, 16 דקות, 2022.
  - [ ] 🎬 [Top 3 Things You Should Know About Webhooks](https://www.youtube.com/watch?v=x_jjhcDrISk). ‏ByteByteGo, 3 דקות, 2024. ‏retries, חתימה ומקבל אידמפוטנטי. חלק מסדרה: [ByteByteGo: System Design Fundamentals](https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf), 104 סרטונים.
  - [ ] 🎬 [Learn tRPC in 5 minutes](https://www.youtube.com/watch?v=S6rcrkbsDI0). ‏Matt Pocock, 6 דקות, 2023.
  - [ ] [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency). ‏Stripe, ⚠️ 2017. הטקסט הקנוני. ההתנהגות העדכנית [בתיעוד של Stripe](https://docs.stripe.com/api/idempotent_requests).
- 🟡
  - [ ] [Learn GraphQL](https://graphql.org/learn/). התיעוד הרשמי.
  - [ ] [tRPC docs](https://trpc.io/docs). מתי tRPC מתאים יותר מ־REST או GraphQL.
- 🔴
  - [ ] [Google API Improvement Proposals](https://google.aip.dev/). עיצוב מבוסס resources, ‏pagination ושגיאות.
  - [ ] [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines) ו־[Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/).
  - [ ] [OpenAPI Specification](https://spec.openapis.org/oas/latest.html). גרסה 3.2.1. ‏contract-first.
  - [ ] [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457). הפורמט הסטנדרטי לשגיאות, במקום RFC 7807.
  - [ ] [The Idempotency-Key HTTP Header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/). עדיין טיוטה של IETF, לא RFC.
  - [ ] [Standard Webhooks](https://www.standardwebhooks.com/). מפרט משותף לחתימה, ‏retries ו־payloads.
  - [ ] 🎬 [Backend Engineering (Beginner)](https://www.youtube.com/playlist?list=PLQnljOFTspQUNnO4p00ua_C5mKTfldiYT). ‏Hussein Nasser, פלייליסט של 36 סרטונים, 14:30 שעות. ‏HTTP, ‏TCP, ‏TLS ו־proxies: היסודות שמתחת ל־REST, ‏gRPC ו־WebSockets.
  - [ ] 🎬 [GraphQLConf 2024](https://www.youtube.com/playlist?list=PLP1igyLx8foEO0qsyk3IFn1peYSVGDBFA). ‏GraphQL Foundation, פלייליסט של 74 סרטונים, 2024. גרסה מצולמת ל־Learn GraphQL.
  - [ ] 🎬 [Platform Summit 2025](https://www.youtube.com/playlist?list=PLd2MPdlXKO10lBJB3OfoI_7O3OGSVkofI). ‏Nordic APIs, פלייליסט של 66 סרטונים, 2025. ‏OAuth 2.1, אבטחת API ו־MCP לספקי API.

**16ד. ‏Node.js:**
- 🟢
  - [ ] 🎬 [Everything You Need to Know About Node.js Event Loop](https://www.youtube.com/watch?v=PNa9OMajw9w). ‏Bert Belder, ממחברי libuv, 15 דקות, ⚠️ 2016. מתקן מיתוסים נפוצים.
  - [ ] 🎬 [This is how the Node.js Event Loop really works](https://www.youtube.com/watch?v=paI6J8my3Yw). ‏Software Developer Diaries, 14 דקות, 2026. חלק מסדרה: [Advanced Node.js](https://www.youtube.com/playlist?list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3), 26 סרטונים.
  - [ ] 🎬 [The State of Node.js 2025](https://www.youtube.com/watch?v=h3qKJabs7d4). ‏Matteo Collina, חבר TSC, 30 דקות, 2025. ‏TS stripping, ביצועים ו־LTS. חלק מסדרה: [jsday 2025](https://www.youtube.com/playlist?list=PLWK9j6ps_unmI67hGWXXIc8G2Vf5QP8uv), 27 סרטונים.
  - [ ] 🎬 [Node.js will use all the memory available, and that's OK!](https://www.youtube.com/watch?v=_OnTUIYxGRs). ‏Matteo Collina, ‏dotJS 2025, 18 דקות. ‏GC ו־heap בתוך containers.
  - [ ] 🎬 [You Should Use Hono in your Next Project](https://www.youtube.com/watch?v=sYZW8TK2IV4). ‏Syntax, 13 דקות, 2024. רץ על Node, ‏Bun, ‏Deno ו־edge.
- 🟡
  - [ ] 🎬 [Node.js: More Threads Than You Think](https://www.youtube.com/watch?v=r5PIqYyRiAg). ‏Matteo Collina, 44 דקות, 2025. ‏thread pool ו־worker threads.
  - [ ] 🎬 [NestJS Course for Beginners](https://www.youtube.com/watch?v=21_I-12f5JE). ‏freeCodeCamp, 1:27 שעות, 2025. ‏modules ו־DI.
  - [ ] [The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick), ‏[Don't Block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop), ‏[Backpressuring in Streams](https://nodejs.org/en/learn/modules/backpressuring-in-streams). מדריכי Node הרשמיים.
  - [ ] [Fastify](https://fastify.dev/), ‏[NestJS](https://docs.nestjs.com/), ‏[Hono](https://hono.dev/docs/). התיעוד הרשמי של כל framework.
- 🔴
  - [ ] [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices). ‏Yoni Goldberg. מבנה, שגיאות, אבטחה ופרודקשן. צ'קליסט טוב לשאלות "איך היית בונה".
  - [ ] [Worker threads API](https://nodejs.org/api/worker_threads.html) ו־[libuv design overview](https://docs.libuv.org/en/v1.x/design.html).
  - [ ] 🎬 [nodeconfeu 2026](https://www.youtube.com/playlist?list=PLHJJhUxJCR0c). ‏NodeConf EU, פלייליסט של 24 סרטונים, 2026. מודל השחרורים החדש מ־Node 27, ‏observability ו־supply chain.
  - [ ] 🎬 [NodeConf EU 2024](https://www.youtube.com/playlist?list=PLFVadYWYE9opLgYJ7i0j50oIgn6pqBOM7). ‏NodeConf EU, פלייליסט של 21 סרטונים, 2024. ‏TypeScript מובנה ו־Express 5.
  - [ ] 🎬 [Platformatic Masterclasses](https://www.youtube.com/playlist?list=PL_x4nRdxj60K2j9l_SflmqmaTA2XVBuqc). ‏Matteo Collina, פלייליסט של 7 סרטונים, כ־9 שעות, 2023–2024. ‏streams לעומק, ‏Fastify ו־"Mastering Node.js Backends".
  - [ ] 🎬 [The Node (and more) Banter](https://www.youtube.com/playlist?list=PL_x4nRdxj60JpKKtLHjRtLBw_zXYzfTg4). ‏Platformatic, פלייליסט של 85 סרטונים, 2024–2026. דיונים שוטפים על האקוסיסטם. רשות, למי שרוצה להתעדכן.

**16ה. ‏תשתיות ותפעול:**
- 🟢
  - [ ] 🎬 [Learn Docker in 2026: Complete Roadmap](https://www.youtube.com/watch?v=zFa9_K8BS8I). ‏TechWorld with Nana, 31 דקות, 2025.
  - [ ] 🎬 [Kubernetes Simply Explained](https://www.youtube.com/watch?v=Xv9dnKHO8tg). ‏TechWorld with Nana, 4 דקות, 2026.
  - [ ] 🎬 [Redis Deep Dive](https://www.youtube.com/watch?v=fmT5nlEkl3U). ‏Hello Interview, 31 דקות, 2024. ‏Redis כ־cache, ‏rate limiter, ‏locks ו־streams. יש גם [גרסה כתובה](https://www.hellointerview.com/learn/system-design/deep-dives/redis). חלק מסדרה: [Hello Interview: Deep Dives](https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6), 15 סרטונים.
  - [ ] 🎬 [Is "edge" computing really faster?](https://www.youtube.com/watch?v=yOP5-3_WFus). ‏Fireship, 8 דקות, 2022. ‏edge מול region, וקרבה לנתונים.
  - [ ] 🎬 [What is OTel? The JavaScript Journey](https://www.youtube.com/watch?v=iEEIabOha8U). ‏OpenTelemetry, 9 דקות, 2025. מבוא רשמי למפתחי JS.
  - [ ] 🎬 [What is OpenTelemetry? Explanation and Demo](https://www.youtube.com/watch?v=LzLULxhyIpU). ‏Better Stack, 24 דקות, 2024.
  - [ ] [The Twelve-Factor App](https://12factor.net/). ⚠️ 2011, קלאסיקה. יש גם [סרטון שעובר על כל 12 העקרונות](https://www.youtube.com/watch?v=1OhmRmMsGdQ) (KodeKloud, 30 דקות).
- 🟡
  - [ ] 🎬 [Docker Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=pg19Z8LL06w). ‏TechWorld with Nana, 1:07 שעות, 2023.
  - [ ] 🎬 [Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4). ‏TechWorld with Nana, 1:12 שעות, ⚠️ 2021. היסודות לא השתנו.
  - [ ] 🎬 [Cloud Computing Explained](https://www.youtube.com/watch?v=ZaA0kNm18pE). ‏Be A Better Dev, 45 דקות, 2025. ‏regions, ‏AZs, ‏IaaS, ‏PaaS ו־serverless.
  - [ ] [Docker Get Started](https://docs.docker.com/get-started/) ו־[Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/). התרגולים הרשמיים.
  - [ ] [OpenTelemetry for Node.js](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/). ‏auto-instrumentation לשירות Node.
  - [ ] [Redis Dev Hub](https://redis.io/learn). יש גם [Redis University](https://university.redis.io/), שדורש הרשמה חינמית.
  - [ ] [Cloudflare Workers](https://developers.cloudflare.com/workers/). מודל הריצה ב־edge ומגבלותיו.
  - [ ] 🎬 [Rate Limiters with Redis](https://www.youtube.com/playlist?list=PL83Wfqi-zYZGicBjd2U5DqqzqcaidI6ux). ‏Redis, פלייליסט של 5 סרטונים, 37 דקות, 2025. ‏token bucket ו־sliding window. הקוד ב־Java, הרעיונות כלליים.
- 🔴
  - [ ] 🎬 [The Kubernetes Course 2025](https://www.youtube.com/watch?v=EV47Oxwet6Y). ‏Kubesimplify, 5:53 שעות. חלק מסדרה: [Kubesimplify Courses](https://www.youtube.com/playlist?list=PL5uLNcv9SibDZ6AkVDXXqxKtYM0JJ0wqt), 13 סרטונים.
  - [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/). ‏Google, ספר חינמי, ⚠️ 2016. ‏SLIs, ‏SLOs ותגובה לתקלות.
  - [ ] [Backend Developer Roadmap](https://roadmap.sh/backend). ‏roadmap.sh. מפה של כל התחום, לאיתור פערים.
  - [ ] 🎬 [Docker Tutorial for Beginners](https://www.youtube.com/playlist?list=PLy7NrYWoggjzfAHlUusx2wuDwfCrmJYcs). ‏TechWorld with Nana, פלייליסט של 17 סרטונים, 4:24 שעות, ⚠️ 2020–2021. הסדרה המלאה שמאחורי ה־crash course.
  - [ ] 🎬 [Complete Kubernetes Tutorial for Beginners](https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC). ‏TechWorld with Nana, פלייליסט של 23 סרטונים, 7:12 שעות, ⚠️ 2020.
  - [ ] 🎬 [Kubernetes Observability 101: Metrics, Logs, Dashboards, and Traces](https://www.youtube.com/watch?v=Y6-oOr8Qot8). ‏Kubesimplify, 4 שעות, 2026. קורס מעשי. משתלב עם OpenTelemetry וספר ה־SRE.
  - [ ] 🎬 [Backend Outage Analysis of Large Companies](https://www.youtube.com/playlist?list=PLQnljOFTspQXdkZLiYCCh_5RBP1-T-Rnx). ‏Hussein Nasser, פלייליסט של 23 סרטונים, 2020–2025. ניתוח תקלות של Facebook, ‏AWS, ‏Slack ועוד. הצד המצולם של פרקי התקלות בספר ה־SRE.

**תרגול:** בנה שירות Node קטן עם API אחד: ‏cursor pagination, ‏idempotency key ב־POST, ‏Postgres עם אינדקס מתאים, ‏Dockerfile ו־OpenTelemetry. אחר כך תכנן בקול איך הוא גדל פי 100.

