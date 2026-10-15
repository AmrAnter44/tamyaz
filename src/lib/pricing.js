// أسعار تميز المعلنة للفرع الواحد (جنيه مصري) — مصدر واحد للصفحات والـschema
// كل الأنظمة: شهري 2000، 3 شهور 5400 (1800/شهر)، 6 شهور 9900 (1650/شهر)، سنة 18000 (1500/شهر)
// تميز باربر ليه أسعاره الخاصة في content/systems.js (plans)
export const DEFAULT_PLANS = [
  { months: 1, price: 2000 },
  { months: 3, price: 5400 },
  { months: 6, price: 9900 },
  { months: 12, price: 18000 },
];

export function plansFor(system) {
  const plans = system?.plans?.length ? system.plans : DEFAULT_PLANS;
  const base = plans.find((p) => p.months === 1)?.price ?? plans[0].price / plans[0].months;
  return plans.map((p) => {
    const perMonth = Math.round(p.price / p.months);
    const full = base * p.months;
    const savePct = full > p.price ? Math.round(((full - p.price) / full) * 1000) / 10 : 0;
    return { ...p, perMonth, savePct, saveAmount: full - p.price };
  });
}

export function planLabel(months, locale) {
  if (locale === "ar") return months === 1 ? "شهري" : months === 12 ? "سنوي" : `${months} شهور`;
  return months === 1 ? "Monthly" : months === 12 ? "Yearly" : `${months} months`;
}

export const fmtEGP = (n) => Number(n).toLocaleString("en-US");
