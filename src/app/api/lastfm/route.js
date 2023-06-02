import { fetchRedis } from "@/helper/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth/next"

export async function POST(req){
    try{
        const body = await req.json()
        const {session,username, lastUpdate} = body
        
        if(!session) return new Response("Unauthorized", {status: 401})
        db.set(`lastfm:${session.user.id}`,JSON.stringify({username: username,lastUpdate: lastUpdate}))

        return new Response("OK", {status: 200})
    } catch(error){
        if(error instanceof Error){
            return new Response(error.message, {status: 500})
        }
    }
}