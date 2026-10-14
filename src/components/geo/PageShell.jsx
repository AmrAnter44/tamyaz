import Nav from "@/app/[locale]/component/Nav";
import Footer from "@/app/[locale]/component/Footer";

// غلاف الصفحات الداخلية (الأنظمة/المدونة/الأسئلة/عن تميز): نفس الهيدر والفوتر، والمحتوى كله server-rendered
export default function PageShell({ locale, children, width = "max-w-[1000px]" }) {
  const isRTL = locale === "ar";
  return (
    <div className="relative z-10">
      <Nav />
      <div className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6" dir={isRTL ? "rtl" : "ltr"}>
        <div className={`${width} mx-auto flex flex-col gap-10 sm:gap-12 min-w-0`}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
