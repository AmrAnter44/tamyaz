import { markdownResponse } from "@/lib/markdown-response";

// توافق قديم: /api/md?path=/ar/portfolio — الميدلوير دلوقتي بيستخدم /api/md/[...path]
export function GET(request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  return markdownResponse(path);
}
