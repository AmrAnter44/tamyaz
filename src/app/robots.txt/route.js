import { SITE_URL } from "@/lib/site";

// robots.txt ديناميكي — المصدر الوحيد (public/robots.txt اتشال عشان مايحصلش تعارض).
// Content Signals Policy (contentsignals.org): قرار صاحب الموقع إن البحث والإجابات والتدريب كلهم مسموحين.
export const dynamic = "force-static";

const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

const DISALLOW = ["/api/"];

const SEARCH_ENGINES = ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "YandexBot"];

// قواعد صريحة لزواحف ومساعدات الذكاء الاصطناعي: الوضوح نفسه إشارة GEO، وبيحميهم من أي حظر عام مستقبلًا
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "MistralAI-User",
  "DuckAssistBot",
  "YouBot",
];

const POLICY_NOTICE = `# ==========================================================
#  Tamyaz | تميز — ${SITE_URL}
#
#  Content Signals Policy — https://contentsignals.org
#  By accessing this site, you agree to the following content signals:
#    search   = building a search index and showing search results
#    ai-input = inputting content into AI models (RAG, grounding, AI answers)
#    ai-train = training or fine-tuning AI models
#  "yes" = permitted, "no" = not permitted.
#
#  Tamyaz permits search, ai-input and ai-train.
#  (لو عايز تمنع التدريب: غيّر ai-train=yes لـ ai-train=no في src/app/robots.txt/route.js)
#
#  Agents: every page has a markdown twin (append .md or send Accept: text/markdown).
#  Summary: ${SITE_URL}/llms.txt · Full profile: ${SITE_URL}/llms-full.txt
# ==========================================================`;

function group(userAgent, { signal = true } = {}) {
  return [
    `User-agent: ${userAgent}`,
    ...(signal ? [`Content-Signal: ${CONTENT_SIGNAL}`] : []),
    "Allow: /",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
  ].join("\n");
}

export function GET() {
  const text = [
    POLICY_NOTICE,
    group("*"),
    "# ---------- Search engines ----------",
    ...SEARCH_ENGINES.map((ua) => group(ua, { signal: false })),
    "# ---------- AI crawlers & assistants ----------",
    ...AI_CRAWLERS.map((ua) => group(ua)),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n\n");

  return new Response(`${text}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
