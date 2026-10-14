import { markdownResponse } from "@/lib/markdown-response";

// نسخة Markdown من أي صفحة: الميدلوير بيعمل rewrite لـ /api/md/<locale>/<path>
// لما الرابط ينتهي بـ.md أو الطلب فيه Accept: text/markdown.
export async function GET(request, { params }) {
  const { path = [] } = await params;
  return markdownResponse(path.join("/"));
}
