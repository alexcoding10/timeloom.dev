'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useUserControlContext } from '@/context/UserControlContext';
import ListUserSCompany from './ListUserSCompany';
import { useGetUsersById } from '@/hooks/useGetUsersById';
import Loading from '@/components/Loading';
import UserCard from '@/components/cards/UserCard';
import ContractCard from '@/components/cards/ContractCard';
import SigningsCards from '@/components/cards/SigningsCards';

export default function UsersCompanyView() {

  const { currentUserSelect, handlerDeselectUser, updateUsersCompanyById } = useUserControlContext()
  const { user: currentUser, setUser: setCurrentUser, loading } = useGetUsersById(currentUserSelect?.id)

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
    }
  }, [currentUser])


  return (
    <AnimatePresence>
      {
        !currentUserSelect ? (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            exit={{ x: -10, opacity: 0 }}
            className='w-full flex justify-center '
          >
            {/*TODO:Buscador */}
            <ListUserSCompany />
          </motion.div>
        ) : loading ?
          <Loading />
          : (
            <div className='w-full px-10 '
            >
              <button onClick={handlerDeselectUser} className='bg-blue-500 text-white px-4 py-2 rounded-lg mb-3'>Ver todos los usuarios</button>

              {
                currentUser && (
                  <div className='flex flex-col justify-center items-center gap-5'>

                    <UserCard
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      updateUsersCompanyById={updateUsersCompanyById}
                    />

                    <ContractCard
                      contract={currentUser.contract[0]}
                    />

                    <SigningsCards
                      signings={currentUser.timeEntries}
                    />


                  </div>
                )
              }

            </div>
          )
      }


    </AnimatePresence>
  )
}
