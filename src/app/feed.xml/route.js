// /feed.xml — أول مكان القرّاء والزواحف بيدوروا فيه. بيرجّع المدونة العربي (اللغة الأساسية للموقع)؛
// النسخة الإنجليزي على /en/feed.xml.
import { buildFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return buildFeed("ar");
}
