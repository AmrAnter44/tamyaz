import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/form",
    markdown: false,
    title: ar ? "اطلب عرض سعر — تواصل مع تميز" : "Request a Quote — Contact Tamyaz",
    description: ar
      ? "سجّل طلبك واختار السيستم اللي محتاجه، أو كلمنا على واتساب +20 102 851 8754 والباقات تبدأ من 1500 جنيه شهرياً حسب عدد فروعك."
      : "Submit your request and choose the system you need, or message us on WhatsApp +20 102 851 8754 — plans start from EGP 1,500/month, quoted by number of branches.",
  });
}

export default function FormLayout({ children }) {
  return children;
}
