"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa6";

const faqs = [
  { question: "ما الخدمات التي تقدمها تميز؟", answer: "نقدم حلول برمجية متكاملة تشمل تطوير المواقع، تطبيقات الهواتف، الأنظمة الداخلية للشركات، وأدوات الأتمتة لتسهيل إدارة الأعمال." },
  { question: "ما الصناعات التي تخدمها تميز؟", answer: "نخدم مجموعة واسعة من الصناعات، بما في ذلك التجارة الإلكترونية، التعليم، الصحة، الخدمات المالية، واللي بتحتاج حلول برمجية مخصصة." },
  { question: "لماذا أختار تميز عن الشركات الأخرى؟", answer: "لأننا نركز على فهم احتياجات كل عميل ونقدم حلول مخصصة، مع التزامنا بالجودة، الأمان، والدعم المستمر." },
  { question: "كيف تضمن تميز جودة البرمجيات؟", answer: "نعتمد على اختبارات دقيقة لكل مشروع، مراجعات كود، وتحليل الأداء لضمان تطبيق سلس ومستقر." },
  { question: "هل تقدمون حلولاً مخصصة لكل عميل؟", answer: "نعم، كل مشروع يتم تصميمه وتنفيذه بناءً على متطلبات العميل الخاصة لضمان ملاءمته لأعماله." },
  { question: "ما تقنيات التطوير التي تستخدمها تميز؟", answer: "نستخدم أحدث تقنيات تطوير الويب والتطبيقات مثل React، Next.js، Node.js، و Tailwind CSS، بالإضافة إلى أدوات أتمتة حديثة." },
  { question: "كيف تتعامل تميز مع الأمن السيبراني؟", answer: "نطبق أفضل الممارسات في حماية البيانات، تشفير المعلومات، والحماية من الهجمات الإلكترونية لضمان أمان مشاريع عملائنا." },
  { question: "هل يمكنني الحصول على دعم وصيانة مستمرة لتطبيقي؟", answer: "نعم، نقدم خطط دعم وصيانة مستمرة لضمان استقرار التطبيق وتحديثه بانتظام." },
  { question: "كم يستغرق إتمام مشروع لدى تميز؟", answer: "مدة المشروع تعتمد على حجمه وتعقيد المتطلبات، لكننا نحرص على تقديم جدول زمني واضح ومحدد لكل عميل." },
  { question: "كيف أبدأ العمل مع تميز؟", answer: "يمكنك التواصل معنا عبر موقعنا أو الهاتف لتحديد استشارة أولية، ثم نقوم بتحليل احتياجاتك ووضع خطة المشروع." },
  { question: "ما تكلفة خدمات تميز؟", answer: "تختلف حسب نوع المشروع وحجمه، ونسعى دائمًا لتقديم حلول مناسبة للميزانية مع أعلى جودة." },
  { question: "هل يمكن لتميز دمج خدمات طرف ثالث في تطبيقي؟", answer: "نعم، يمكننا دمج أي خدمات أو أدوات خارجية حسب متطلبات مشروعك." },
  { question: "كيف يمكنني التواصل مع تميز؟", answer: "يمكنك الاتصال بنا عبر البريد الإلكتروني، الهاتف، أو نموذج التواصل على الموقع." },
  { question: "هل تقدم تميز استشارات قبل بدء المشروع؟", answer: "نعم، نوفر جلسات استشارية لتحديد احتياجاتك بدقة قبل البدء في التطوير." },
  { question: "كيف تضمن تميز السرية وأمان البيانات؟", answer: "نلتزم باتفاقيات السرية، ونطبق أحدث معايير حماية البيانات لحماية معلومات عملائنا." },
  { question: "هل يمكن لتميز مساعدة مشاريعي على التوسع والنمو؟", answer: "نعم، نصمم حلول قابلة للتوسع بحيث تدعم نمو أعمالك مستقبلًا بدون مشاكل تقنية." }
];

export default function page() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-center text-5xl font-bold mb-10">الأسئلة الشائعة</h2>
      <div className="grid md:grid-cols-3 gap-6 text-black">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              className="border rounded-xl shadow-md p-4 transform transition-all duration-300 bg-amber-400 hover:rotate-0"
              initial={{ rotate: -1 }}
              whileHover={{ rotate: 0 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left text-lg italic font-semibold focus:outline-none select-none"
              >
                <span>{faq.question}</span>
                <span className="ml-2">{isOpen ? <FaMinus /> : <FaPlus />}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-800 text-sm select-text"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
