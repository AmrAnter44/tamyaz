// مسار التنقل الظاهر (والـBreadcrumbList schema بيتبعت من الصفحة نفسها)
export default function Breadcrumbs({ locale, items }) {
  const sep = locale === "ar" ? "‹" : "›";
  return (
    <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2 list-none p-0 m-0">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2 min-w-0">
              {last ? (
                <span aria-current="page" className="text-ink-3 truncate max-w-[70vw] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <>
                  <a href={`/${locale}${item.path}`} className="hover:text-accent transition-colors">
                    {item.name}
                  </a>
                  <span aria-hidden="true" className="text-ink-4">{sep}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
