'use client'
import { Loader2, LogOut } from "lucide-react"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { signOut } from "next-auth/react"
import Button from "./ui/Button"

const SignOutButton = function({...props}){
    const [isSignOut, setIsSignOut] = useState(false)
  return <Button {...props} variant='ghost' onClick={async () =>{
    setIsSignOut(true)
    try{
        await signOut()
    }catch(error){
        toast.error("Произошла ощибка при выходе.")
    } finally{
        setIsSignOut(false)
    }
  }}>
    {isSignOut ? (<Loader2 className='animate-spin h-4 w-4' />) : (<LogOut className='h-4 w-4' />)}
  </Button>
}

export default SignOutButton