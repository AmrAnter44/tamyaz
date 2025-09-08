"use client";
import React, { useState, useEffect } from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  /* ✅ تغيير حالة الـ Navbar عند الـ Scroll */
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
        ${scrolled ? "bg-black/90 text-white shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-black">
          {/* ✅ Logo */}
          <Image src={"logo.svg"} alt="Logo" width={60} height={60} className="mr-6" />

          {/* ✅ Links */}
          <div className="flex gap-4 ">
            {/* زرار واتساب */}
            <a
              href="https://wa.me/201028418754"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold py-2 px-4 rounded-full transition ${scrolled ? "text-white" : "text-yellow-300"}`}
            >
         ابدأ الأن

            </a>


          </div>
        </div>
      </nav>

      {/* ✅ Section الخلفية تغطي الشاشة */}
      <section
        className={`w-full min-h-svh  bg-[url('/imgBg.png')] bg-fixed bg-cover bg-center md:bg-top flex items-center md:item-start justify-center md:justify-bottom border-b-4 `}
      >
        <div className="w-full h-screen bg-black/60 flex flex-col items-center justify-center text-center p-4">
  <div className=" inset-0 flex flex-col items-center justify-center pt-9 mt-9 text-white text-center">
      <Image src={"logo.svg"} width={60} height={60}  alt="Tamyaz" className='w-60 fade-slide ' />
      <p className="mt-4 text-4xl  typing-effect ">التميز يبدأ بخطوة </p>
    </div>
        </div>
      </section>
    </>
  );
}
