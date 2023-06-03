import { fetchRedis } from "./redis"
import { db } from "@/lib/db"
//function to get all users from redis
export async function getAllUsers(id){
    const users = await db.keys('*')
    const matches = await fetchRedis('smembers', `matches:${id}`)
    const likes = await fetchRedis('smembers', `likes:${id}`)
    const dislikes = await fetchRedis('smembers', `dislikes:${id}`)
    const people = []
    users.forEach(user => {
        const userId = user.split(":")[1]
        if(user.includes("userId") && !user.includes(id) && !matches.includes(userId) && !likes.includes(userId) && !dislikes.includes(userId)){
            people.push(user.split(":")[1])
        }
    })
    const cards = await Promise.all(
        people.map(async (personId) => {
            const profile = await fetchRedis('get', `profile:${personId}`)
            const lastfm = await fetchRedis('get', `lastfm:${personId}`)
            if(!profile || !lastfm) return
            return {id: personId, profile: JSON.parse(profile), lastfm: JSON.parse(lastfm)}
        })
    )
    return cards
}