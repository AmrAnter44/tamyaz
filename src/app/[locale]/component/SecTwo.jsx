"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

// Hook بسيط للIntersection Observer (مرة واحدة فقط)
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) { // ✅ يحصل مرة واحدة بس
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView]); // ✅ متابعة الـ state

  return [ref, isInView];
};

export default function LightAboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [ref, isInView] = useInView();
  const isRTL = locale === 'ar';

  // الحصول على النقاط من الترجمات
  const points = t.raw('points');

  return (
    <section
      ref={ref}
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 text-ink scroll-mt-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* النصوص */}
          <div className={`space-y-8 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* العنوان */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
<h2 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-ink">
  {t('title')}
</h2>
<h3 className="text-lg sm:text-xl font-semibold text-ink-3">{t('subtitle')}</h3> {/* Changed from p to h3 */}
            </motion.div>

            {/* النقاط */}
            <div className="space-y-3">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="t-row p-4 hover:border-accent/30 transition-colors group"
                >
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={22} aria-hidden="true" />
                    <p className={`text-ink font-medium leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* زر البداية */}
            <motion.a
              href={`/${locale}/form`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="group btn btn-primary btn-lg w-fit"
            >
              <span>{t('cta')}</span>
              <motion.div whileHover={{ x: isRTL ? -5 : 5 }}>
                {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </motion.div>
            </motion.a>
          </div>

          {/* بطاقة الخبرة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="t-card p-10 sm:p-12 text-center overflow-hidden"
              style={{ background: "radial-gradient(500px 260px at 100% 0%, rgba(247,215,0,.12), transparent 70%), linear-gradient(180deg,#252522,#151513)", borderColor: "rgba(247,215,0,.28)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="num text-6xl sm:text-7xl font-extrabold mb-3 text-accent"
              >
                {t('experienceNumber')}
              </motion.div>
              <div className="text-xl font-bold text-ink">{t('experience')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}