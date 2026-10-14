import { buildMarkdown } from "@/lib/markdown-pages";
import { SITE_URL } from "@/lib/site";

// الرد الموحّد لنسخة الماركداون (بيستخدمه /api/md/[...path] و /api/md?path=)
export function markdownResponse(path) {
  const clean = `/${String(path || "").split("/").filter(Boolean).join("/")}`;
  const body = buildMarkdown(clean);

  if (!body) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // نفس رابط الصفحة بيرجّع HTML أو Markdown حسب هيدر Accept
      Vary: "Accept, Accept-Language",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      // الصفحة الأصلية (HTML) هي الـcanonical، عشان نسخة .md ماتتحسبش محتوى مكرر
      Link: `<${SITE_URL}${clean === "/" ? "" : clean}>; rel="canonical"`,
    },
  });
}
