import RichText from "./RichText";

// بيرسم بلوكات المقال (من src/lib/articles.js) — نفس البلوكات اللي بتطلع منها نسخة الماركداون
export default function ArticleBody({ blocks }) {
  return (
    <div className="flex flex-col gap-5 text-[16px] sm:text-[17px] leading-[1.95] text-ink-3">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="text-2xl sm:text-[28px] font-extrabold leading-snug text-ink mt-6">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-lg sm:text-xl font-bold leading-snug text-ink mt-2">
                {b.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const L = b.type;
            return (
              <L key={i} className={`${b.type === "ul" ? "list-disc" : "list-decimal"} ps-6 flex flex-col gap-2 marker:text-accent`}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </L>
            );
          }
          case "table":
            return (
              <div key={i} className="t-row overflow-x-auto">
                <table className="w-full min-w-[560px] text-start text-[14px] sm:text-[15px] leading-relaxed border-collapse">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="text-start font-extrabold text-ink px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-white/5 last:border-0">
                        {row.map((c, k) =>
                          k === 0 ? (
                            <th key={k} scope="row" className="text-start font-bold text-ink px-4 py-3 align-top">
                              {c}
                            </th>
                          ) : (
                            <td key={k} className="px-4 py-3 align-top">
                              {c}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <p key={i} className="t-row px-4 py-3 text-sm text-ink-2 leading-relaxed">
                {b.text}
              </p>
            );
          default:
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
