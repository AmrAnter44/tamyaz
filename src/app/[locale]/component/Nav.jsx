"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Globe, Menu, X, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-50px 0px -50px 0px"
  });

  return [ref, isInView];
}

export default function EnhancedNavbar() {
  const t = useTranslations('navbar');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = locale === 'ar';

  const [heroRef] = useScrollAnimation();
  const [logoRef, logoInView] = useScrollAnimation();
  const [textRef, textInView] = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // قفل المنيو بـEsc أو لما الصفحة تتغير
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: newLocale });
  };

  const links = [
    { href: `/${locale}#systems`, label: t('links.systems') },
    { href: `/${locale}#services`, label: t('links.services') },
    { href: `/${locale}/portfolio`, label: t('links.portfolio') },
    { href: `/${locale}/package`, label: t('links.package') },
    { href: `/${locale}#faq`, label: t('links.faq') },
  ];

  return (
    <main
      className={isRTL ? "rtl" : "ltr"}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* هيدر زجاجي على شكل حبة */}
      <motion.header
        className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 pt-3 sm:pt-4"
        initial={reduceMotion ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative max-w-[1200px] mx-auto">
          <div
            className={`t-glass flex items-center gap-2 sm:gap-4 rounded-full ps-3 pe-2 sm:ps-4 py-2 transition-shadow duration-300 ${scrolled ? 'shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)]' : ''}`}
          >
            {/* اللوجو والاسم */}
            <a href={`/${locale}`} className="flex items-center gap-2.5 me-auto min-h-11 min-w-0" aria-label="Tamyaz">
              <Image
                src="/logo.svg"
                alt="Tamyaz"
                width={36}
                height={36}
                priority
                className="w-9 h-9 shrink-0 object-contain"
              />
              <span className="font-extrabold text-lg text-ink truncate">{isRTL ? 'تميز' : 'Tamyaz'}</span>
            </a>

            {/* روابط الأقسام — ديسكتوب */}
            <nav aria-label={isRTL ? 'الأقسام' : 'Sections'} className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center min-h-11 px-3.5 rounded-full text-[15px] font-semibold text-[#c9c9c2] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* تبديل اللغة */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="btn btn-secondary hidden sm:inline-flex !px-4"
              aria-label={t('switchLanguage')}
            >
              <Globe size={17} />
              <span>{t('switchLanguage')}</span>
            </button>

            {/* ابدأ الآن */}
            <a
              href={`/${locale}/form`}
              className="btn btn-primary hidden sm:inline-flex"
              aria-label={t('cta')}
            >
              {t('cta')}
            </a>

            {/* زرار المنيو — موبايل وتابلت */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? (isRTL ? 'إغلاق القائمة' : 'Close menu') : (isRTL ? 'فتح القائمة' : 'Open menu')}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full t-raised text-ink shrink-0"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* القائمة المنسدلة على الموبايل */}
          {menuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden absolute inset-x-0 top-full mt-2 t-glass rounded-[22px] p-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain shadow-[0_28px_50px_-30px_rgba(0,0,0,0.95)]"
            >
              <nav aria-label={isRTL ? 'الأقسام' : 'Sections'} className="flex flex-col">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center min-h-12 px-4 rounded-2xl text-base font-semibold text-[#c9c9c2] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="t-rule my-2" />
              <div className="grid grid-cols-2 gap-2 p-1 sm:hidden">
                <button type="button" onClick={toggleLanguage} className="btn btn-secondary w-full">
                  <Globe size={17} />
                  <span>{t('switchLanguage')}</span>
                </button>
                <a href={`/${locale}/form`} className="btn btn-primary w-full">
                  {t('cta')}
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      {!pathname.startsWith('/portfolio/') && <section
        ref={heroRef}
        className="relative w-full overflow-hidden pt-28 sm:pt-32 pb-12 lg:pb-20"
      >
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* النص */}
            <motion.div
              ref={textRef}
              className={`flex flex-col gap-5 sm:gap-6 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={textInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="t-eyebrow self-start">{tHero('eyebrow')}</span>

              <h1 className="text-[34px] leading-[1.2] sm:text-5xl xl:text-[56px] sm:leading-[1.15] font-extrabold text-ink">
                <span>{tHero('title')} </span>
                <span className="text-accent">{tHero('titleHighlight')}</span>
                <span> {tHero('titleEnd')}</span>
              </h1>

              <p className="text-base sm:text-lg leading-[1.8] text-ink-3 max-w-[540px]">
                {tHero('description')}
              </p>

              <div className="flex flex-wrap gap-3">
                <a href={`/${locale}/form`} className="btn btn-primary btn-lg">
                  <span>{tHero('cta')}</span>
                  {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </a>
                <a
                  href="https://wa.me/201028518754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  <MessageCircle size={18} />
                  <span>{tHero('whatsapp')}</span>
                </a>
              </div>
            </motion.div>

            {/* كارت لوحة التحكم + اللوجو */}
            <motion.div
              ref={logoRef}
              className="relative min-w-0"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={logoInView || reduceMotion ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="t-card p-4 sm:p-5 flex flex-col gap-3.5" aria-hidden="true">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Image src="/logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
                    <span className="font-bold truncate">{tHero('card.title')}</span>
                  </div>
                  <span className="shrink-0 px-2.5 py-0.5 rounded-lg text-xs font-semibold text-[#6fd39a] bg-[rgba(111,211,154,0.12)] shadow-[inset_0_0_0_1px_rgba(111,211,154,0.28)]">
                    {tHero('card.live')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* قيم تجريدية (مش أرقام حقيقية) — الكارت توضيحي بس */}
                  {[
                    { label: tHero('card.sales'), width: '78%', accent: false },
                    { label: tHero('card.orders'), width: '46%', accent: true },
                    { label: tHero('card.expenses'), width: '62%', accent: false },
                  ].map((kpi) => (
                    <div key={kpi.label} className="min-w-0 p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-1">
                      <span className="text-[11px] sm:text-xs text-ink-2 truncate">{kpi.label}</span>
                      <span className="flex items-center h-6 sm:h-7">
                        <span
                          className="block h-2.5 sm:h-3 rounded-full"
                          style={{
                            width: kpi.width,
                            background: kpi.accent ? 'var(--accent)' : 'rgba(236,236,230,.85)',
                            boxShadow: kpi.accent ? '0 0 14px rgba(var(--accent-rgb), .45)' : 'none',
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-2 sm:gap-2.5 h-28 sm:h-36">
                  {[45, 62, 50, 88, 70, 58, 40].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        height: `${h}%`,
                        background: i === 3
                          ? 'var(--accent)'
                          : i === 5
                            ? 'repeating-linear-gradient(135deg, rgba(236,236,230,.55) 0 6px, rgba(236,236,230,.18) 6px 12px)'
                            : '#ecece6',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>}
    </main>
  );
}
