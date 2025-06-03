'use client'

import Avatar from '@/components/Avatar'
import Loading from '@/components/Loading'
import { useAuthContext } from '@/context/AuthContext'
import useGetUsersByCompany from '@/hooks/useGetUsersByCompany'
import React, { useEffect, useState } from 'react'

type UserConnected = {
    userId: number,
    conected: boolean,
    name: string,
    img: string | null
}

export default function ListUserChat() {

    const { usersConnected } = useAuthContext()
    const { usersByCompany } = useGetUsersByCompany(usersConnected[0].companyId)

    const [listUserConnected, setListUserConnected] = useState<UserConnected[]>([])

    useEffect(() => {
        if (!usersConnected || !usersByCompany) return;
        // mapear los usuarios en listUser

        const users: UserConnected[] = usersByCompany.map(user => ({
            userId: user.id,
            name: user.name,
            img: user.imgProfile ?? null,
            conected: usersConnected.some((conn: { userId: number }) => conn.userId === user.id),
        }));

        setListUserConnected(users)
        console.log(users)

    }, [usersConnected, usersByCompany])

    if(!listUserConnected || listUserConnected.length === 0) <Loading/>


    return (
        <div className='w-[60%]'>
            {
                listUserConnected.map(user=>(
                    <div key={user.userId} className='flex items-center gap-3 p-4 border-b border-zinc-200 rounded-lg '>
                        <Avatar url={user.img} name={user.name} connected={user.conected}/>
                        <p className='font-semibold'>{user.name}</p>
                        
                    </div>
                ))
            }

        </div>
    )
}
