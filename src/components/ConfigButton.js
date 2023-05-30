'use client'
import { Loader2, LogOut } from "lucide-react"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { signOut } from "next-auth/react"
import Button from "./ui/Button"

const LastfmButton = function({ifLast, ...props}){
    const [clicked, setClicked] = useState(false)
  return (<Button {...props} isLoading={clicked} onClick={async () =>{
        setClicked(true)
        try{
            location.href = "http://localhost:3000/dashboard/profile/redaction"
        }catch(error){
            toast.error("Произошла ошибка при отвязке учетной записи Last.fm.")
        } finally{
            setClicked(false)
        }
    }}>Редактировать профиль
  </Button>)
}

export default LastfmButton