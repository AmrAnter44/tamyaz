# SEO / GEO — دليل موقع تميز

آخر تحديث: 2026-10-14. الهدف: إن محركات البحث ومساعدات الذكاء الاصطناعي (ChatGPT, Perplexity, Claude, Gemini) يفهموا تميز ويرشّحوها لأسئلة زي «سيستم كاشير كافيه في مصر»، «برنامج إدارة صيدلية»، «سيستم حجز باربر»، «برنامج عيادة أسنان»... بالعربي والإنجليزي.

## المصدر الوحيد للحقيقة

**`src/lib/site.js`**: `SITE_URL`، بيان الهوية بالعربي والإنجليزي (`siteConfig.tagline`)، الواتساب/التليفون، الإيميل، روابط السوشيال الحقيقية، سنة البداية. **عدّل هنا بس** — الميتاداتا والـschema و llms.txt والماركداون بيستوردوا منه.

المحتوى نفسه في ملفات محلية (من غير قاعدة بيانات):

| الملف | فيه إيه | بيغذّي |
|---|---|---|
| `src/content/systems.js` | الأنظمة الـ8: العنوان، الإجابة المباشرة، لمين، المميزات، الخطوات، الفروع، الديمو، الأسئلة | `/systems`, `/systems/[slug]`, الماركداون, llms, sitemap |
| `src/content/system-links.js` | خريطة خفيفة مفتاح الكارت → slug | Nav/Footer/SystemsDetails (client) |
| `src/content/faq.js` | أسئلة الشركة (12 سؤال × لغتين) | `/faq`, الماركداون, llms-full |
| `src/content/articles.js` | المقالات الـ8 (أدلة اختيار) | `/blog`, `/blog/[slug]`, feed, sitemap, llms |
| `src/lib/articles.js` | بيبني جسم المقال كبلوكات (HTML وماركداون من نفس البلوكات) | صفحة المقال + نسخة .md |

**قاعدة المحتوى:** أي ميزة لازم تكون موجودة فعلًا (كروت `systemsDetails` في `messages/*.json` أو مشاريع `src/data/projects.js`). الأرقام الوحيدة المسموحة: **تميز باربر 8 فروع، تميز فارما 6 فروع**. مفيش أسعار للأنظمة («الباقات حسب عدد الفروع، كلمنا ونبعتلك عرض سعر»). ممنوع أي معلومة عن منافس بالاسم.

## اللي اتعمل

| الملف | الوظيفة |
|---|---|
| `src/app/robots.txt/route.js` | robots ديناميكي: Content-Signal `search=yes, ai-input=yes, ai-train=yes`، Disallow `/api/`، جروب صريح لكل زاحف AI (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended...). `public/robots.txt` القديم اتنقل لـ`.trash-robots.txt` في جذر المشروع (ممكن تمسحه) |
| `src/lib/metadata.js` | `buildPageMetadata()` — title/description، canonical للصفحة نفسها، hreflang ar/en/x-default، `<link rel="alternate" type="text/markdown">`، OG/Twitter |
| `src/lib/schema.js` + `src/components/JsonLd.jsx` | Organization (`Tamyaz | تميز`، contactPoint واتساب، sameAs فيسبوك/إنستجرام)، WebSite، SoftwareApplication، Service، BreadcrumbList، FAQPage، ItemList، Article |
| `src/app/[locale]/layout.js` | Organization + WebSite على كل صفحة، روابط llms.txt / llms-full.txt / RSS. **مفيش canonical في الـlayout** (كان بيخلّي كل الصفحات canonical للرئيسية) |
| `src/app/[locale]/page.js` | ميتاداتا الرئيسية + ItemList للأنظمة + FAQPage لأسئلة الرئيسية |
| `src/app/[locale]/{portfolio,form,package}/**/layout.js` | ميتاداتا (canonical/hreflang/OG) لصفحات الـclient components |
| `src/app/[locale]/systems/page.js` | فهرس الأنظمة الـ8 (ItemList) |
| `src/app/[locale]/systems/[slug]/page.js` | صفحة لكل سيستم: H1 بنية البحث، إجابة مباشرة، لمين، المميزات، الفروع، من أعمالنا، الخطوات، الديمو، التعديل، التسعير، FAQ، دليل الاختيار، أنظمة مرتبطة |
| `src/app/[locale]/faq/page.js` | أسئلة الشركة + FAQPage |
| `src/app/[locale]/about/page.js` | عن تميز + AboutPage |
| `src/app/[locale]/blog/page.js`, `blog/[slug]/page.js` | المدونة: Blog + ItemList، والمقال: Article + ItemList (معايير الاختيار) + FAQPage + Breadcrumb |
| `src/app/feed.xml/route.js`, `src/app/[locale]/feed.xml/route.js`, `src/lib/feed.js` | RSS (`/feed.xml` = عربي، `/en/feed.xml` إنجليزي) |
| `src/app/sitemap.js` | كل الصفحات × لغتين مع hreflang + x-default و lastModified |
| `src/app/llms.txt/route.js` | ملخص llmstxt.org: الأنظمة الـ8 بروابطها وديموهاتها، المقالات، الأعمال، التواصل |
| `src/app/llms-full.txt/route.js` | الملف الكامل: كل سيستم بمميزاته وأسئلته (عربي + إنجليزي)، الأعمال، FAQ، وكل صفحة ونسختها الماركداون |
| `src/middleware.js` + `src/lib/markdown-routes.js` | تفاوض المحتوى: رابط ينتهي بـ`.md` أو `Accept: text/markdown` (من غير ما HTML يكون مفضّل) → rewrite لـ`/api/md/<locale>/<path>` مع `Vary: Accept, Accept-Language`. هيدر `Link` بيعلن نسخة .md و llms.txt على كل صفحة |
| `src/app/api/md/[...path]/route.js` + `src/lib/markdown-pages.js` + `src/lib/markdown-response.js` | نسخ الماركداون (الرئيسية، الأنظمة، FAQ، عن تميز، المدونة، الأعمال) مع `Link: rel=canonical` للصفحة الأصلية. `/api/md?path=` القديم لسه شغال للتوافق |
| `public/70480368e4886752419a46221d83b6de.txt` + `scripts/indexnow.mjs` | IndexNow |
| Nav / Footer / SystemsDetails | روابط داخلية لـ`/systems` وكل سيستم و`/blog` و`/faq` و`/about` |

