"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  { question: "ما الخدمات التي تقدمها تميز؟", answer: "نقدم حلول برمجية متكاملة تشمل تطوير المواقع، تطبيقات الهواتف، الأنظمة الداخلية للشركات، وأدوات الأتمتة لتسهيل إدارة الأعمال." },
  { question: "ما الصناعات التي تخدمها تميز؟", answer: "نخدم مجموعة واسعة من الصناعات، بما في ذلك التجارة الإلكترونية، التعليم، الصحة، الخدمات المالية، واللي بتحتاج حلول برمجية مخصصة." }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4  rounded-xl">
      <h2 className="text-2xl  font-bold mb-4 text-center">الأسئلة الشائعة</h2>
      
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg shadow-md p-4 transform -rotate-1 hover:rotate-0 transition-all duration-300 bg-amber-300 text-black">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left text-lg italic font-semibold focus:outline-none"
          >
            {faq.question}
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-800 text-sm"
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="text-center mt-4">
        <Link href="/faqs" className="inline-block px-6 py-3 bg-amber-300 text-black  font-medium rounded-lg hover:bg-amber-400 transition-colors duration-300">
          شاهد كل الأسئلة
        </Link>
      </div>
    </div>
  );
}
