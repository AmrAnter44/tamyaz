"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook محسن للIntersection Observer
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

// البيانات الكاملة
const faqData = {
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا",
    viewAll: "عرض جميع الأسئلة",
    hideAdditional: "إخفاء الأسئلة الإضافية",
    clientSatisfaction: "رضا العملاء",
    technicalSupport: "دعم فني",
    items: [
      { 
        question: "ما الخدمات التي تقدمها تميز؟", 
        answer: "نقدم حلول برمجية متكاملة تشمل تطوير المواقع، تطبيقات الهواتف، الأنظمة الداخلية للشركات، وأدوات الأتمتة لتسهيل إدارة الأعمال.",
        category: "خدمات"
      },
      { 
        question: "ما الصناعات التي تخدمها تميز؟", 
        answer: "نخدم مجموعة واسعة من الصناعات، بما في ذلك التجارة الإلكترونية، التعليم، الصحة، الخدمات المالية، واللي بتحتاج حلول برمجية مخصصة.",
        category: "الصناعات"
      },
      { 
        question: "لماذا أختار تميز عن الشركات الأخرى؟", 
        answer: "لأننا نركز على فهم احتياجات كل عميل ونقدم حلول مخصصة، مع التزامنا بالجودة، الأمان، والدعم المستمر.",
        category: "التميز"
      },
      { 
        question: "كيف تضمن تميز جودة البرمجيات؟", 
        answer: "نعتمد على اختبارات دقيقة لكل مشروع، مراجعات كود، وتحليل الأداء لضمان تطبيق سلس ومستقر.",
        category: "الجودة"
      },
      { 
        question: "هل تقدمون حلولاً مخصصة لكل عميل؟", 
        answer: "نعم، كل مشروع يتم تصميمه وتنفيذه بناءً على متطلبات العميل الخاصة لضمان ملاءمته لأعماله.",
        category: "التخصص"
      },
      { 
        question: "ما تقنيات التطوير التي تستخدمها تميز؟", 
        answer: "نستخدم أحدث تقنيات تطوير الويب والتطبيقات مثل React، Next.js، Node.js، و Tailwind CSS، بالإضافة إلى أدوات أتمتة حديثة.",
        category: "التقنيات"
      }
    ]
  },
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Answers to the most common questions about our services",
    viewAll: "View All Questions",
    hideAdditional: "Hide Additional Questions",
    clientSatisfaction: "Client Satisfaction",
    technicalSupport: "Technical Support",
    items: [
      { 
        question: "What services does Tamyaz provide?", 
        answer: "We provide integrated software solutions including website development, mobile applications, internal company systems, and automation tools to facilitate business management.",
        category: "Services"
      },
      { 
        question: "What industries does Tamyaz serve?", 
        answer: "We serve a wide range of industries, including e-commerce, education, healthcare, financial services, and those that need custom software solutions.",
        category: "Industries"
      },
      { 
        question: "Why choose Tamyaz over other companies?", 
        answer: "Because we focus on understanding each client's needs and provide customized solutions, with our commitment to quality, security, and ongoing support.",
        category: "Excellence"
      },
      { 
        question: "How does Tamyaz ensure software quality?", 
        answer: "We rely on rigorous testing for each project, code reviews, and performance analysis to ensure a smooth and stable application.",
        category: "Quality"
      },
      { 
        question: "Do you provide customized solutions for each client?", 
        answer: "Yes, each project is designed and implemented based on the client's specific requirements to ensure it fits their business.",
        category: "Customization"
      },
      { 
        question: "What development technologies does Tamyaz use?", 
        answer: "We use the latest web and application development technologies such as React, Next.js, Node.js, and Tailwind CSS, in addition to modern automation tools.",
        category: "Technology"
      }
    ]
  }
};

// مكون السؤال محسن
const FAQItem = React.memo(({ faq, index, isOpen, onToggle, isRTL }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.01, y: -3 }}
    className="group h-full"
  >
    <div 
      className={`bg-gradient-to-r ${
        isOpen 
          ? 'from-yellow-400 to-yellow-500' 
          : 'from-gray-700 to-gray-800 hover:from-yellow-400/20 hover:to-orange-500/20'
      } p-1 rounded-2xl transition-all duration-300 h-full`}
    >
      <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col">
        {/* السؤال */}
        <button
          onClick={onToggle}
          className={`w-full flex items-start justify-between ${isRTL ? 'text-right' : 'text-left'} group flex-1`}
        >
          <div className="flex-1">
            <span className="inline-block text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full mb-3">
              {faq.category}
            </span>
            <h3 className={`text-lg font-bold text-white group-hover:text-yellow-300 transition-colors leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {faq.question}
            </h3>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 ${isRTL ? 'mr-4' : 'ml-4'}`}
          >
            {isOpen ? (
              <Minus className="w-6 h-6 text-yellow-400" />
            ) : (
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            )}
          </motion.div>
        </button>

        {/* الإجابة */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className={`pt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mb-4" />
                <p className="text-gray-300 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
));

export default function OptimizedFAQSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const data = useMemo(() => faqData[language], [language]);
  const isRTL = language === 'ar';

  const toggleFAQ = useCallback((index) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  const displayedItems = useMemo(() => 
    showAll ? data.items : data.items.slice(0, 6), 
    [showAll, data.items]
  );

  return (
    <section 
      id="faq-section"
      className={`px-6 bg-black relative ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* خلفية متحركة مبسطة */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300/10 rounded-full"
            style={{
              width: Math.random() * 150 + 100,
              height: Math.random() * 150 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* العنوان */}
        <motion.div 
          className="text-center mb-16 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-6 mx-auto"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle size={40} className="text-white" />
          </motion.div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {data.title}
          </h2>
          
          <p className="text-xl text-gray-300">
            {data.subtitle}
          </p>
        </motion.div>

        {/* الأسئلة في Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedItems.map((faq, index) => (
            <FAQItem
              key={`faq-${index}`}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* زرار عرض المزيد */}
        <AnimatePresence>
          {!showAll && data.items.length > 6 && (
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>{data.viewAll}</span>
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* إحصائية - بدون رضا العملاء */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-700/50 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">{data.technicalSupport}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </section>
  );
}