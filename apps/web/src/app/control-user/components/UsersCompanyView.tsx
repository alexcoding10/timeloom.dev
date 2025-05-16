import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useUserControlContext } from '@/context/UserControlContext';
import ListUserSCompany from './ListUserSCompany';


export default function UsersCompanyView() {

  const { currentUserSelect,handlerDeselectUser } = useUserControlContext()

  return (
    <AnimatePresence>
      {
        !currentUserSelect ? (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            exit={{ x: -10, opacity: 0 }}
          >
            {/*TODO:Buscador */}
            <ListUserSCompany />
          </motion.div>
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
