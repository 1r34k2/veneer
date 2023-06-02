import { fetchRedis } from "@/helper/redis"
import { db } from "@/lib/db"

export async function POST(req){
    try{
        const body = await req.json()
        const {id1, id2} = body
        await db.sadd(`dislikes:${id1}`, `${id2}`)
        return new Response("OK", {status: 200})
    }
    catch(error){
        return new Response(error, {status: 500})
    }
}