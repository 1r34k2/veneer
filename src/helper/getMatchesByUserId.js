import { fetchRedis } from "./redis"

export const getMatchesByUserId = async (userId) => {
    const matchesIds = await fetchRedis('smembers', `matches:${userId}`)
    const matches = await Promise.all(
        matchesIds.map(async (matchId) => {
            const match = await fetchRedis('get', `userId:${matchId}`)
            const profle = await fetchRedis('get', `profile:${matchId}`)
            return {account: JSON.parse(match), profile: JSON.parse(profle)}
        })
    )
    return matches
}

