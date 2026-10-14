// IndexNow: بيبلّغ Bing (و Yandex و Naver و Seznam) فورًا بكل صفحات الموقع من الـsitemap.
// ChatGPT و Copilot بيبحثوا عن طريق Bing، فده أسرع طريق إن الصفحات الجديدة تتفهرس هناك.
// مش محتاج حساب — بس ملف المفتاح لازم يكون منشور على الموقع (public/<key>.txt).
//
//   npm run indexnow                    ← كل صفحات الـsitemap
//   npm run indexnow -- /ar/blog/x ...  ← صفحات معينة
//   SITE_URL=https://... npm run indexnow ← دومين تاني (مثلًا preview)
//
// شغّله بعد كل deploy فيه صفحات جديدة أو متعدّلة. التفاصيل في docs/SEO.md.

const SITE = (process.env.SITE_URL || 'https://www.tamyaz.online').replace(/\/+$/, '')
const KEY = '70480368e4886752419a46221d83b6de'
const host = new URL(SITE).host

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

const args = process.argv.slice(2)
const urls = args.length ? args.map((p) => (p.startsWith('http') ? p : SITE + p)) : await sitemapUrls()
if (!urls.length) {
  console.error('No URLs found')
  process.exit(1)
}

// لازم ملف المفتاح يكون live قبل الإرسال — من غيره IndexNow بيرفض الطلب
const keyRes = await fetch(`${SITE}/${KEY}.txt`)
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not live yet at ${SITE}/${KEY}.txt — deploy first, then re-run.`)
  process.exit(1)
}

// IndexNow بيقبل لحد 10,000 URL في الطلب الواحد
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
})
console.log(`IndexNow → ${res.status} ${res.statusText} — submitted ${urls.length} URL(s)`)
if (!res.ok) {
  console.error(await res.text())
  process.exit(1)
}
