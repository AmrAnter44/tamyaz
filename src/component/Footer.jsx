import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import { MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function Footer() {
  return <>
<div className='bg-black  text-center p-2 flex flex-col justify-center items-center gap-3 text-amber-300 border-t-4 mt-5 '>



      <h3 className='text-3xl text-white bold m-2'>قررت تاخد الخطوة ؟</h3>

      <a href='https://wa.me/201055119164' className="flex flex-row gap-1 bg-amber-300 text-gray-900 rounded-3xl p-2 hover:bg-transparent border hover:border-amber-300 hover:text-amber-300 transition duration-300 m-2 hover:scale-110">
      <FontAwesomeIcon icon={faWhatsapp} className='w-8' />
      <h2 className="items-center font-bold pt-1.5 pr-1">Contact us</h2>
      </a>


  {/* <Image src={logo} alt="Tamyaz" className='w-20' ></Image> */}


   <div className='flex flex-col lg:flex-row justify-center gap-3 lg:justify-between w-full m-6 px-4  text-xl'>


<div className='flex flex-row gap-6 lg:gap-4 text-center justify-center'>
<a className='hover:text-amber-100 hover:scale-110' href="mailto:tamyazcompany@gmail.com"><FontAwesomeIcon icon={faEnvelope} className='w-6' /></a>
<a className='hover:text-amber-100 hover:scale-110' href=""><FontAwesomeIcon icon={faFacebook} className='w-6 ' /></a>

<a className='hover:text-amber-100 hover:scale-110'  href="https://www.instagram.com/tamyazcompany/"><FontAwesomeIcon icon={faInstagram} className='w-6' /></a>
</div>


        <h3>Copyright &copy; 2023 Tmyaz</h3>


        </div>









    </div>
    
    </>
}
