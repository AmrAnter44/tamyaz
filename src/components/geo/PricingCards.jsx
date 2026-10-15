import { Check, MessageCircle } from "lucide-react";
import { plansFor, planLabel, fmtEGP } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

// كروت الباقات (للفرع الواحد) — الشهري / 3 / 6 / سنة، والسنوي متعلّم «الأوفر»
export default function PricingCards({ system, systemName, locale }) {
  const isAr = locale === "ar";
  const plans = plansFor(system);
  const best = plans.reduce((a, b) => (b.perMonth < a.perMonth ? b : a), plans[0]);
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => {
          const highlight = p === best && p.months > 1;
          const label = planLabel(p.months, locale);
          const waText = isAr
            ? `أهلاً، عايز باقة ${label} لـ ${systemName}`
            : `Hi, I'd like the ${label} plan for ${systemName}`;
          return (
            <li
              key={p.months}
              className="t-card relative p-5 sm:p-6 flex flex-col gap-4"
              style={highlight ? { borderColor: "rgba(247,215,0,.55)", boxShadow: "0 0 0 1px rgba(247,215,0,.35), 0 20px 50px -25px rgba(247,215,0,.45)" } : undefined}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-ink">{label}</h3>
                {highlight ? (
                  <span className="t-chip text-xs font-bold" style={{ background: "#F7D700", color: "#1d1d1b" }}>
                    {isAr ? "الأوفر" : "Best value"}
                  </span>
                ) : p.savePct > 0 ? (
                  <span className="t-chip num text-xs">{isAr ? `وفّر ${p.savePct}%` : `Save ${p.savePct}%`}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-ink num">{fmtEGP(p.price)}</span>
                  <span className="text-sm text-ink-3">{isAr ? "جنيه" : "EGP"}</span>
                </p>
                <p className="text-sm text-ink-2 num">
                  {p.months === 1
                    ? isAr ? "في الشهر للفرع" : "per month, per branch"
                    : isAr ? `${fmtEGP(p.perMonth)} جنيه في الشهر · للفرع` : `EGP ${fmtEGP(p.perMonth)}/month · per branch`}
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-ink-2">
                <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0" style={{ color: "#F7D700" }} aria-hidden="true" />{isAr ? "كل مميزات السيستم" : "All system features"}</li>
                <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0" style={{ color: "#F7D700" }} aria-hidden="true" />{isAr ? "تحديثات ودعم فني" : "Updates and support"}</li>
                {p.saveAmount > 0 ? (
                  <li className="flex items-start gap-2 num"><Check size={16} className="mt-0.5 shrink-0" style={{ color: "#F7D700" }} aria-hidden="true" />{isAr ? `بتوفّر ${fmtEGP(p.saveAmount)} جنيه` : `You save EGP ${fmtEGP(p.saveAmount)}`}</li>
                ) : null}
              </ul>
              <a
                href={whatsappLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${highlight ? "btn-primary" : "btn-secondary"} w-full mt-auto`}
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>{isAr ? "اشترك" : "Get started"}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-ink-3">
        {isAr ? "الأسعار للفرع الواحد. لأكتر من فرع كلمنا ونبعتلك عرض سعر." : "Prices are per branch. For multiple branches, contact us for a quote."}
      </p>
    </div>
  );
}
