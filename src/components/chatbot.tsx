import React from 'react'
import { BsMessenger } from "react-icons/bs";
function Chatbot() {
    return (
        <div style={{ zIndex: 500 }}>
            <span className="rounded-full w-2 h-2  text-brand-1"
            style={{backgroundColor: '03C9D7'}}
            />
            <BsMessenger className='text-3xl text-brand-1' />
        </div>
    )
}

export default Chatbot