import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";


export default function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='animate-spin text-4xl text-secondary-500'>
        <AiOutlineLoading />
      </div>
    </div>
  )
}
