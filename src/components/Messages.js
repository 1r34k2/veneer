'use client'
import {useEffect, useRef, useState} from 'react';
import {cn, toPusherKey} from '@/lib/utils';
import format from 'date-fns/format';
import {getDownloadURL, ref} from 'firebase/storage';
import {storage} from '@/firebase/';
import Image from 'next/image';
import { pusherClient } from '@/lib/pusher';
const Messages = function({initialMessages, sessionId, otherId, chatId}) {
    const [img1, setImg1] = useState("/grey.jpg")
    const [img2, setImg2] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${sessionId}`)).then(url => {
        setImg1(url)
    }).catch(function(error){
        console.log(error)
    })
    getDownloadURL(ref(storage, `images/${otherId}`)).then(url => {
        setImg2(url)
    }).catch(function(error){
        console.log(error)
    })
    const formatTimestamp = (timestamp) => {
        return format((timestamp), 'HH:mm')
    }
    const [messages, setMessages] = useState(initialMessages)
    useEffect(()=>{
        pusherClient.subscribe(
            toPusherKey(`chat:${chatId}`)
        )
        const incomingMessageHandler = (message) => {
            setMessages((prev)=>[message, ...prev])
        }
        pusherClient.bind(
            'incoming-message', incomingMessageHandler 
        )
        
        return()=>{
            pusherClient.unsubscribe(
                toPusherKey(`chat:${chatId}`)
            )
            pusherClient.unbind(
                'incoming-message', incomingMessageHandler
            )
        }
    })
    const scrollDownRef = useRef(null);
  return <div id='messages' className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
    <div ref={scrollDownRef} />
    {messages.map((message, index)=>{
        const isCurrentUser = message.senderId === sessionId
        const hasNextMessageFromSameUser = messages[index-1]?.senderId === message.senderId
        return <div className='chat-message' key={`${message.id}-${message.timestamp}`}>
            <div className={cn('flex items-end', {'justify-end' : isCurrentUser})}>
                <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2',{
                    'order-1 items-end':isCurrentUser,
                    'order-2 items-start':!isCurrentUser
                })}
                >
                    <span className={cn('px-4 py-2 rounded-lg inline-block',{
                        'bg-indigo-600 text-white':isCurrentUser,
                        'bg-gray-200 text-gray-900':!isCurrentUser,
                        'rounded-br-none':!hasNextMessageFromSameUser && isCurrentUser,
                        'rounded-bl-none':!hasNextMessageFromSameUser && !isCurrentUser
                    })}>
                        {message.text}{' '}
                        <span className='text-xs ml-2 text-gray-400'>
                            {formatTimestamp(message.timestamp)}
                        </span>
                    </span>
                </div>
                <div className={cn('relative flex justify-center items-center rounded-full overflow-hidden w-6 h-6 ',{
                    'order-2':isCurrentUser,
                    'order-1':!isCurrentUser,
                    'invisible': hasNextMessageFromSameUser
                })}>
                <Image width={300} height={400} className="w-6 h-8" referrerPolicy="no-referrer" src={isCurrentUser ? img1 : img2} />
                </div>
            </div>
        </div>
    })}
    </div>
}   

export default Messages