
import Card from "@/components/Card"
import { getAllUsers } from "@/helper/getAllUsers"
import { fetchRedis } from "@/helper/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function page({}){
    const session = await getServerSession(authOptions)
    const id = await fetchRedis('get', `user:email:${session.user.email}`)
    const profiles = await getAllUsers(id)
  return <div className="w-full overflow-hidden bg-gradient-to-r flex justify-center from-indigo-500 to-pink-500 h-full">
    {profiles.map((profile) => {return <Card key={profile.id} user1={id} user2={profile.id} profile={profile.profile} percent={45}/>})}
  </div>
}
