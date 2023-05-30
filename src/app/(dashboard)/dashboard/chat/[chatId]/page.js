import { fetchRedis } from "@/helper/redis"
import { authOptions } from "@/lib/auth"
import { messageArrayValidator } from "@/lib/validators/message"
import { Trophy } from "lucide-react"
import { getServerSession } from "next-auth"
import { notFound } from 'next/navigation'

async function getChatMessages(chatId){
  try{
    const results = [] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)
    const dbMessages = results.map((message) => JSON.parse(message))
    const reverseDbMessages = dbMessages.reverse()
    const messages = messageArrayValidator.parse(reverseDbMessages)
    return messages
  } catch(error){
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
  const chatPartner = await (db.get(`user:${chatPartnerId}`))
  const initialMessages = await getChatMessages(chatId)

  return <div>page</div>
}

export default page