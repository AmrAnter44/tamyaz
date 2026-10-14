import { buildPageMetadata } from "@/lib/metadata";

// صفحات الأعمال client components، فالميتاداتا (canonical + hreflang + OG) بتتحط من هنا
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/portfolio",
    title: ar ? "أعمال تميز — أنظمة ومواقع وتطبيقات نفّذناها" : "Tamyaz Portfolio — Systems, Websites and Apps We Built",
    description: ar
      ? "أعمال تميز الحقيقية: منظومة Memo Group (أنظمة وتطبيقات ومواقع)، نظام تشغيل كافيه «كيف»، وموقع وسيستم «دوّر صح» لبيع وشراء العربيات."
      : "Real Tamyaz work: the Memo Group ecosystem (systems, apps and websites), the Keyif café operating system, and the Dawr Sa7 used-car website and system.",
  });
}

export default function PortfolioLayout({ children }) {
  return children;
}
