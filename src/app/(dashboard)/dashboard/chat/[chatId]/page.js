import { fetchRedis } from "@/helper/redis"
import { authOptions } from "@/lib/auth"
import { messageArrayValidator } from "@/lib/validators/message"
import { getServerSession } from "next-auth"
import { notFound } from 'next/navigation'
import { db } from "@/lib/db"
import {ageFunc} from "@/lib/utils";
import ImageForChat from "@/components/ImageForChat"

async function getChatMessages(chatId){
  try{
    const results = [] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)
    const dbMessages = results.map((message) => JSON.parse(message))
    const reverseDbMessages = dbMessages.reverse()
    const messages = messageArrayValidator.parse(reverseDbMessages)
    return messages
  } catch(error){
    console.log(error)
    notFound()
  }
}
const page = async function({params}){
  const {chatId} = params
  const session = await getServerSession(authOptions)
  if(!session) notFound()
  

  const {user} = session

  const [userId1, userId2] = chatId.split('--')

  if(user.id !== userId1 && user.id !== userId2) notFound()

  const chatPartnerId = user.id === userId1 ? userId2 : userId1
  const chatPartner = await (db.get(`profile:${chatPartnerId}`))
  const initialMessages = await getChatMessages(chatId)

  return <div className='flex-1 justify-between flex flex-col h-full max-h-[100vh]'>
    <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
      <div className='relative flex items-center space-x-4'>
        <div className='relative'>
            <ImageForChat id={chatPartnerId}/>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-xl flex items-center">
            <span className='text-gray-700 mr-3 font-semibold'>{chatPartner.name},{ageFunc(chatPartner.dob)}</span>
          </div>
        </div> 
      </div>
    </div>
  </div>
}

export default page