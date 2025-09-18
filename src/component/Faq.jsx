"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

// البيانات الكاملة
const faqData = {
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا",
    viewAll: "عرض جميع الأسئلة",
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

export default function OptimizedFAQSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const data = faqData[language];
  const isRTL = language === 'ar';

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedItems = showAll ? data.items : data.items.slice(0, 3);

  return (
    <section className={`py-20 px-6 bg-black relative ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* العنوان */}
        <motion.div 
          className="text-center mb-16"
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

        {/* الأسئلة */}
        <div className="space-y-4 mb-12">
          {displayedItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <div 
                className={`bg-gradient-to-r ${
                  openIndex === index
                    ? 'from-yellow-400 to-yellow-500' 
                    : 'from-gray-700 to-gray-800 hover:from-yellow-400/20 hover:to-yellow-500/20'
                } p-1 rounded-2xl transition-all duration-300`}
              >
                <div className="bg-gray-900 rounded-2xl p-6">
                  {/* السؤال */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full flex items-start justify-between ${isRTL ? 'text-right' : 'text-left'} group`}
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
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ${isRTL ? 'mr-4' : 'ml-4'}`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
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
          ))}
        </div>

        {/* زرار عرض المزيد */}
        {!showAll && data.items.length > 3 && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>{data.viewAll}</span>
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
          <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-700/50">
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