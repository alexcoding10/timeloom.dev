'use client'

import Container from '@/components/Container'
import React from 'react'
import ListUserChat from './ListUserChat'

import ChatPrivate from './ChatPrivate';
import { useChat } from '@/hooks/useChat';
import { AnimatePresence, motion } from 'framer-motion';



export default function ChatView() {
  const {
    handlerSelectedUserChat,
    listSearchUser,
    searchUser,
    setSearchUser,
    userCurrentChat,
    listUserConnected,
    user
  } = useChat()


  return (
    <Container >
      <AnimatePresence>
        <div className="relative h-full w-full overflow-hidden">
          {
            userCurrentChat ? (
              <motion.div
                key="chat"
                className='absolute inset-0  w-full flex justify-center '
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <ChatPrivate
                  userCurrentChat={userCurrentChat}
                  user={user}
                  handlerSelectedUserChat={handlerSelectedUserChat}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                className='w-full flex justify-center'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}

              >
                <ListUserChat
                  listSearchUser={listSearchUser}
                  listUserConnected={listUserConnected}
                  searchUser={searchUser}
                  setSearchUser={setSearchUser}
                  handlerSelectedUserChat={handlerSelectedUserChat}
                />
              </motion.div>

            )
          }
        </div>
      </AnimatePresence>
    </Container>
  )
}
