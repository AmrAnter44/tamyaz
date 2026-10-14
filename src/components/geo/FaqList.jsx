// أسئلة وأجوبة قابلة للفتح — المحتوى كله في الـHTML من السيرفر (الزواحف بتقراه حتى لو مقفول)
export default function FaqList({ items, headingLevel = "h3" }) {
  const H = headingLevel;
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <details key={i} className="group t-card p-5 sm:p-6" {...(i === 0 ? { open: true } : {})}>
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
            <H className="text-base sm:text-lg font-bold leading-relaxed text-ink">{f.q}</H>
            <span
              aria-hidden="true"
              className="text-accent text-2xl leading-none shrink-0 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-[15px] sm:text-base leading-[1.9] text-ink-3">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
