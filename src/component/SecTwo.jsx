"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook محسن للIntersection Observer
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, []);

  return [targetRef, isInView];
};

// محتوى القسم
const content = {
  ar: {
    title: "في تميز هنساعدك انك تبقي مميز رقميا",
    subtitle: "هنقدر نقدملك حلول تقنيه تساعدك في:",
    points: [
      "العملاء تعرف عنك اكتر و عن اللي بتقدمة",
      "موقع احترافي مبني علي الهوية البصرية الخاصة بيك بأحدث الادوات",
      "تصميم مميز مع كل التعديلات اللي هتطلبها",
      "هنقدر نحدث اجهزة شركتك"
    ],
    cta: "ابدأ رحلتك معنا",
    experience: "+ سنوات خبرة",
    experienceNumber: "4"
  },
  en: {
    title: "At Tamyaz, We'll Help You Excel Digitally",
    subtitle: "We can provide you with technical solutions that help you with:",
    points: [
      "Customers know more about you and what you offer",
      "Professional website built on your visual identity with latest tools",
      "Unique design with all the modifications you'll request",
      "We can upgrade your company's devices"
    ],
    cta: "Start Your Journey With Us",
    experience: "+ Years Experience",
    experienceNumber: "4"
  }
};

// مكون النقطة
const PointItem = React.memo(({ point, index, isRTL }) => (
  <motion.div
    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group"
  >
    <div className={`grid grid-cols-[auto_1fr] gap-4 items-start ${isRTL ? 'grid-cols-[1fr_auto]' : ''}`}>
      {isRTL ? (
        <>
          <p className="text-right group-hover:text-gray-700 transition-colors font-medium font-arabic">
            {point}
          </p>
          <CheckCircle className="text-gray-700 group-hover:text-black mt-1" size={24} />
        </>
      ) : (
        <>
          <CheckCircle className="text-gray-700 group-hover:text-black mt-1" size={24} />
          <p className="text-left group-hover:text-gray-700 transition-colors font-medium">
            {point}
          </p>
        </>
      )}
    </div>
  </motion.div>
));

export default function OptimizedAboutSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const t = useMemo(() => content[language], [language]);
  const isRTL = language === 'ar';

  return (
    <section
      ref={ref}
      className={`py-20 px-6 bg-yellow-300 relative overflow-hidden text-black`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-30">
        {[
          { width: 150, height: 180, left: '10%', top: '20%' },
          { width: 200, height: 160, left: '80%', top: '15%' },
          { width: 120, height: 220, left: '25%', top: '70%' },
          { width: 180, height: 140, left: '70%', top: '60%' },
          { width: 160, height: 190, left: '50%', top: '40%' }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300/10 rounded-full"
            style={{ width: item.width, height: item.height, left: item.left, top: item.top }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* النصوص */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className={`text-4xl lg:text-5xl font-bold leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                {t.title}
              </h2>
              <p className="text-xl font-medium">{t.subtitle}</p>
            </motion.div>

            <div className="space-y-4">
              {t.points.map((point, index) => (
                <PointItem key={index} point={point} index={index} isRTL={isRTL} />
              ))}
            </div>

            <motion.a
              href="/form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-fit"
            >
              <span>{t.cta}</span>
              <motion.div whileHover={{ x: isRTL ? -5 : 5 }} transition={{ type: "spring", stiffness: 400 }}>
                {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </motion.div>
            </motion.a>
          </div>

          {/* البطاقة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-black text-white p-12 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
                    animate={{ rotate: [0, 360], scale: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  >
                    <Star className="text-white" size={12} />
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-6xl font-bold mb-4"
                >
                  {t.experienceNumber}
                </motion.div>
                <div className="text-xl font-bold">{t.experience}</div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full opacity-20 blur-xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
