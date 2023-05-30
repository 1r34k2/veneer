'use client'
import { chatHrefConstructor } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const SideBarChatList = function({session,matches}){
    const [unseenMessages, setUnseenMessages] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if(pathname?.includes('chat')){
            setUnseenMessages((prev)=>{
                return prev.filter((msg)=> !pathname.includes(msg.senderId))
            })
        }
    },[pathname])
  return (<ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {matches.sort().map((match) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg)=>{
            return unseenMsg.senderId === match.id
        }).length
        return <li key={match.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(session.user.id,match.id)}`}>hello</a>
            </li>
    })}
  </ul>)
}

export default SideBarChatList