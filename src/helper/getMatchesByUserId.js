import { fetchRedis } from "./redis"

export const getMatchesByUserId = async (userId) => {
    const matchesIds = await fetchRedis('smembers', `user:${userId}:matches`)
    const matches = await Promise.all(
        matchesIds.map(async (matchId) => {
            const match = await fetchRedis('get', `user:${matchId}`)
            return match
        })
    )
    return matches
}