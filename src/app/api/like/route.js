import { fetchRedis } from "@/helper/redis"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import {toPusherKey} from "@/lib/utils"

export async function POST(req){
    try{
    const body = await req.json()
    const {id1, id2} = body
    const match = await fetchRedis('sismember',`likes:${id2}`,`${id1}`)
    if(match === 1){
        const rawProfile1 = await fetchRedis('get', `profile:${id2}`)
        const profile1 = JSON.parse(rawProfile1)
        const rawAccount1 = await fetchRedis('get', `userId:${id2}`)
        const account1 = JSON.parse(rawAccount1)
        const rawProfile2 = await fetchRedis('get', `profile:${id1}`)
        const profile2 = JSON.parse(rawProfile2)
        const rawAccount2 = await fetchRedis('get', `userId:${id1}`)
        const account2 = JSON.parse(rawAccount2)
        pusherServer.trigger(toPusherKey(`match:${id1}`), 'new_match', {
            account: account1,
            profile: profile1,
        })
        pusherServer.trigger(toPusherKey(`match:${id2}`), 'new_match', {
            account: account2,
            profile: profile2
        })
        await db.srem(`likes:${id2}`,`${id1}`)
        await db.sadd(`matches:${id1}`, `${id2}`)
        await db.sadd(`matches:${id2}`, `${id1}`)
        return new Response("OK", {status: 201})
    }
    else{
        await db.sadd(`likes:${id1}`,`${id2}`)
        return new Response("OK", {status: 200})
    }
    }
    catch(error){
        console.log(error)
        return new Response(error, {status: 500})
    }
}