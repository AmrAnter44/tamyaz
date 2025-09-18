"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Throttle function مدمجة
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const whatsappContent = {
  ar: {
    mainText: "تحدث معنا",
    subText: "احصل على استشارة مجانية",
    expandedText: "هل تحتاج مساعدة؟ تواصل معنا الآن!"
  },
  en: {
    mainText: "Chat with us",
    subText: "Get free consultation",
    expandedText: "Need help? Contact us now!"
  }
};

export default function FloatingWhatsAppCTA() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  
  const content = useMemo(() => whatsappContent[language], [language]);
  const isRTL = language === 'ar';

  // Hook محسن للسكرول
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollDirection(direction);
      
      // إظهار CTA بعد تمرير 100px وعندما يكون المستخدم يتمرر لأسفل
      if (currentScrollY > 100 && direction === 'down') {
        setIsVisible(true);
      } else if (currentScrollY < 50 || direction === 'up') {
        setIsVisible(false);
        setIsExpanded(false);
      }
      
      lastScrollY = currentScrollY;
    }, 16); // 60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تحسين التوسع التلقائي
  useEffect(() => {
    if (!isVisible) return;
    
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
      const collapseTimer = setTimeout(() => setIsExpanded(false), 4000);
      return () => clearTimeout(collapseTimer);
    }, 1500);

    return () => clearTimeout(expandTimer);
  }, [isVisible]);

  const handleWhatsAppClick = useCallback(() => {
    window.open('https://wa.me/201055119164', '_blank');
  }, []);

  const handleMouseEnter = useCallback(() => setIsExpanded(true), []);
  const handleMouseLeave = useCallback(() => setIsExpanded(false), []);

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
          className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`}
        >
          <div className="relative">
            {/* الرسالة الموسعة */}
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
                      {content.expandedText}
                    </p>
                    <p className="text-xs text-gray-300">
                      {content.subText}
                    </p>

                    <div className={`absolute top-full ${isRTL ? 'left-8' : 'right-8'} w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-400`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* الزرار الرئيسي */}
            <motion.button
              onClick={handleWhatsAppClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
                    {content.mainText}
                  </span>
                </motion.div>
              </div>
            </motion.button>

            {/* نقطة إشعار */}
            <div className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-4 h-4 bg-yellow-400 border-2 border-black rounded-full`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}