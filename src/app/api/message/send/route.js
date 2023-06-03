import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { fetchRedis } from "@/helper/redis"
import { nanoid } from "nanoid"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
export async function POST(req){
    try{
        const {text, chatId} = await req.json()
        const session = await getServerSession(authOptions)
        if(!session) return new Response('Unauthorized', {status: 401})

        const [userId1, userId2] = chatId.split('--')

        if(session.user.id !== userId1 && session.user.id !== userId2) return new Response('Unauthorized', {status: 401})

        const chatPartnerId = session.user.id === userId1 ? userId2 : userId1

        const chatPartnerOrNo = await fetchRedis('sismember',`matches:${session.user.id}`, chatPartnerId)

        if(chatPartnerOrNo === '0') return new Response('Unauthorized', {status: 401})

        const rawSender = await fetchRedis('get', `profile:${session.user.id}`)
        const sender = JSON.parse(rawSender)

        const timestamp = Date.now()

        const messageData = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp
        }
        pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', messageData)
        console.log('triggered')
        pusherServer.trigger(toPusherKey(`chat:${chatPartnerId}`), 'new_message', {
            ...messageData,
            name: sender.name
        })
        await db.zadd(`chat:${chatId}`,{
            score: timestamp,
            member: JSON.stringify(messageData)
        })
        return new Response('OK')
    }catch(error){
        console.log(error)
        return new Response('Internal Server Error', {status: 500})
    }
}