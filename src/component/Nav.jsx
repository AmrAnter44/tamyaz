"use client";
import React, { useState, useEffect } from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 
        ${scrolled ? "bg-black/90 text-white shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* ✅ مكان فاضي للوجو */}
          <div className="w-[60px] h-[60px]" />

          {/* ✅ Links */}

            <a
              href="https://wa.me/201028418754"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold py-2 px-4 rounded-full transition ${
                scrolled ? "text-white" : "text-yellow-300"
              }`}
            >
              ابدأ الأن
            </a>

        </div>
      </nav>

      {/* ✅ الخلفية */}
      <section
        className={`w-full min-h-svh bg-[url('/imgBg.png')] bg-fixed bg-cover bg-center md:bg-top flex items-center justify-center border-b-4`}
      >
        <div className="w-full h-screen bg-black/60 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
          {/* ✅ Logo واحد متحرك بين النص والـ Navbar */}
          <motion.div
            initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 2 }}
            animate={
              scrolled
                ? { top: "20px", right: "80px", x: 0, y: 0, scale: 1 } // 👈 مكان اللوجو جوه Navbar
                : { top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 2 } // 👈 مكان اللوجو في النص
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed z-50"
          >
            <Image src={"logo.svg"} alt="Tamyaz" width={60} height={60} />
          </motion.div>


   {!scrolled && (
            <p className="mt-40 text-4xl text-white typing-effect">
              التميز يبدأ بخطوة
            </p>
          )}
        </div>
      </section>
    </>
  );
}
