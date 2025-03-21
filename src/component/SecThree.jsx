import React from 'react'

export default function SecThree() {

    const arr = [
        { jobTitle: "UI/UX Designer", index: 1 },
        { jobTitle: "Frontend Developer" , index: 2 },
        { jobTitle: "Backend Developer" , index: 3 },
        { jobTitle: "IT Support Specialist" , index: 4 },
        { jobTitle: "Testing Engineer" , index: 5 },
        { jobTitle: "Cybersecurity Specialist" , index: 6 },
    ];




  return <>
    <h2 className='text-center text-5xl font-bold p-4 m-4'>تيم تميز متخصص في</h2>
    <div className='flex flex-row flex-wrap justify-center items-center '>
  {
    arr.map((item)=>{

        return <div key={item.index} className=' rounded-full flex justify-center items-center h-30 m-5 bg-white gray text-shadow-lg border-b-16 border-amber-300 w-67'>

        <h4 className='text-xl font-bold p-1'>
            {item.jobTitle}
        </h4>
      </div>
    })
  }
  </div>
  </>
}
