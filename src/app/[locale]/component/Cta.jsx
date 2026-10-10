"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function OptimizedWhatsAppCTA() {
  const t = useTranslations('whatsapp');
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const isRTL = locale === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      setIsExpanded(true);
      setTimeout(() => setIsExpanded(false),800);
    }, 400);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/201055119164', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.8 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.4 
          }}
          className={`fixed bottom-4 sm:bottom-6 z-[9999] ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} whatsapp-cta`}
          style={{ direction: 'ltr' }}
        >
          <div className="relative">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute bottom-20 ${isRTL ? 'left-0' : 'right-0'} mb-4`}
                >
                  <div className={`t-card !rounded-2xl text-ink ps-4 pe-9 py-3 shadow-2xl w-max max-w-[min(18rem,calc(100vw-3rem))] ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    <button
                      onClick={() => setIsExpanded(false)}
                      aria-label={isRTL ? 'إغلاق' : 'Close'}
                      className="absolute top-1.5 end-1.5 w-7 h-7 flex items-center justify-center rounded-full text-ink-2 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                    
                    <p className="text-sm font-bold text-accent mb-1">
                      {t('expandedText')}
                    </p>
                    <p className="text-xs text-ink-3">
                      {t('subText')}
                    </p>

                                      </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label={t('mainText')}
              className="group relative bg-accent text-on-accent rounded-full shadow-[0_14px_30px_-12px_rgba(248,222,4,0.6)] transition-all duration-200"
            >
              <div className="relative flex items-center gap-2.5 px-4 min-h-[52px]">
                <MessageCircle size={24} className="flex-shrink-0" />
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`overflow-hidden whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <span className="font-bold text-sm">
                    {t('mainText')}
                  </span>
                </motion.div>
              </div>
            </motion.button>

            <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-3.5 h-3.5 bg-[#6fd39a] border-2 border-[#0b0b0a] rounded-full`} aria-hidden="true" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}