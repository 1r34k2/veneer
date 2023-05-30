import { fetchRedis } from "./redis"

//function to get all users from redis
export async function ifLastfmConnected(session){
    const person = await fetchRedis('get', `lastfm:${session.user.id}`)
    return person !== null
}