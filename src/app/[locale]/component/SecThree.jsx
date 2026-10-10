"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Package,
  Megaphone,
  Users,
  Video,
  Brain
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

// Hook بسيط للIntersection Observer (مرة واحدة فقط)
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) { // ✅ مرة واحدة بس
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView]);

  return [ref, isInView];
};

// الأيقونات الثابتة
const iconMap = {
  0: Calculator,
  1: Package,
  2: Megaphone,
  3: Users,
  4: Video,
  5: Brain
};

export default function OptimizedSpecializations() {
  const t = useTranslations('specializations');
  const locale = useLocale();
  const [ref, isInView] = useInView();
  const isRTL = locale === 'ar';

  // الحصول على قائمة الخدمات من الترجمات
  const services = t.raw('services');

  return (
    <div id="services" className={`scroll-mt-24 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="max-w-[1200px] mx-auto"
        >
          {/* العنوان */}
          <motion.h2
            className="text-center text-[28px] sm:text-4xl font-extrabold text-ink"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('title')}
          </motion.h2>

          {/* شبكة الخدمات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {services.map((serviceTitle, index) => {
              const IconComponent = iconMap[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="t-card t-card-hover p-6 flex flex-col items-start gap-4 min-h-[168px] group"
                >
                  {/* الأيقونة */}
                  <span className="t-icon !w-14 !h-14 !rounded-2xl">
                    {IconComponent && <IconComponent className="w-7 h-7" strokeWidth={1.7} aria-hidden="true" />}
                  </span>

                  {/* النص */}
                  <div className="flex flex-col">
                    <h3 className="text-ink text-lg lg:text-xl font-bold leading-snug">
                      {serviceTitle}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* نص تشجيعي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-accent text-lg sm:text-xl lg:text-2xl font-bold">
              {t('teamText')}
            </p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}