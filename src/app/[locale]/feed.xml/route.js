import { buildFeed } from "@/lib/feed";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(request, { params }) {
  const { locale } = await params;
  return buildFeed(locale);
}