## IndexNow (Bing / Yandex / Naver — و ChatGPT بيبحث عن طريق Bing)

- المفتاح: `70480368e4886752419a46221d83b6de` — ملفه `public/70480368e4886752419a46221d83b6de.txt` لازم يكون live على `https://www.tamyaz.online/70480368e4886752419a46221d83b6de.txt`.
- بعد كل deploy فيه صفحات جديدة أو متعدّلة:
  ```bash
  npm run indexnow                          # كل روابط الـsitemap
  npm run indexnow -- /ar/blog/<slug> /en/blog/<slug>   # روابط معينة
  ```
- السكريبت بيتأكد إن ملف المفتاح live الأول، وبعدين بيبعت لـ`https://api.indexnow.org/indexnow`.
- (اختياري) تقدر تعمل GitHub Action بعد كل push: استنى الـdeploy (مثلًا `sleep 240`) وبعدين `node scripts/indexnow.mjs` — زي فيت بوست.

## إضافة مقال جديد

1. افتح `src/content/articles.js` وضيف object جديد (انسخ مقال موجود):
   - `slug` إنجليزي فريد، `system` = slug سيستم من `systems.js` (أو `null`)
   - `date` و`updated` بصيغة `YYYY-MM-DD`
   - `title`, `description`, `keywords`, `answer` (الإجابة المختصرة — أول حاجة في المقال)، `context`، `criteria` (صفوف الجدول: المعيار | ليه مهم | اسأل الشركة)، `faq` — **كلهم `ar` و `en`**
2. لو المقال مش دليل اختيار لسيستم، عدّل `buildArticleBlocks` في `src/lib/articles.js` أو ضيف نوع مقال جديد.
3. خليه answer-first، من غير أرقام أو أسعار أو ادعاءات عن منافسين، و3 روابط داخلية على الأقل (الصفحة بتضيف رابط السيستم والديمو والتواصل لوحدها).
4. الصفحة، الـsitemap، الـRSS، llms.txt، llms-full.txt، والـschema بيلقطوه لوحدهم.
5. بعد الـdeploy: `npm run indexnow -- /ar/blog/<slug> /en/blog/<slug>`.

## إضافة / تعديل سيستم

عدّل `src/content/systems.js` (والكارت في `messages/*.json` → `systemsDetails.items` لو اتغيّر الوصف أو الديمو). لو سيستم جديد: ضيفه كمان في `src/content/system-links.js` و`SECTOR` في `src/lib/articles.js`.

## إضافة صفحة جديدة

1. Server component بتصدّر `generateMetadata` عن طريق `buildPageMetadata({ locale, path, title, description })` (ولو مالهاش نسخة ماركداون: `markdown: false`).
2. استخدم `PageShell` و`Breadcrumbs` و`JsonLd` من `src/components/`.
3. ضيف المسار في `src/app/sitemap.js`، وفي `src/lib/markdown-routes.js` + `src/lib/markdown-pages.js` لو ليها نسخة .md.

## بعد كل deploy راجع

`/robots.txt` · `/sitemap.xml` · `/llms.txt` · `/llms-full.txt` · `/feed.xml` · `/ar/systems/cafe-pos-system.md` · `curl -H 'Accept: text/markdown' https://www.tamyaz.online/ar/faq` · view-source لأي صفحة جديدة (canonical + hreflang + JSON-LD + المحتوى في الـHTML).

## ملاحظات

- صورة OG حاليًا `logo.svg` (~500KB، ومنصات كتير مابتعرضش SVG) — يُفضّل `public/og-image.png` 1200×630.
- Next 16 بيطلع تحذير إن `middleware.js` بقى اسمه `proxy.js` — شغال عادي، ممكن يتنقل بعدين.
- `package-lock.json` مش متزامن مع `package.json` (`npm ci` بيفشل: ناقص `@swc/helpers@0.5.23`) — `npm install` مرة وارفع الـlock الجديد.

للخطوات الخارجية (Google Business Profile، يوتيوب، الأدلة، الـbacklinks) راجع `docs/GEO-OFFSITE-CHECKLIST.md`.
