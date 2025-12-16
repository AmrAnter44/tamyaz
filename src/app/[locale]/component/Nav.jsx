"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

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

function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.1,
    margin: "-50px 0px -50px 0px"
  });
  
  return [ref, isInView];
}

export default function EnhancedNavbar() {
  const t = useTranslations('navbar');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroInView] = useScrollAnimation();
  const [logoRef, logoInView] = useScrollAnimation();
  const [textRef, textInView] = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <main
      className={`${locale === "ar" ? "rtl font-arabic" : "ltr"}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
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
            <span>{t('switchLanguage')}</span>
          </motion.button>

          {/* Logo in Navbar */}
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
  aria-label={t('cta')} // Add this
>
  {t('cta')}
</motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden pt-24"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={textRef}
              className={`space-y-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
              initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Main Heading */}
              <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${locale === 'ar' ? 'font-arabic' : ''}`}>
                <span className="text-white">{tHero('title')} </span>
                <span className="text-yellow-300">{tHero('titleHighlight')}</span>
                <span className="text-white"> {tHero('titleEnd')}</span>
              </h1>

              {/* Description */}
              <p className={`text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl ${locale === 'ar' ? 'font-arabic' : ''}`}>
                {tHero('description')}
              </p>

              {/* CTA Button */}
              <motion.a
                href={`/${locale}/form`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-yellow-300 text-black font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {tHero('cta')}
              </motion.a>
            </motion.div>

            {/* Right Side - 3D Illustration */}
            <motion.div
              ref={logoRef}
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={logoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md"
              >
                <Image
                  src="/logo.svg"
                  alt="Tamyaz Logo"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}