"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faListCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function SecOne() {
  const arr = [
    { id: 1, icon: faClock, head: "تميز بدأت في", mid: 2021 },
    { id: 2, icon: faUser, head: "شخص قرر التميز", mid: 62 },
    { id: 3, icon: faListCheck, head: "مشاريع قيد التطوير", mid: 8 },
    { id: 4, icon: faLightbulb, head: "شركات تم خدمتها", mid: 35 },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true, // يشتغل مرة واحدة بس
    threshold: 0.2, // يبدأ لما 20% من العنصر يظهر
  });

  return (
    <>
      <div
        ref={ref}
        className="lg:flex flex-row justify-between lg:container mx-auto text-center "
      >
        {arr.map((card) => (
          <div
            key={card.id}
            className="card bg-amber-300 text-black lg:w-1/4 p-4 m-8 flex flex-col justify-center items-center 
              rounded-3xl border-wite gap-3 hover:bg-black border border-3xl  
              hover:border-amber-300 hover:text-amber-300 hover:my-6 hover:justify-start 
              transition-all duration-400 cursor-pointer ease-in-out border-l-10 border-black  
              delay-150 hover:-translate-y-1"
          >
            <FontAwesomeIcon icon={card.icon} className="w-8 " />
            <h3 className="font-bold text-2xl ">{card.head}</h3>
            <p className="font-bold text-2xl ">
              {inView && (
                <CountUp
                  start={1}
                  end={card.mid}
                  duration={3}
                  suffix={card.id !== 1 ? "+" : ""} // تضيف + لو مش التاريخ
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
