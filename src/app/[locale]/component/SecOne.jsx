"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, CheckSquare, Lightbulb } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
      }
    }, {
      threshold: 0.2,
      ...options
    });

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [isInView]);

  return [targetRef, isInView];
};

const CountUp = ({ end, duration = 2, suffix = "", start = 1 }) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const startCount = start;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted, start]);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  return <span>{count}{suffix}</span>;
};

// الأيقونات والأرقام الثابتة
const statsConfig = [
  { 
    icon: Clock, 
    value: 2023, 
    id: 1,
    key: 'startedIn',
    descKey: 'start'
  },
  { 
    icon: User, 
    value: 62, 
    id: 2,
    key: 'peopleDecided',
    descKey: 'clients'
  },
  { 
    icon: CheckSquare, 
    value: 8, 
    id: 3,
    key: 'projectsInProgress',
    descKey: 'projects'
  },
  { 
    icon: Lightbulb, 
    value: 35, 
    id: 4,
    key: 'servedCompanies',
    descKey: 'companies'
  }
];

export default function ResponsiveStatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const [ref, isInView] = useInView();
  const isRTL = locale === 'ar';

  return (
    <section className={`bg-black text-white py-16 px-6 ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* عنوان القسم */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-yellow-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('title')}
          </h2>
          <p className={`text-gray-300 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 50
              }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                y: 0
              } : { 
                opacity: 0, 
                scale: 0.8,
                y: 50
              }}
              transition={{ 
                delay: 0.2 + index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-yellow-300 rounded-2xl p-6 text-black shadow-xl hover:shadow-yellow-300/20 transition-all duration-300"
            >
              {/* الأيقونة */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-yellow-300" />
                </div>
              </div>

              {/* المحتوى */}
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-2">
                  {isInView && (
                    <CountUp 
                      end={stat.value} 
                      duration={2}
                      suffix={stat.id !== 1 ? "+" : ""}
                    />
                  )}
                </div>
                <div className={`text-sm lg:text-base font-bold leading-tight mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {t(stat.key)}
                </div>
                <div className={`text-xs lg:text-sm opacity-70 ${isRTL ? 'font-arabic' : ''}`}>
                  {t(`descriptions.${stat.descKey}`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </section>
  );
}