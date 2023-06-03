import { Icons } from "@/components/Icons"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound, redirect } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "@/components/SignOutButton"
import { getMatchesByUserId } from "@/helper/getMatchesByUserId"
import SideBarChatList from "@/components/SideBarChatList"
 import { fetchRedis } from "@/helper/redis"
import { db } from "@/lib/db"
import ImageForLayout from "@/components/ImageForLayout"
import axios from "axios"
import LastFmButton from "@/components/LastFmButton"



const Layout = async function({children}){
    const session = await getServerSession(authOptions)
    if(!session) notFound()
    const profileREST = await fetchRedis('get', `profile:${session.user.id}`)
    const profile = JSON.parse(profileREST)
    const lastfm = await fetchRedis('get', `lastfm:${session.user.id}`)
    if(lastfm){
        const {username, lastUpdate} = JSON.parse(lastfm)
        console.log((new Date() - new Date(lastUpdate))/(1000*60*60*24))
        if((new Date() - new Date(lastUpdate))/(1000*60*60*24) > 7){
            await axios.post('https://ire4ka.online/api/getTopArtists', {
              session: session,
              user: username
            })
          }
    }
    
    const sidebarOptions = [
        {
            id:1,
            name: "Профиль",
            href: "/profile",
            icon: 'Contact2'
        },
        {
            id:2,
            name:"Поиск людей",
            href:"/",
            icon: 'RectangleVertical'
        },
        {
            id:3,
            name:"Редактировать профиль",
            href:"/config",
            icon:"Pencil"
        }
    
    ]

    const match = await getMatchesByUserId(session.user.id)

  return (<div className='w-full flex h-screen'>
    <div className='relative z-20 flex h-full w-full max-w-xs frow flex-col gap-y- overflow-y-auto border-r border-gray-200 bg-white px-6'>
        <Link href='/dashboard' className='flex flex-row gap-2 h-16 shrink-0 items-center'>
            <Icons.Music4 className='h-8 w-auto text-indigo-700'/>
            <h2 className="text-2xl font-semibold text-black">Diplomacity</h2>
        </Link>
    
    
    <nav className='flex flex-1 flex-col'>
        <ul role='list' className="flex flex-1 flex-col gap-y-7">
            <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                    <ul role='list' className="-mx-2 mt-2 space-y-1">
                        {sidebarOptions.map((option) => {
                            const Icon = Icons[option.icon]
                            return(
                                <li key={option.id}>
                                    
                                    <Link href={`/dashboard${option.href}`}
                                    className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    >
                                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                                            <Icon className="h-4 w-4" />
                                        </span>

                                        <span className="truncate">{option.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li>
                            <LastFmButton lastfm={lastfm} session={session} />
                        </li>
                    </ul>
                    
                </div>
                </li>
                
                <li>
            {match.length > 0 ? (<div className='text-xs font-semibold leading-6 text-gray-400'>
                Твои пары
            </div>) : null }
                <SideBarChatList session={session} matches={match}/>
            </li>
                <li className="-mx-6 mt-auto flex items-center">
                    <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <ImageForLayout id={session.user.id} />
                        <span className='sr-only'>Your profile</span>
                        <div className='flex flex-col'>
                            <span aria-hidden='true'>{profile ? profile.name : null }</span>
                            <span className='text-xs text-zinc-400' aria-hidden='true'>
                                {session.user.email}
                            </span>
                        </div>
                    </div>
                    <SignOutButton className='h-full aspect-square'/>
                </li>
        </ul>
    </nav>
  </div>
  <div className="w-full overflow-hidden bg-gradient-to-r flex justify-center items-center from-indigo-500 to-pink-500 h-full">
    {children}
    </div>
  </div>
  )
}

export default Layout