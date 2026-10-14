# GEO Off-Site Checklist — خطة التواجد الخارجي لتميز

> **ليه الملف ده أهم حاجة؟** الموقع دلوقتي جاهز تقنيًا (صفحة لكل سيستم، FAQ، مقالات، llms.txt، schema، ماركداون للوكلاء). لكن ChatGPT وPerplexity وGemini وClaude بيثقوا في **"مين بيتكلم عنك"** أكتر من **"إنت بتقول إيه عن نفسك"**. كل بند هنا بيبني مصدر خارجي جديد بيأكد إن تميز موجودة وبتقدّم الأنظمة دي.

---

## النصوص الجاهزة للنسخ (استخدمها حرفيًا في كل مكان — الاتساق الحرفي إشارة قوية للـAI)

**الاسم:** `Tamyaz | تميز` (بالإنجليزي `Tamyaz`، بالعربي `تميز`)

**بيان الهوية (عربي):**
> تميز (Tamyaz) شركة برمجيات مصرية بتقدّم 8 أنظمة إدارة وكاشير جاهزة للبيزنس: الكافيهات، المطاعم، الباربر شوب والصالونات، العيادات، عيادات الأسنان، الصيدليات، بار الجيم، والمحلات والمتاجر الأونلاين — بالعربي، على الموبايل والكمبيوتر، وبنعدّل السيستم على مقاس شغلك. وكمان بنعمل مواقع وتطبيقات وهوية بصرية وإنتاج فيديو.

**بيان الهوية (إنجليزي):**
> Tamyaz (تميز) is an Egyptian software company offering 8 ready-made management and POS systems for businesses: cafés, restaurants, barbershops and salons, clinics, dental clinics, pharmacies, gym bars, and retail shops with online stores — in Arabic, on mobile and desktop, and customized to how you work. It also builds websites, mobile apps, brand identity and video content.

> المصدر الوحيد للنص ده في الكود: `src/lib/site.js` → `siteConfig.tagline`. لو اتغيّر هناك، غيّره هنا وفي كل المنصات.

**بيانات التواصل (NAP — بنفس الصيغة في كل مكان):**
- Name: Tamyaz | تميز
- Phone / WhatsApp: +20 102 851 8754
- Website: https://www.tamyaz.online
- Email: tamyazcompany@gmail.com
- Country: Egypt
- (لو فيه عنوان مكتب فعلي: ضيفه هنا وفي `src/lib/site.js` و schema الـOrganization — حاليًا مفيش عنوان في الموقع)

**الأرقام المسموح نكررها:** تميز باربر شغال في 8 فروع، تميز فارما شغال في 6 فروع. **ماتكتبش أي أرقام تانية** (عملاء/تقييمات/أسعار) غير لو حقيقية وموثّقة.

**روابط الأنظمة (للبروفايلات والبوستات):**
| السيستم | الصفحة | الديمو |
|---|---|---|
| تميز كافيه | https://www.tamyaz.online/ar/systems/cafe-pos-system | https://demo.cafe.tamyaz.online/login |
| تميز ريستورانت | https://www.tamyaz.online/ar/systems/restaurant-system | https://demo.resto.tamyaz.online/login |
| تميز باربر | https://www.tamyaz.online/ar/systems/barber-booking-system | https://demo.barber.tamyaz.online/login |
| تميز كلينك | https://www.tamyaz.online/ar/systems/clinic-management-system | https://demo.clinc.tamyaz.online/login |
| تميز دنتال | https://www.tamyaz.online/ar/systems/dental-clinic-system | https://demo.dental.tamyaz.online/login |
| تميز فارما | https://www.tamyaz.online/ar/systems/pharmacy-system | https://demo.pharma.tamyaz.online/login |
| تميز بار | https://www.tamyaz.online/ar/systems/gym-bar-system | https://demo.bar.tamyaz.online/ar/login |
| تميز ستور | https://www.tamyaz.online/ar/systems/retail-pos-system | https://demo.shop.tamyaz.online/login |

---

## الأسبوع الأول (الأثر الأكبر)

- [ ] **Google Search Console** — أضف الدومين (توثيق DNS TXT)، ارفع `https://www.tamyaz.online/sitemap.xml`، واطلب فهرسة: `/ar/systems` وصفحات الأنظمة الـ8 و`/ar/faq` و`/ar/blog`.
- [ ] **Bing Webmaster Tools** — "Import from Google Search Console". (ChatGPT بيبحث عن طريق Bing.)
- [ ] **IndexNow** — بعد الـdeploy: `npm run indexnow` (التفاصيل في `docs/SEO.md`).
- [ ] **Google Business Profile** — https://business.google.com
  - الفئة الأساسية: "Software company"، فئات إضافية: "Website designer"، "Marketing agency" (لو مناسبة)
  - الوصف = بيان الهوية العربي، والتليفون والموقع بنفس صيغة NAP
  - المنتجات (Products): ضيف الأنظمة الـ8 كمنتجات، كل واحد برابط صفحته
  - **الأهم:** اطلب من العملاء الحاليين (فروع الباربر الـ8، الصيدليات الـ6، Memo Group، كافيه كيف، دوّر صح) يكتبوا تقييم Google **حقيقي** — ماتحطش أي rating في الكود من غير تقييمات حقيقية
