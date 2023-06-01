import Config from "@/components/Config"
import { fetchRedis } from "@/helper/redis"
import { getServerSession } from "next-auth"
import {storage} from "@/firebase/";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { authOptions } from "@/lib/auth"
export default async function page(){
  const session = await getServerSession(authOptions)
  const id = await fetchRedis('get', `user:email:${session.user.email}`)
  const profileREST = await fetchRedis('get', `profile:${id}`)
  const profile = JSON.parse(profileREST)
  return <Config id={id} profile={profile}></Config>
}
