import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/package",
    markdown: false,
    title: ar ? "احسب باقتك — باقات تميز للتسويق والمواقع والأنظمة" : "Build Your Package — Tamyaz Marketing, Website and System Plans",
    description: ar
      ? "اختار الخدمات اللي محتاجها من تميز (تسويق، موقع، نظام إدارة) واعرف التكلفة مباشرة."
      : "Pick the Tamyaz services you need (marketing, website, management system) and see the cost instantly.",
  });
}

export default function PackageLayout({ children }) {
  return children;
}
