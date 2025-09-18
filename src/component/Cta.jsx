"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const content = whatsappContent[language];
  const isRTL = language === 'ar';

  // إظهار المكون بعد اختفاء الـ navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollDirection(direction);
      
      // إظهار CTA بعد تمرير 100px وعندما يكون المستخدم يتمرر لأسفل
      if (currentScrollY > 100 && direction === 'down') {
        setIsVisible(true);
      } else if (currentScrollY < 50 || direction === 'up') {
        setIsVisible(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تشغيل التوسع تلقائياً بعد الظهور
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
        // إخفاء التوسع بعد 5 ثوان
        setTimeout(() => setIsExpanded(false), 5000);
      }, 2000);

      return () => clearTimeout(timer);
    }
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
            stiffness: 200,
            damping: 20,
            duration: 0.6 
          }}
          className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`}
        >
          <div className="relative">
            {/* الرسالة الموسعة */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4, type: "spring" }}
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

                    {/* سهم صغير */}
                    <div className={`absolute top-full ${isRTL ? 'left-8' : 'right-8'} w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-400`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* الزرار الرئيسي */}
            <motion.button
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white hover:bg-yellow-400 border-2 border-yellow-400 text-black hover:text-black rounded-full shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 overflow-hidden"
            >
              {/* الخلفية المتحركة */}
              <motion.div
                className="absolute inset-0 bg-yellow-400"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: '50%' }}
              />

              {/* المحتوى */}
              <div className="relative flex items-center gap-3 px-4 py-4">
                {/* أيقونة الواتساب */}
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 4 
                  }}
                >
                  <MessageCircle size={24} className="flex-shrink-0" />
                </motion.div>

                {/* النص بجانب الأيقونة */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`overflow-hidden whitespace-nowrap ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
                >
                  <span className="font-bold text-sm">
                    {content.mainText}
                  </span>
                </motion.div>
              </div>

              {/* تأثير النبضة */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-white rounded-full pointer-events-none"
              />
            </motion.button>

            {/* نقطة الإشعار النابضة */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-5 h-5 bg-yellow-400 border-2 border-black rounded-full shadow-lg`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}