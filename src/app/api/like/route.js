import { fetchRedis } from "@/helper/redis"
import { db } from "@/lib/db"

export async function POST(req){
    try{
    const body = await req.json()
    const {id1, id2} = body
    const match = await fetchRedis('sismember',`likes:${id2}`,`${id1}`)
    if(match === 1){
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