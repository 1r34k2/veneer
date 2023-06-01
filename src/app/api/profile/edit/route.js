import { fetchRedis } from "@/helper/redis"
import {db} from "@/lib/db"

export async function POST(req){
    try{
        const body = await req.json()
        
        const {id, name, dob, gender, about} = body

        const profile = await fetchRedis('get', `profile:${id}`)

        const newProfile = {
            "name": name,
            "dob": dob,
            "gender": gender,
            "about": about
        }
        console.log(newProfile)
        await db.del(`profile:${id}`)
        await db.set(`profile:${id}`, JSON.stringify({name:newProfile.name, dob:newProfile.dob, gender:newProfile.gender, about:newProfile.about}))
        return new Response("OK", {status: 200})
    }catch(error){
        console.log(error)
        return new Response(error.message, {status: 500})
    }
}