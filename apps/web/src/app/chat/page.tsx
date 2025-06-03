import AuthGuard from '@/components/auth/AuthGuard'
import LayoutWithNav from '@/components/nav/LayoutWithNav'
import React from 'react'
import ChatView from './components/ChatView'

export default function Chat() {
    return (
        <AuthGuard>
            <LayoutWithNav>
                <ChatView/>
            </LayoutWithNav>
        </AuthGuard>
    )
}
