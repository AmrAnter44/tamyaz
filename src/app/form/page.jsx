import React from 'react';

export default function Form() {
  return <>

      <h2 className='text-center text-5xl font-bold p-4 m-4' >Registration Form</h2> 
    <div className="flex  justify-center p-4">
      
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScSZa4T1yLUIQs-PpJTiKWZ5XHeAzGO4wAEBm4wgbui-zecJQ/viewform?embedded=true"
        width="500"
        height="1400"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        className="rounded shadow-lg"
      >
        Loading…
      </iframe>
    </div>
  </>
}
