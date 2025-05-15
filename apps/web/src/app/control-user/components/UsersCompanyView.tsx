import React, { useEffect, useState } from 'react'
import type { UserControl } from '@/types/user'
import Avatar from '@/components/Avatar'
import RolesInfo from '@/components/RolesInfo'
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';


type Props = {
  usersByCompany: UserControl[]
}



export default function UsersCompanyView({ usersByCompany }: Props) {

  const [currentUserSelect, setCurrentUserSelect] = useState<UserControl | undefined>(undefined)


  const handlerSelectUser = (id: number) => {
    setCurrentUserSelect(usersByCompany.find(user => user.id === id))
  }
  const handlerDeselectUser = () => {
    setCurrentUserSelect(undefined)
  }

  return (
    <AnimatePresence>
      {
        !currentUserSelect ? (

          <motion.ul
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            exit={{ x: -10, opacity: 0 }}
          >
            {
              usersByCompany.map(user => (
                <li key={user.id} onClick={()=> handlerSelectUser(user.id)} className='grid  grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto]   px-4 py-2 border-b border-zinc-300  hover:bg-zinc-100 transition-all rounded duration-300 '>
                  {/*Seccion de info del usuario */}
                  <div className='flex flex-col sm:flex-row gap-2 sm:gap-5 items-center  transition-all duration-300'>
                    <Avatar name={user.name} url={user.imgProfile} />
                    <div>
                      <h1 className='font-semibold text-sm sm:text-base  transition-all duration-300'>{user.name}</h1>
                      <p className='text-secondary-500 text-sm  transition-all duration-300'>{user.email}</p>
                    </div>
                  </div>
                  <div className='flex items-center px-4 justify-center mt-2 sm:mt-0 sm:justify-between col-start-1 sm:col-start-2  transition-all duration-300'>
                    {user.globalRol.map(rol => (
                      <RolesInfo key={user.id} rol={rol.name} />
                    ))}
                  </div>
                  <div className='flex justify-center items-center text-zinc-400 col-start-2 row-start-1 row-span-2 px-4  text-2xl sm:px-0 sm:text-base sm:col-start-3 sm:row-start-1 sm:row-span-1  transition-all duration-300'>
                    <IoIosArrowForward />
                  </div>
                </li>
              ))
            }
          </motion.ul>
        ) : (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            exit={{ x: -10, opacity: 0 }}
          >
            <button onClick={handlerDeselectUser} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Ver todos los usuarios</button>
            Mostrar todos los datos del usuario {currentUserSelect.name}
          </motion.div>
        )
      }


    </AnimatePresence>
  )
}
