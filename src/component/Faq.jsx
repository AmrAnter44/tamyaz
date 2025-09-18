"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
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
      },
      { 
        question: "كيف تتعامل تميز مع الأمن السيبراني؟", 
        answer: "نطبق أفضل الممارسات في حماية البيانات، تشفير المعلومات، والحماية من الهجمات الإلكترونية لضمان أمان مشاريع عملائنا.",
        category: "الأمان"
      },
      { 
        question: "هل يمكنني الحصول على دعم وصيانة مستمرة لتطبيقي؟", 
        answer: "نعم، نقدم خطط دعم وصيانة مستمرة لضمان استقرار التطبيق وتحديثه بانتظام.",
        category: "الدعم"
      },
      { 
        question: "كم يستغرق إتمام مشروع لدى تميز؟", 
        answer: "مدة المشروع تعتمد على حجمه وتعقيد المتطلبات، لكننا نحرص على تقديم جدول زمني واضح ومحدد لكل عميل.",
        category: "المواعيد"
      },
      { 
        question: "كيف أبدأ العمل مع تميز؟", 
        answer: "يمكنك التواصل معنا عبر موقعنا أو الهاتف لتحديد استشارة أولية، ثم نقوم بتحليل احتياجاتك ووضع خطة المشروع.",
        category: "البداية"
      },
      { 
        question: "ما تكلفة خدمات تميز؟", 
        answer: "تختلف حسب نوع المشروع وحجمه، ونسعى دائماً لتقديم حلول مناسبة للميزانية مع أعلى جودة.",
        category: "التكلفة"
      },
      { 
        question: "هل يمكن لتميز دمج خدمات طرف ثالث في تطبيقي؟", 
        answer: "نعم، يمكننا دمج أي خدمات أو أدوات خارجية حسب متطلبات مشروعك.",
        category: "التكامل"
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
      },
      { 
        question: "How does Tamyaz handle cybersecurity?", 
        answer: "We apply best practices in data protection, information encryption, and protection from cyber attacks to ensure the security of our clients' projects.",
        category: "Security"
      },
      { 
        question: "Can I get ongoing support and maintenance for my application?", 
        answer: "Yes, we provide ongoing support and maintenance plans to ensure application stability and regular updates.",
        category: "Support"
      },
      { 
        question: "How long does it take to complete a project at Tamyaz?", 
        answer: "Project duration depends on its size and complexity of requirements, but we ensure to provide a clear and specific timeline for each client.",
        category: "Timeline"
      },
      { 
        question: "How do I start working with Tamyaz?", 
        answer: "You can contact us through our website or phone to schedule an initial consultation, then we analyze your needs and develop a project plan.",
        category: "Getting Started"
      },
      { 
        question: "What is the cost of Tamyaz services?", 
        answer: "It varies according to the type and size of the project, and we always strive to provide budget-appropriate solutions with the highest quality.",
        category: "Pricing"
      },
      { 
        question: "Can Tamyaz integrate third-party services into my application?", 
        answer: "Yes, we can integrate any external services or tools according to your project requirements.",
        category: "Integration"
      }
    ]
  }
};

// متغيرات الأنيميشن
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function FAQSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const data = faqData[language];
  const isRTL = language === 'ar';

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedItems = showAll ? data.items : data.items.slice(0, 6);

  return (
    <section 
      id="faq-section"
      className={`px-6 bg-black relative ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300/10 rounded-full"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* العنوان */}
        <motion.div 
          className="text-center mb-16 mt-12"
          variants={cardVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-6 mx-auto"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle size={40} className="text-white" />
          </motion.div>
          
          <motion.h2 
            className={`text-4xl lg:text-5xl font-bold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}
            whileHover={{ scale: 1.02 }}
          >
            {data.title}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300"
            variants={cardVariants}
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        {/* الأسئلة في Grid Layout */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {displayedItems.map((faq, index) => (
              <motion.div
                key={`faq-${index}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group h-full"
              >
                <div 
                  className={`bg-gradient-to-r ${
                    openIndex === index 
                      ? 'from-yellow-400 to-yellow-500' 
                      : hoveredIndex === index
                      ? 'from-yellow-400/20 to-orange-500/20'
                      : 'from-gray-700 to-gray-800'
                  } p-1 rounded-2xl transition-all duration-300 h-full`}
                >
                  <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col">
                    {/* السؤال */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-start justify-between ${isRTL ? 'text-right' : 'text-left'} group flex-1`}
                    >
                      <div className="flex-1">
                        <span className={`inline-block text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full mb-3`}>
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
                          initial={{ opacity: 0, height: 0, y: -20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ 
                            duration: 0.4,
                            ease: "easeInOut"
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`pt-6 ${isRTL ? 'text-right' : 'text-left'}`}
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mb-4" />
                            <p className="text-gray-300 leading-relaxed text-sm">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
                onClick={() => {
                  setShowAll(true);
                  setOpenIndex(null);
                }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>{data.viewAll}</span>
                <motion.div
                  whileHover={{ y: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* زرار إخفاء الأسئلة الإضافية */}
        <AnimatePresence>
          {showAll && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAll(false);
                  setOpenIndex(null);
                  document.querySelector('#faq-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-gray-500 hover:to-gray-600"
              >
                <span>{data.hideAdditional}</span>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="rotate-180"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* إحصائية */}
        <motion.div
          variants={cardVariants}
          className="text-center"
        >
          <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-700/50 mb-12">

            <div className="w-px h-8 bg-gray-600" />

              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">{data.technicalSupport}</div>

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