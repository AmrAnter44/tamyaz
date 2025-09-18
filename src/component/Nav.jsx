"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

const content = {
  ar: { startNow: "ابدأ الأن", heroText: "التميز يبدأ بخطوة" },
  en: { startNow: "Start Now", heroText: "Excellence Starts With One Step" },
};

// Animation variants for scroll animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: "easeOut" }
};

// Custom hook for scroll-triggered animations (once only)
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // ✅ مرة واحدة بس - متختفيش تاني
    amount: 0.1,
    margin: "-50px 0px -50px 0px"
  });
  
  return [ref, isInView];
}

export default function EnhancedNavbar() {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for scroll animations
  const [heroRef, heroInView] = useScrollAnimation();
  const [logoRef, logoInView] = useScrollAnimation();
  const [textRef, textInView] = useScrollAnimation();

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useMemo(() => content[language], [language]);

  return (
    <main
      className={`${language === "ar" ? "rtl font-arabic" : "ltr"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Fixed Black Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 w-full z-40 bg-black/90 text-yellow-300 shadow-lg backdrop-blur-sm transition-all duration-500"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black font-bold transition-all"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Globe size={18} />
            <span>{language === "ar" ? "EN" : "AR"}</span>
          </motion.button>

          {/* Logo in Navbar (appears after scroll) */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: scrolled ? 1 : 0, 
              scale: scrolled ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
          </motion.div>

          {/* Start Now Button */}
          <motion.a
            href="/form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black font-bold transition-all"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.startNow}
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-screen bg-[url('/imgBg.png')] bg-cover bg-center flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
          {/* Main Logo (hides on scroll) */}
          <motion.div
            ref={logoRef}
            className="mb-8"
            {...scaleIn}
            animate={logoInView ? scaleIn.animate : scaleIn.initial}
          >
            <div className="w-[120px] h-[120px] mx-auto mb-6">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={120}
                priority
              />
            </div>
          </motion.div>
          
          {/* Hero Text */}
          <motion.div
            ref={textRef}
            className="space-y-8"
            {...fadeInUp}
            animate={textInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-yellow-400 typing-effect">
              {t.heroText}
            </h1>
            
            {/* Animated Arrow */}
            <motion.div
              className="text-yellow-400 text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { 
                opacity: 1, 
                y: [0, -10, 0] 
              } : { opacity: 0, y: 20 }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                y: { 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 1.2
                }
              }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}