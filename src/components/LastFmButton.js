'use client'
import { redirect } from "next/navigation"
import axios from "axios"


import { Icons } from "./Icons"
const LastFmButton = function({lastfm,session}){
    function addLast(){
        location.href="https://www.last.fm/api/auth/?api_key=97bcf44c84e782f84ab4904e788a45a8&cb=https://ire4ka.online/dashboard/lastfm/tokenCallback"
    }
    async function delLast(){
        await axios.post('https://ire4ka.online/api/delLastfm', {
            session: session
        })
        location.href="/dashboard"
    }
  return <div className='cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold' onClick={lastfm ? delLast : addLast}>
  <span className="cursor-pointer text-gray-400 border-gray-200 group-hover:border-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">                                  
      <Icons.Music4 className="h-4 w-4" />
  </span>

  <span className=" cursor-pointer truncate">{lastfm ? "Отвязать Last.fm" : "Добавить Last.fm"}</span>
</div>
}

export default LastFmButton