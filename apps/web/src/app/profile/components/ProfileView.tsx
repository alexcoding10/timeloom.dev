'use client'

import ContractCard from '@/components/cards/ContractCard'
import UserCard from '@/components/cards/UserCard'
import Loading from '@/components/Loading'
import { useAuthContext } from '@/context/AuthContext'
import { useContract } from '@/hooks/useContract'
import React from 'react'

export default function ProfileView() {

    const { user, setUser } = useAuthContext()
    const { contract } = useContract(user?.id)
    
    return (
        <div className=' w-full flex flex-col gap-5 justify-center items-center'>

            <UserCard
                currentUser={user}
                setCurrentUser={setUser}
            />

            {
                contract ? (
                    <ContractCard
                        editable={false}
                        contract={contract}
                    />

                ) : (
                    <Loading />
                )
            }



        </div>
    )
}
