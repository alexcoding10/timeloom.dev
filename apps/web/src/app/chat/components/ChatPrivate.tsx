import Avatar from '@/components/Avatar'
import { UserConnected } from '@/types/user'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CiPaperplane } from "react-icons/ci";
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading';


type Props = {
    userCurrentChat: UserConnected
    user: any //el usuario en si
    handlerSelectedUserChat: (userId?: number) => void
}

export default function ChatPrivate({
    userCurrentChat,
    user,
    handlerSelectedUserChat
}: Props) {


    const { socketRef } = useAuth()
    const bottomRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {

        if (!socketRef.current) return;

        socketRef.current.emit('get_history', { withUserId: userCurrentChat.userId });

        const handlerHistory = (history: any[]) => {
            console.log('Mi historial 🏥', history)
            setMessages(history);
            setLoading(false)
        };

        socketRef.current.on('history', handlerHistory);

        return () => {
            socketRef.current?.off('history', handlerHistory);
        };
    }, [userCurrentChat, socketRef.current]);

    useEffect(() => {
        if (!socketRef.current) return;

        const handlePrivateMessage = (message: {
            fromUserId: number;
            toUserId: number;
            message: string;
            timestamp: number;
        }) => {
            // Solo mostramos si el mensaje es con el usuario del chat actual
            const isChatActive =
                message.fromUserId === userCurrentChat.userId ||
                message.toUserId === userCurrentChat.userId;

            if (isChatActive) {
                setMessages(prev => [...prev, message]);
            }
        };

        socketRef.current.on('private_message', handlePrivateMessage);

        return () => {
            socketRef.current?.off('private_message', handlePrivateMessage);
        };
    }, [userCurrentChat, socketRef.current]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (text: string) => {

        if (!socketRef.current || !userCurrentChat) return;

        socketRef.current.emit('private_message', {
            toUserId: userCurrentChat.userId,
            message: text,
        });

        setMessages(prev => [...prev, {
            fromUserId: user.id,
            toUserId: userCurrentChat.userId,
            message: text,
            timestamp: Date.now(),
        }]);
    };



    return (
        <div className='grid grid-rows-[50px_1fr_50px] w-[350px] rounded-2xl overflow-hidden'>
            <div className='flex bg-blue-500 gap-3 items-center'>
                <button
                    onClick={() => handlerSelectedUserChat()}
                    className=' text-white pl-2'>
                    <MdOutlineArrowBackIosNew />
                </button>
                <Avatar
                    connected={userCurrentChat.connected}
                    url={userCurrentChat.img}
                    name={userCurrentChat.name}
                    width='w-10'
                />
                <h1 className='text-white'>{userCurrentChat.name}</h1>
            </div>

            <div className='bg-zinc-100 p-3 overflow-y-auto flex flex-col gap-2 hide-scrollbar'>
                {loading ? (
                    <Loading />
                ) : (
                    messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-2 rounded max-w-xs my-1 ${msg.fromUserId === user.id
                                ? 'bg-blue-400 text-white self-end'
                                : 'bg-gray-300 self-start'
                                }`}
                        >
                            {msg.message}
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>



            <div className='bg-blue-500 flex justify-center items-center'>
                <input
                    className='bg-zinc-50 w-full mx-5 rounded-lg outline-0 p-1 transition-all duration-300 ease-in'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage(input);
                            setInput('');
                        }
                    }}
                />


                <AnimatePresence>
                    {input.length !== 0 && (
                        <motion.button
                            key="send-button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className='w-10 h-8 flex justify-center items-center rounded-full bg-blue-700 text-white text-lg mr-5'
                            onClick={() => {
                                sendMessage(input);
                                setInput(''); // limpiar input después de enviar
                            }}
                        >
                            <CiPaperplane />
                        </motion.button>
                    )}
                </AnimatePresence>

            </div>


        </div>
    )
}
