import { db } from "@/lib/db"

export async function POST(req){
    const {session} = await req.json()
    db.del(`lastfm:${session.user.id}`)
    return new Response("OK", {status: 200})
}