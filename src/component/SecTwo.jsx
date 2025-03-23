import React from 'react'
import logo from '../../public/logo.svg';
import Image from 'next/image';
export default function SecTwo() {
  return <>
  <div className='flex flex-col justify-center items-center text-center text-amber-300 text-2xl lg:text-3xl lg:container my-5 mx-auto'>








  <div className='container flex flex-row p-3 m-3 items-center justify-center text-4xl lg:text-5xl'>

 <p>نبذة عن</p>
 <Image src={logo} alt="Tamyaz" className='w-20' />
  </div>

  <div className='items-center justify-center'>
    <h3 className='p-3 m-3 text-3xl lg:text-4xl'>في تميز هنساعدك انك تبقي مميز رقميا 
        هنقدر نقدملك حلول تقنيه تساعدك في:
    </h3>
    <ol className='list-disc text-start lg:pr-4  m-2 '>
        <li className='p-1 m-1'><h4>العملاء تعرف عنك اكتر و عن اللي بتقدمة</h4></li>
        <li  className='p-1 m-1' ><h4>موقع احترافي مبني علي الهوية البصرية الخاصة بيك بأحدث الادوات </h4></li>
        <li className='p-1 m-1' ><h4>تصميم مميز مع كل التعديلات اللي هتطلبها</h4></li>
        <li  className='p-1 m-1' ><h4>هنقدر نحدث  اجهزة شركتك</h4></li>
    </ol>

  </div>
  
  
  
  </div>
  </>
}
