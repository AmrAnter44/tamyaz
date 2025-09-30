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
      className={`py-20 px-6 bg-yellow-300 text-black`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* النصوص */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* العنوان */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className={`text-4xl lg:text-5xl font-bold leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                {t('title')}
              </h2>
              <p className="text-xl font-medium">{t('subtitle')}</p>
            </motion.div>

            {/* النقاط */}
            <div className="space-y-4">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="text-gray-700 group-hover:text-black mt-1 flex-shrink-0" size={24} />
                    <p className={`group-hover:text-gray-700 transition-colors font-medium ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
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
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-fit"
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
              className="relative bg-black text-white p-12 rounded-3xl shadow-2xl text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl font-bold mb-4"
              >
                {t('experienceNumber')}
              </motion.div>
              <div className="text-xl font-bold">{t('experience')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </section>
  );
}