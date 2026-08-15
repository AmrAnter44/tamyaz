"use client";
import React from "react";
import { useLocale, useTranslations } from 'next-intl';
import { projectsData, categoriesData, getCategory, getProjectLink } from "@/data/projects";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import PortfolioCard from "../component/PortfolioCard";
import Reveal from "../component/Reveal";

export default function PortfolioPage() {
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const isRTL = locale === "ar";

  // تجميع المشاريع بالتصنيف على ترتيب التصنيفات، واللي مالوش تصنيف بيتعرض في آخر مجموعة
  const sections = categoriesData
    .map((category) => ({
      key: category.id,
      category,
      projects: projectsData.filter((p) => p.categoryId === category.id),
    }))
    .filter((section) => section.projects.length > 0);

  const uncategorized = projectsData.filter((p) => !getCategory(p.categoryId));
  if (uncategorized.length > 0) {
    sections.push({ key: "__uncategorized", category: null, projects: uncategorized });
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-black py-24 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <Reveal as="h1" className={`text-center text-4xl lg:text-5xl font-bold text-yellow-300 mb-12 ${isRTL ? 'font-arabic' : ''}`}>
          {t('title')}
        </Reveal>

        {sections.map((section) => {
          // التصنيف المجمّع بيتعرض ككارد واحد باسمه، فمالوش لازمة عنوان قسم فوقه
          const grouped = section.category?.grouped;

          return (
            <section key={section.key} className="mb-16 last:mb-0">
              {section.category && !grouped && (
                <Reveal as="div" className="flex items-center gap-4 mb-8">
                  <h2 className={`text-2xl lg:text-3xl font-bold text-yellow-300 whitespace-nowrap ${isRTL ? 'font-arabic' : ''}`}>
                    {section.category.name[locale]}
                  </h2>
                  <span
                    className="sweep h-px flex-1 bg-yellow-300/25"
                    style={{ "--sweep-origin": isRTL ? "right" : "left" }}
                  />
                  <span className="text-sm font-bold text-white/50" dir="ltr">
                    {section.projects.length}
                  </span>
                </Reveal>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {grouped ? (
                  <Reveal>
                    <PortfolioCard
                      href={`/${locale}/portfolio/category/${section.category.id}`}
                      title={section.category.name[locale]}
                      thumbnail={section.category.thumbnail ?? section.projects[0].thumbnail}
                      badge={t('viewWorks')}
                      subtitle={t('worksCount', { count: section.projects.length })}
                    />
                  </Reveal>
                ) : (
                  section.projects.map((project, i) => {
                    const link = getProjectLink(project, locale);
                    return (
                      <Reveal key={project.id} delay={i * 90}>
                        <PortfolioCard
                          href={link.href}
                          external={link.external}
                          title={project.name}
                          thumbnail={project.thumbnail}
                          badge={link.external ? t('visitWebsite') : t('viewProject')}
                        />
                      </Reveal>
                    );
                  })
                )}
              </div>
            </section>
          );
        })}
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}
