"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook للتحقق من ظهور العنصر
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return [targetRef, isInView];
};

// محتوى الفوتر
const footerContent = {
  ar: {
    decision: "قررت تاخد الخطوة ؟",
    register: "سجل الأن",
    copyright: "Copyright © 2023 Tmyaz",
    thankYou: "نشكركم لثقتكم بنا ونتطلع للعمل معكم قريباً"
  },
  en: {
    decision: "Ready to Take the Step?",
    register: "Register Now", 
    copyright: "Copyright © 2023 Tamyaz",
    thankYou: "Thank you for trusting us and we look forward to working with you soon"
  }
};

export default function OriginalFooter() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const content = footerContent[language];
  const isRTL = language === 'ar';

  return (
    <div className={`bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8 flex flex-col justify-center items-center gap-6 text-amber-300 border-t-4 border-amber-300 "
      >
        {/* العنوان الرئيسي */}
        <motion.h3 
          className="text-2xl lg:text-3xl text-white font-bold m-2"
          whileInView={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.6 }}
        >
          {content.decision}
        </motion.h3>

        {/* زرار التسجيل */}
        <motion.a           
          href="/form"           
          whileHover={{              
            scale: 1.05,             
            backgroundColor: "#fcd34d",             
            color: "#000",             
            boxShadow: "0 10px 30px rgba(252, 211, 77, 0.3)"           
          }}           
          whileTap={{ scale: 0.95 }}           
          className="flex items-center justify-center font-bold px-8 py-4 rounded-lg bg-transparent border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-300 mx-auto"         
        >           
          {content.register}         
        </motion.a>

        {/* معلومات التواصل والروابط */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-center gap-8 lg:justify-between w-full max-w-6xl m-6 px-4 text-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* روابط التواصل الاجتماعي */}
          <div className="flex flex-row gap-6 lg:gap-4 text-center justify-center">
            {[
              { 
                icon: Mail, 
                link: "mailto:tamyazcompany@gmail.com",
                hoverColor: "hover:text-blue-400"
              },
              { 
                icon: Facebook, 
                link: "#",
                hoverColor: "hover:text-blue-500"
              },
              { 
                icon: Instagram, 
                link: "https://www.instagram.com/tamyazcompany/",
                hoverColor: "hover:text-pink-400"
              },
              { 
                icon: MessageCircle, 
                link: "https://wa.me/201055119164",
                hoverColor: "hover:text-green-400"
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  rotate: [0, -10, 10, 0]
                }}
                whileTap={{ scale: 0.9 }}
                className={`${social.hoverColor} transition-all duration-300 p-3 rounded-full bg-gray-800 hover:bg-gray-700`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          {/* حقوق النشر */}
          <motion.h3
            className="text-sm lg:text-base self-center"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {content.copyright}
          </motion.h3>
        </motion.div>

        {/* خط الزخرفة */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "80%" } : { width: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full"
        />

        {/* نص إضافي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-gray-400 text-sm text-center max-w-md"
        >
          <p>
            {content.thankYou}
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
  );
}