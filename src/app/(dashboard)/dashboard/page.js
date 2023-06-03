
import Card from "@/components/Card"
import { getAllUsers } from "@/helper/getAllUsers"
import { fetchRedis } from "@/helper/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
const Percentage = (art1, art2) => {
  let d = 0, d1 = 0, d2 = 0, count = 0
  art1.forEach(element => {
    let el1 = element.split('~')
    art2.forEach(element1 => {
      let el2 = element1.split('~')
      if(el1[0] == el2[0]){
        d += Number(el1[1]) * Number(el2[1])
        d1 += Number(el2[1]) * Number(el2[1])
        d2 += Number(el1[1]) * Number(el1[1])
      }
    })
    count++
  });
  return Math.round((d/(Math.sqrt(d1)*Math.sqrt(d2))) * 100)
}
export default async function page({}){
    const session = await getServerSession(authOptions)
    const lastfmREST = await fetchRedis('get', `lastfm:${session.user.id}`)
    const lastfm = JSON.parse(lastfmREST)
    const profileREST = await fetchRedis('get', `profile:${session.user.id}`)
    const profile = JSON.parse(profileREST)
    if(!lastfm) return <div>Необходимо привязать Last.fm</div>
    if(!profile) return <div>Необходимо заполнить профиль</div>
    const usersRaw = [] = await getAllUsers(session.user.id)
    const users = usersRaw.filter(user => user !== undefined)
  return <div className="w-full overflow-hidden bg-gradient-to-r flex justify-center from-indigo-500 to-pink-500 h-full">
    {users.map((user) => { 
      return <Card key={user.id} user1={session.user.id} user2={user.id} profile={user.profile} percent={Percentage(user.lastfm.artists, lastfm.artists)}/>})}
  </div>
}
