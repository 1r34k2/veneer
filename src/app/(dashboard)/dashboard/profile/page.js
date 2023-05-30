import UserCard  from "@/components/UserCard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { fetchRedis } from "@/helper/redis"
export default async function page({}){
    const session = await getServerSession(authOptions)
    const id = await fetchRedis('get', `user:email:${session.user.email}`)
    const profile = await fetchRedis('get', `profile:${id}`) 
  return <div className="w-full overflow-hidden bg-gradient-to-r flex justify-center items-center from-indigo-500 to-pink-500 h-full">
    <UserCard  >

    </UserCard>
    </div>
}
