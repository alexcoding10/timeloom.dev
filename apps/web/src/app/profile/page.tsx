'use client'

import React from 'react'
import LayoutWithNav from '@/components/nav/LayoutWithNav'
import AuthGuard from '@/components/auth/AuthGuard'
import ProfileView from './components/ProfileView'

function Profile() {

  return (
    <AuthGuard>
      <LayoutWithNav>
        <ProfileView/>
      </LayoutWithNav>
    </AuthGuard>

  )
}

export default Profile