import LayoutWithNav from '@/components/nav/LayoutWithNav';
import { useAuthContext } from '@/context/AuthContext';
import { URL_BACKEND_DEV } from '@/utils/config';
import React, { useEffect } from 'react'


function DashBoard() {
    const { user } = useAuthContext();
    useEffect(() => {   
    }, [])
    if(!user){
        return <div>Loading...</div>
    }
    
  return (
    <LayoutWithNav>
        <div className='grid  grid-cols-[350px_1fr] grid-rows-3'>
            {/**Empresa actual */}
            <div className='flex flex-col items-center gap-2 rounded-3xl border-2 border-zinc-200 p-2 shadow-md'>
                <img 
                src={`${URL_BACKEND_DEV}${user.company.logoUrl}`} 
                alt="logo de la empresa" 
                className="w-20 h-20 object-cover rounded-full border-2 border-green-400 mb-2" />
                <p className="text-lg font-bold text-neutral-dark-400">{user.company.name}</p>
                <p className="text-base  text-neutral-dark-400">{user.company.email}</p>
                <p className="text-base  text-neutral-dark-400">{user.company.address}</p>
            </div>
        </div>
    </LayoutWithNav>
  )
}

export default DashBoard