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
          className={`fixed bottom-6 z-[9999] ${isRTL ? 'left-6' : 'right-6'} whatsapp-cta`}
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
                  <div className={`bg-black text-white px-4 py-3 rounded-xl shadow-2xl border-2 border-yellow-400 max-w-xs ${isRTL ? 'text-right' : 'text-left'}`}>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} text-gray-400 hover:text-white transition-colors`}
                    >
                      <X size={16} />
                    </button>
                    
                    <p className={`text-sm font-bold text-yellow-400 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                      {t('expandedText')}
                    </p>
                    <p className="text-xs text-gray-300">
                      {t('subText')}
                    </p>

                    <div className={`absolute top-full ${isRTL ? 'left-8' : 'right-8'} w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-400`} />
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
              className="group relative bg-white hover:bg-yellow-400 border-2 border-yellow-400 text-black rounded-full shadow-2xl transition-all duration-200"
            >
              <div className="relative flex items-center gap-3 px-4 py-4">
                <MessageCircle size={24} className="flex-shrink-0" />
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`overflow-hidden whitespace-nowrap ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
                >
                  <span className="font-bold text-sm">
                    {t('mainText')}
                  </span>
                </motion.div>
              </div>
            </motion.button>

            <div className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-4 h-4 bg-yellow-400 border-2 border-black rounded-full`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}