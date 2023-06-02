import { fetchRedis } from "./redis"
import { db } from "@/lib/db"
//function to get all users from redis
export async function getAllUsers(id){
    const users = await db.keys('*')
    const people = []
    users.forEach(user => {
        if(user.includes("userId") && !user.includes(id)){
            people.push(user.split(":")[1])
        }
    })
    console.log(people)
    const cards = await Promise.all(
        people.map(async (personId) => {
            const profile = await fetchRedis('get', `profile:${personId}`)
            return {id: personId, profile: JSON.parse(profile)}
        })
    )
    return cards
}