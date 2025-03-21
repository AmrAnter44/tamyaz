import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faListCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";




              
export default function SecOne() {

    const arr = [
        {
            id:1,
            icon: faClock,
            head: "تميز بدأت في",
            mid: "2021"
        },
        {
            id:2,
            icon: faUser,
            head:  "شخص قرر التميز",
            mid: "+62"
        },
        {
            id:3,
            icon: faListCheck,
            head:   "مشاريع قيد التطوير",
            mid: "+8"
        },
        {
            id:4 ,
            icon: faLightbulb,
            head: "شركات تم خدمتها",
            mid: "+35"
        },
    ];
    return <>
        <div className='lg:flex flex-row justify-between lg:container mx-auto '>
            {arr.map((card) => (
                <div key={card.id} className="card bg-amber-300 text-gray-900 lg:w-1/5 p-4 m-8 flex flex-col justify-center items-center 
                rounded-3xl border-white gap-3 hover:bg-transparent border border-3xl lg hover:border-amber-300 hover:text-amber-300 
                 hover:my-6 hover:justify-start transition-all duration-400 cursor-pointer ease-in-out delay-150 hover:-translate-y-1">
                    <FontAwesomeIcon icon={card.icon} className='w-8 ' />
                    <h3 className='font-bold text-2xl ' >{card.head}</h3>
                    <p className='font-bold text-2xl ' >{card.mid}</p>
                </div>
            ))}
        </div>

        
        </>
}