import Button from "@/components/ui/Button"
import { getServerSession } from "next-auth"
import { toast } from "react-hot-toast"
import LastfmButton from "@/components/LastfmButton"
import { fetchRedis } from "@/helper/redis"
export default async function page(){
    const session = await getServerSession()
    const id = await fetchRedis('get', `user:email:${session.user.email}`)
    const ifLast = await fetchRedis('get', `lastfm:${id}`)
    let flag = false
    ifLast ? flag = true : flag = false
    return (<>
        <LastfmButton ifLast={flag} session={session}/>
    </>)
  
}