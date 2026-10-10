"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
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

export default function OptimizedFAQSection() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const isRTL = locale === 'ar';

  // الحصول على عدد الأسئلة من الترجمات
  const faqItems = t.raw('items');
  const displayedItems = showAll ? faqItems : faqItems.slice(0, 3);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-16 sm:py-20 px-4 sm:px-6 relative scroll-mt-24 ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* العنوان */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="t-icon !w-14 !h-14 !rounded-2xl mb-5 mx-auto">
            <HelpCircle size={28} aria-hidden="true" />
          </span>
          
          <h2 className="text-[28px] sm:text-4xl font-extrabold text-ink mb-3">
            {t('title')}
          </h2>
          
          <p className="text-base sm:text-lg text-ink-2">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* الأسئلة */}
        <div className="space-y-3 mb-10">
          {displayedItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div
                className={`t-card transition-colors duration-300 ${
                  openIndex === index ? '!border-accent/40' : 'hover:!border-white/15'
                }`}
              >
                <div className="p-4 sm:p-6">
                  {/* السؤال */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    className={`w-full min-h-11 flex items-start justify-between ${isRTL ? 'text-right' : 'text-left'} group`}
                  >
                    <div className="flex-1">
                      <span className="t-chip mb-3">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ms-4 w-9 h-9 rounded-full t-raised flex items-center justify-center"
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-accent" />
                      ) : (
                        <Plus className="w-5 h-5 text-ink-2 group-hover:text-accent transition-colors" />
                      )}
                    </motion.div>
                  </button>

                  {/* الإجابة */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`pt-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <div className="t-rule mb-4" />
                          <p className="text-ink-3 leading-[1.9] text-sm sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* زرار عرض المزيد */}
        {!showAll && faqItems.length > 3 && (
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="btn btn-primary btn-lg"
            >
              <span>{t('viewAll')}</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* إحصائية الدعم الفني */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-6 t-glass px-8 py-3 rounded-full">
            <div className="text-center">
              <div className="num text-2xl font-extrabold text-accent" dir="ltr">24/7</div>
              <div className="text-sm text-ink-2">{t('technicalSupport')}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}