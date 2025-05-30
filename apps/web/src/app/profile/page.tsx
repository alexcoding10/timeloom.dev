'use client'

import React from 'react'

import LayoutWithNav from '@/components/nav/LayoutWithNav'
import { useAuthContext } from '@/context/AuthContext'
import Container from '@/components/Container'
import UserCard from '@/components/cards/UserCard'
import AuthGuard from '@/components/auth/AuthGuard'

function Profile() {
  const { user, setUser } = useAuthContext()

  return (
    <AuthGuard>

      <LayoutWithNav>
        <div className=' w-full flex justify-center'>
          <UserCard
            currentUser={user}
            setCurrentUser={setUser}
          />

        </div>
      </LayoutWithNav>
    </AuthGuard>

  )
}

export default Profile