- [ ] **Bing Places** — https://www.bingplaces.com (استيراد من Google بضغطة)
- [ ] **توحيد صفحة الفيسبوك** (https://www.facebook.com/profile.php?id=61573520164290) — قسم About = بيان الهوية حرفيًا + الموقع + الواتساب. ويُفضّل يبقى ليها username ثابت (facebook.com/tamyaz...) وتحدّث الرابط في `src/lib/site.js` → `socials`
- [ ] **توحيد إنستجرام** (@tamyazcompany) — البايو = نسخة قصيرة من البيان + لينك `https://www.tamyaz.online/ar/systems`
- [ ] **صفحة LinkedIn للشركة** — نفس الاسم والبيان والموقع. بعد إنشائها: ضيف الرابط في `src/lib/site.js` → `socials` عشان يدخل `sameAs` في الـschema

## الأسبوع التاني والتالت (فيديوهات + أدلة)

- [ ] **قناة YouTube باسم Tamyaz | تميز** — فيديو ديمو قصير (2–4 دقايق) **لكل سيستم من الـ8**:
  - العنوان بصيغة البحث: «سيستم كاشير كافيه في مصر — جولة في تميز كافيه»، «برنامج إدارة صيدلية — ديمو تميز فارما»...
  - الوصف: أول سطر = الإجابة المختصرة من صفحة السيستم، وبعدها رابط الصفحة + رابط الديمو + الواتساب
  - YouTube من أكتر المصادر اللي Gemini وPerplexity بيستشهدوا بيها
- [ ] **TikTok / Reels** — نفس الفيديوهات مقصوصة (30–60 ثانية) بنفس العناوين
- [ ] **الأدلة المصرية والعربية:** Yellow Pages Egypt (yellowpages.com.eg)، دليل الأعمال المحلي، أي دليل شركات برمجيات مصري
- [ ] **منصات الشركات:** Clutch.co، GoodFirms، Crunchbase (بروفايل شركة مجاني — بيظهر كتير في إجابات الـAI)
- [ ] **منصات البرمجيات:** بروفايل على Capterra / G2 / SaaSworthy لكل سيستم ليه جمهور (الصيدليات، العيادات، المطاعم، الكافيهات) — بالبيانات الحقيقية بس

## مستمر (شهريًا)

- [ ] **Backlinks من العملاء:** كل عميل عنده موقع يحط "Powered by Tamyaz | تميز" برابط لـ https://www.tamyaz.online (أو لصفحة السيستم بتاعه). مثال: memobarber.com، memocosmetic.com، dawarsah.com
- [ ] **منشنات العملاء:** بوست شكر / ستوري من العملاء بيعمل mention لصفحة تميز
- [ ] **Case studies:** حوّل كل عميل جديد لمشروع في `src/data/projects.js` (بتفاصيل حقيقية) — بيدخل الـsitemap و llms.txt أوتوماتيك
- [ ] **مقالات ضيف / PR:** اعرض مقال مفيد ("إزاي تختار سيستم كاشير لكافيهك") على مواقع بيزنس وريادة أعمال مصرية مقابل ذكر تميز برابط
- [ ] **جروبات فيسبوك** أصحاب الكافيهات/الصيدليات/الباربر/العيادات في مصر — ردود مفيدة فعلًا باسم الشركة (مش سبام)، ولينك المقال المناسب من المدونة لما يكون ملائم
- [ ] **مقال جديد كل شهر** على المدونة (طريقة الإضافة في `docs/SEO.md`) — إجابة مباشرة في أول فقرة، جدول، FAQ، ومن غير أرقام أو ادعاءات مش حقيقية
- [ ] بعد ما يبقى فيه 2–3 مصادر مستقلة (أدلة/مقالات/يوتيوب): أنشئ **Wikidata item** لـ Tamyaz (instance of: business / software company، country: Egypt، official website، Facebook/Instagram IDs)

## بعد أسبوعين من النشر — قياس النتيجة

- [ ] اسأل ChatGPT وPerplexity وGemini وClaude (بالعربي والإنجليزي):
  - «سيستم كاشير كافيه في مصر» / «cafe POS system Egypt»
  - «برنامج إدارة صيدلية» / «pharmacy management system Egypt»
  - «سيستم حجز باربر» / «barbershop booking system Egypt»
  - «برنامج عيادة أسنان» / «dental clinic software Egypt»
  - «برنامج إدارة عيادات»، «سيستم مطعم»، «سيستم بار الجيم»، «سيستم كاشير محل»
- [ ] سجّل: تميز ظهرت؟ في أنهي سؤال؟ ومين المصادر اللي الـAI استشهد بيها؟
- [ ] المصادر اللي بتتكرر (مقالات "أفضل برامج..."، أدلة) = اطلب إدراج تميز فيها، أو اكتب مقال أحسن على المدونة يغطي نفس السؤال

## خطوات تقنية بعد الـdeploy (مرة واحدة)

- [ ] افتح وراجع: `/robots.txt`، `/llms.txt`، `/llms-full.txt`، `/sitemap.xml`، `/feed.xml`، و`/ar/systems/cafe-pos-system.md`
- [ ] اختبر الـJSON-LD على https://search.google.com/test/rich-results و https://validator.schema.org (صفحة سيستم + مقال + FAQ)
- [ ] **صورة OG:** اللوجو الحالي SVG (حوالي 500KB) ومنصات زي فيسبوك وواتساب مابتعرضش SVG. اعمل `public/og-image.png` مقاس 1200×630 وغيّر `images` في `src/lib/metadata.js` و`layout.js` ليها
- [ ] اختبر المعاينة على https://developers.facebook.com/tools/debug/
