import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPalette, 
  faCode, 
  faServer, 
  faHeadset, 
  faBug, 
  faShieldAlt 
} from "@fortawesome/free-solid-svg-icons";

export default function SecThree() {
  const arr = [
    { jobTitle: "مصمم UI/UX", index: 1, icon: faPalette },
    { jobTitle: "مطور واجهات أمامية", index: 2, icon: faCode },
    { jobTitle: "مطور خلفيات", index: 3, icon: faServer },
    { jobTitle: "أخصائي دعم فني", index: 4, icon: faHeadset },
    { jobTitle: "مهندس اختبارات", index: 5, icon: faBug },
    { jobTitle: "أخصائي أمن سيبراني", index: 6, icon: faShieldAlt },
  ];

  return (
    <>
      <h2 className="text-center text-5xl font-bold p-4 m-4">متخصصين في</h2>
      <div className="flex flex-row flex-wrap justify-center items-center ">
        {arr.map((item) => (
          <div
            key={item.index}
            className="relative flex flex-row justify-start items-start  
                       h-60 w-60 m-5  border-amber-300 overflow-hidden  "
          >
            {/* ✅ العنوان كخلفية */}
            <h4
              className="absolute inset-0 flex items-center justify-center 
                         text-white text-4xl font-extrabold opacity-40 
                         pointer-events-none text-center px-2"
            >
              {item.jobTitle}
            </h4>

            {/* ✅ الأيقونة فوق */}
            <FontAwesomeIcon
              icon={item.icon}
              className="relative z-20 text-6xl w-20 mt-5  text-yellow-300"
            />
          </div>
        ))}
      </div>
    </>
  );
}
