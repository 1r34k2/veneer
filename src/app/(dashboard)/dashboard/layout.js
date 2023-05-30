import { Icons } from "@/components/Icons"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "@/components/SignOutButton"
import { getMatchesByUserId } from "@/helper/getMatchesByUserId"
import SideBarChatList from "@/components/SideBarChatList"

const sidebarOptions = [
    {
        id:1,
        name: "Профиль",
        href: "/profile",
        icon: 'Contact2'
    },
    {
        id:2,
        name:"Last.fm",
        href:"/lastfm",
        icon: 'Music4'
    },
    {
        id:3,
        name:"Поиск людей",
        href:"/",
        icon: 'RectangleVertical'
    }

]

const Layout = async function({children}){
    const session = await getServerSession(authOptions)
    if(!session) notFound()

    const matches = [] = await getMatchesByUserId(session.user.id)

  return (<div className='w-full flex h-screen'>
    <div className='relative z-20 flex h-full w-full max-w-xs frow flex-col gap-y- overflow-y-auto border-r border-gray-200 bg-white px-6'>
        <Link href='/dashboard' className='flex flex-row gap-2 h-16 shrink-0 items-center'>
            <Icons.Music4 className='h-8 w-auto text-indigo-700'/>
            <h2 className="text-2xl font-semibold text-black">Diplomacity</h2>
        </Link>
    
    {matches.length > 0 ? (<div className='text-xs font-semibold leading-6 text-gray-400'>
        Твои пары
    </div>) : null }
    <nav className='flex flex-1 flex-col'>
        <ul role='list' className="flex flex-1 flex-col gap-y-7">
            <li>
                <SideBarChatList session={session} matches={matches}/>
            </li>
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
                    </ul>
                    
                </div>
                </li>
                <li className="-mx-6 mt-auto flex items-center">
                    <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <div className='relative h-8 w-8 bg-gray-50'>
                            <Image fill referrerPolicy="no-referrer" className='rounded-full' src={session.user.image || ''} alt={session.user.name} />
                        </div>
                        <span className='sr-only'>Your profile</span>
                        <div className='flex flex-col'>
                            <span aria-hidden='true'>{session.user.name}</span>
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