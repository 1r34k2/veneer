'use client'
import { pusherClient } from "@/lib/pusher"
import { chatHrefConstructor, toPusherKey } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
const SideBarChatList = function({session, matches}){
    const [unseenMessages, setUnseenMessages] = useState([])
    const [activeChats, setActiveChats] = useState(matches)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`chat:${session.user.id}`))
        pusherClient.subscribe(toPusherKey(`match:${session.user.id}`))

        const matchHandler = (newMatch) => {
            setActiveChats((prev) => [...prev, newMatch])
        }
        const chatHandler = (data) => {
            const shouldNotify = pathname !== `/dashboard/chat/${chatHrefConstructor(session.user.id,data.senderId)}`

            if(!shouldNotify) return

            // toast.custom((t) => (
                
            // ))
        }

        pusherClient.bind(`new_message`, chatHandler)
        pusherClient.bind('new_match', matchHandler)

        return () =>{
            pusherClient.unsubscribe(toPusherKey(`chat:${session.user.id}`))
            pusherClient.unsubscribe(toPusherKey(`match:${session.user.id}`))
        }
    },[pathname, session.user.id, router])



    useEffect(() => {
        if(pathname.includes('chat')){
            setUnseenMessages((prev)=>{
                return prev.filter((msg)=> !pathname.includes(msg.senderId))
            })
        }
    },[pathname])
  return (<ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {activeChats.sort().map((match) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg)=>{
            return unseenMsg.senderId === match.account.id
        }).length
        return <li key={match.account.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(session.user.id,match.account.id)}`}
            className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                {match.profile.name}
                {unseenMessagesCount > 0 ? (
                    <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
                        {unseenMessagesCount}
                    </div>
                ): null}
            </a>
            </li>
    })}
  </ul>)
}

export default SideBarChatList