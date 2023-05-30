'use client'
import { Loader2, LogOut } from "lucide-react"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { signOut } from "next-auth/react"
import Button from "./ui/Button"

const LastfmButton = function({ifLast, ...props}){
    const [clicked, setClicked] = useState(false)
  return (<>{ifLast ? 
    (<Button {...props} isLoading={clicked} onClick={async () =>{
        setClicked(true)
        try{
            location.href = "http://localhost:3000/lastfmDel"
        }catch(error){
            toast.error("Произошла ошибка при отвязке учетной записи Last.fm.")
        } finally{
            setClicked(false)
        }
    }}>Отвязать аккаунт Last.fm
  </Button>) : 
  (<Button {...props} isLoading={clicked} onClick={async () =>{
        setClicked(true)
        try{
            location.href = "https://www.last.fm/api/auth/?api_key=97bcf44c84e782f84ab4904e788a45a8&cb=http://localhost:3000/dashboard/lastfm/tokenCallback"
        }catch(error){
            toast.error("Произошла ошибка при привязке учетной записи Last.fm.")
        } finally{
            setClicked(false)
        }
    }}>
        Привязать аккаунт Last.fm
  </Button>)}</>)
}

export default LastfmButton