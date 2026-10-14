// أنهي مسارات ليها نسخة Markdown — خفيف ومن غير imports تقيلة لأن الميدلوير (edge) بيستخدمه
// عشان يقرر يحوّل طلب Accept: text/markdown للنسخة الماركداون ولا يسيبه HTML.
// src/lib/markdown-pages.js بيستخدم نفس الدالة، فالاتنين مايختلفوش أبدًا.

const LEAF = new Set(["systems", "faq", "about", "blog", "portfolio"]);

/**
 * @param {string[]} segments أجزاء المسار بعد اللغة، مثال ['systems','cafe-pos-system']
 */
export function hasMarkdownTwin(segments = []) {
  const [first, second, third, ...rest] = segments;
  if (rest.length) return false;
  if (!first) return true; // الرئيسية
  if (!LEAF.has(first)) return false;
  if (first === "portfolio") {
    if (!second) return true;
    if (second === "category") return Boolean(third);
    return !third;
  }
  if (third) return false;
  // systems و blog بياخدوا slug؛ faq و about صفحات من غير أبناء
  return first === "systems" || first === "blog" ? true : !second;
}
