import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";


export default function Loading() {
  return (
    <div className='animate-spin text-4xl text-secondary-500'>
        <AiOutlineLoading/>
    </div>
  )
}
