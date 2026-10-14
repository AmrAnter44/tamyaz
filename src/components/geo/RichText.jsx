import { SITE_URL } from "@/lib/site";

// نص بسيط فيه **bold** و [رابط](url) → عناصر React (من غير مكتبة ماركداون)
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export default function RichText({ text }) {
  const parts = String(text).split(TOKEN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const href = link[2].startsWith(SITE_URL) ? link[2].slice(SITE_URL.length) || "/" : link[2];
      const external = /^https?:\/\//.test(href);
      return (
        <a
          key={i}
          href={href}
          className="text-accent font-semibold underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
