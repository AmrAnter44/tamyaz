import React from 'react'
import Image from 'next/image';
import logo from '../../public/logo.svg';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function nav() {
  return (
    <nav className=" w-full  min-w-full h-screen border-b-4 border-amber-300">

    {/* خلفية الفيديو */}
    {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/bg.webm" type="video/webm" />
        <source src="/bg.mp4" type="video/mp4" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video> */}
         {/* <div className=" w-full h-full bg-black/50 text-amber-300"></div> */}


<div className="w-full p-6 flex justify-between items-center text-amber-300 ">
      <a href='https://wa.me/01055116491' className="flex flex-row gap-1 bg-amber-300 text-gray-900 rounded-3xl p-2 hover:bg-transparent border hover:border-amber-300 hover:text-amber-300 transition duration-300 m-2 hover:scale-110">
      <FontAwesomeIcon icon={faWhatsapp} className='w-8' />
      <h2 className="items-center font-bold pt-1.5 pr-1">Contact us</h2>
      </a>
  <h1 className="text-3xl font-bold">Tamyaz</h1>
  </div>




  <div className=" inset-0 flex flex-col items-center justify-center pt-9 mt-9 text-white text-center">
      <Image src={logo} alt="Tamyaz" className='w-60 fade-slide ' />
      <p className="mt-4 text-4xl  typing-effect ">التميز يبدأ بخطوة </p>
    </div>
  </nav>


    


);
}
  


