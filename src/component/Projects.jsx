"use client";
import React from 'react'
import Image from 'next/image'
import xgymImg from '../../public/projects/xgym.png'
import cartImg from '../../public/projects/cart.png'
import {faLink} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Projects() {

    



    const arr = [
        { name: 'xgym', img: xgymImg, link: 'https://xgym.website' },
        { name: 'cart', img: cartImg, link: 'https://fresh-cart-one.vercel.app/' },

      ]

      


  return <>
  <h2 className='text-center text-5xl font-bold p-4 m-4 '>المشاريع</h2>
  <div className='flex flex-row flex-wrap justify-center items-center gap-4 m-3 '>

  {
    arr.map((item)=>{
        return <div key={item.name} className=' relative pro w-90 p-1 hover:opacity-50 border-l-8 rounded-3xl border-amber-300 '>
            <a target='_blank' href={item.link} >
            <Image src={item.img} className='rounded-3xl' alt={item.name}></Image> 
            </a>
            <span className='prochild'><FontAwesomeIcon className='' icon={faLink} /></span>
        </div>
    })
  }

</div>
  


  </>
}
