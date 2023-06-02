'use client'
import { chatHrefConstructor } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const SideBarChatList = function({session,matches}){
    const [unseenMessages, setUnseenMessages] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if(pathname.includes('chat')){
            setUnseenMessages((prev)=>{
                return prev.filter((msg)=> !pathname.includes(msg.senderId))
            })
        }
    },[pathname])
  return (<ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {matches.sort().map((match) => {
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