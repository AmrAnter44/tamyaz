"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clapperboard,
  Globe,
  LayoutDashboard,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { getCategory, getCategoryProjects, getProjectLink } from "@/data/projects";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import Reveal from "../../../component/Reveal";

// عدد النقط اللي بتبان لكل خدمة قبل ما تدخل صفحة المشروع
const PREVIEW = 6;

// أيقونة كل نوع خدمة — بتتقرا من project.icon في الداتا
const SERVICE_ICONS = {
  media: Clapperboard,
  website: Globe,
  system: LayoutDashboard,
};

export default function CategoryPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const isRTL = locale === "ar";

  const category = getCategory(params.categoryId);
  if (!category) {
    notFound();
  }

  const all = getCategoryProjects(category.id);
  // الخدمات بترتيب التصنيف، وأي مشروع مش مذكور في الترتيب بيتحط في الآخر
  const services = (category.services ?? [])
    .map((id) => all.find((p) => p.id === id))
    .filter(Boolean)
    .concat(all.filter((p) => !(category.services ?? []).includes(p.id)));

  return (
    <>
      <Nav />
      <div className="min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/${locale}/portfolio`}
            className={`btn btn-secondary mb-8`}
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{t('backToPortfolio')}</span>
          </Link>

          <Reveal as="header">
            <div className="flex items-center gap-4 mb-4">
              <span className="floaty shrink-0 grid place-items-center w-14 h-14 rounded-2xl t-icon !w-14 !h-14 !rounded-2xl">
                <Stethoscope size={26} className="text-accent" />
              </span>
              <h1 className={`text-[32px] sm:text-4xl lg:text-5xl font-extrabold text-ink`}>
                {category.name[locale]}
              </h1>
            </div>
            {category.intro && (
              <p className={`text-ink-3 text-lg lg:text-xl leading-relaxed max-w-3xl`}>
                {category.intro[locale]}
              </p>
            )}
          </Reveal>

          {/* الخدمات — كل خدمة بتفاصيلها وإيه اللي هتكسبه منها */}
          <Reveal as="div" className="flex items-center gap-4 mt-16 mb-8">
            <h2 className={`text-2xl lg:text-3xl font-extrabold text-ink min-w-0 sm:whitespace-nowrap`}>
              {t('services')}
            </h2>
            <span
              className="sweep h-px flex-1 min-w-6 bg-accent/25"
              style={{ "--sweep-origin": isRTL ? "right" : "left" }}
            />
          </Reveal>

          <div className="space-y-8">
            {services.map((project, index) => {
              const Icon = SERVICE_ICONS[project.icon] ?? Sparkles;
              const features = project.features?.[locale]?.slice(0, PREVIEW) ?? [];
              const benefits = project.benefits?.[locale]?.slice(0, PREVIEW) ?? [];
              const highlights = project.highlights?.[locale] ?? [];
              const featuresLeft = (project.features?.[locale]?.length ?? 0) - features.length;
              const benefitsLeft = (project.benefits?.[locale]?.length ?? 0) - benefits.length;

              return (
                // الـReveal في عنصر لوحده عشان الترانزيشن بتاعه مايلغيش ترانزيشن الهوفر بتاع الكارت
                <Reveal key={project.id} delay={index * 90}>
                <article
                  className="t-card group relative block overflow-hidden p-5 sm:p-6 lg:p-8 hover:border-accent/30 hover:-translate-y-1 transition duration-300"
                >
                  {/* شريط أصفر بيتمد على طول الكارت مع الهوفر */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isRTL ? 'origin-right' : 'origin-left'}`}
                  />

                  {/* رأس الخدمة: الأيقونة والاسم واللوجو */}
                  <div className="flex items-center gap-4 mb-5">
                    {/* الأيقونة ثابتة — مافيش تأثير عند الهوفر أو الدوس عليها */}
                    <span className="shrink-0 grid place-items-center w-14 h-14 rounded-2xl t-icon !w-14 !h-14 !rounded-2xl">
                      <Icon size={26} className="text-accent" />
                    </span>

                    <div className="min-w-0">
                      <h3 className={`text-xl lg:text-2xl font-bold text-ink truncate`}>
                        {project.name}
                      </h3>
                    </div>

                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      width={80}
                      height={80}
                      className="hidden sm:block w-16 h-16 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-300 ms-auto"
                      loading="lazy"
                      quality={75}
                    />
                  </div>

                  <p className={`text-ink-3 leading-relaxed mb-6`}>
                    {project.description[locale]}
                  </p>

                  {/* أرقام سريعة عن الخدمة */}
                  {highlights.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-8">
                      {highlights.map((item, i) => (
                        <li
                          key={item}
                          style={{ transitionDelay: `${140 + i * 60}ms` }}
                          className={`stagger-item px-3 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-bold hover:bg-accent hover:text-on-accent hover:border-accent`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* إيه اللي في الخدمة */}
                    {features.length > 0 && (
                      <div>
                        <h4 className={`flex items-center gap-2 text-sm font-bold text-ink-2 mb-4`}>
                          <Sparkles size={15} className="text-accent" />
                          {t('features')}
                        </h4>
                        <ul className="space-y-3">
                          {features.map((item, i) => (
                            <li
                              key={i}
                              style={{ transitionDelay: `${220 + i * 55}ms` }}
                              className={`stagger-item flex gap-3 text-sm text-ink-3 leading-relaxed`}
                            >
                              <span aria-hidden="true" className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {featuresLeft > 0 && (
                          <p className={`text-xs text-ink-4 mt-3`}>
                            {t('morePoints', { count: featuresLeft })}
                          </p>
                        )}
                      </div>
                    )}

                    {/* إيه اللي هتكسبه */}
                    {benefits.length > 0 && (
                      <div>
                        <h4 className={`flex items-center gap-2 text-sm font-bold text-ink-2 mb-4`}>
                          <TrendingUp size={15} className="text-accent" />
                          {t('benefits')}
                        </h4>
                        <ul className="space-y-3">
                          {benefits.map((item, i) => (
                            <li
                              key={i}
                              style={{ transitionDelay: `${260 + i * 55}ms` }}
                              className={`stagger-item flex gap-3 t-row p-3.5 text-sm text-ink leading-relaxed hover:border-accent/30 hover:bg-white/[0.08]`}
                            >
                              <Check size={16} className="shrink-0 mt-0.5 text-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {benefitsLeft > 0 && (
                          <p className={`text-xs text-ink-4 mt-3`}>
                            {t('morePoints', { count: benefitsLeft })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href={getProjectLink(project, locale).href}
                    className={`btn btn-primary mt-8`}
                  >
                    <span>{t('fullDetails')}</span>
                    {/* السهم بيزحف في اتجاه القراءة عند الهوفر */}
                    <span className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </span>
                  </Link>
                </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
