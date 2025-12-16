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
    <div className={`min-h-screen bg-black ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-20 px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="container mx-auto"
        >
          {/* العنوان */}
          <motion.h2
            className={`text-center text-4xl lg:text-5xl font-bold p-4 m-4 text-yellow-300 ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('title')}
          </motion.h2>

          {/* شبكة الخدمات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
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
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="relative flex flex-col justify-center items-center
                            h-56 overflow-hidden
                            bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-400
                            rounded-3xl
                            transition-all duration-300 cursor-pointer group
                            shadow-xl hover:shadow-2xl"
                >
                  {/* الأيقونة */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    {IconComponent && <IconComponent className="w-20 h-20 text-black group-hover:text-gray-800" strokeWidth={1.5} />}
                  </motion.div>

                  {/* النص */}
                  <div className="flex flex-col items-center justify-center">
                    <h3 className={`text-black text-xl lg:text-2xl font-bold text-center px-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
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
            className="mt-16 text-center"
          >
            <p className={`text-yellow-300 text-xl lg:text-2xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
              {t('teamText')}
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
  );
}