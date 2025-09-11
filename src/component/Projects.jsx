"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import xgym from "../../public/projects/xgym.png";
import wnImg from "../../public/projects/wn.png";
import saif from "../../public/projects/saif.png";
import xfit from "../../public/projects/xfit.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Projects() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const arr = [
    { name: "Xgym", img: xgym, link: "https://xgym.website" },
    { name: "Saif", img: saif, link: "https://coachsaif.online" },
    { name: "Wn", img: wnImg, link: "https://wn-store-master.vercel.app/" },
    { name: "Xfit", img: xfit, link: "https://mustafa-three.vercel.app/" },
  ];

  return (
    <>
      <h2 className="text-center text-5xl font-bold p-4 m-4">أخر المشاريع</h2>
      <div className="w-full my-10 lg:py-14 pb-4">
        <Slider {...settings}>
          {arr.map((item) => (
            <div key={item.name} className="px-2">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
<div className="relative w-full h-80 lg:h-96 overflow-hidden   group rounded-3xl">
  <Image
    src={item.img}
    alt={item.name}
    fill
    className="object-cover group-hover:opacity-70 transition-all"
  />
  <span className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white">
    <FontAwesomeIcon className="w-4" icon={faLink} />
  </span>
</div>



              </a>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
