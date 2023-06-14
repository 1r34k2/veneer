'use client'
import Button from "@/components/ui/Button"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Loader2, Mail } from "lucide-react"


const page = function({}){
    const [isLoading, setIsLoading] = useState(false)
    const { 
      register, handleSubmit
   } = useForm()
   async function onSubmit(data){
    console.log(data)
    loginWithEmail(data.email)
    
}
    async function loginWithGoogle(){
        setIsLoading(true)
        try {
            signIn("google")
        } catch (error) {
            toast.error("Что-то пошло не так")
        }
        setIsLoading(false)
    }
  
    async function loginWithEmail(email){
      setIsLoading(true)
      try {
          signIn("email", {email: email})
      } catch (error) {
          console.log(error)
          toast.error("Что-то пошло не так")
      }
      setIsLoading(false)
  }

  return <div className="bg-gradient-to-r from-indigo-500 to-pink-500 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold tracking-tight text-white">Мэтчи тебя уже заждались</h1>

    <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">
            
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Войти в аккаунт
            </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-8 mx-auto w-full">
        <input className="bg-gray-100 w-3/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required {...register("email")} type="text" placeholder="Email">

        </input>
        <Button 
        isLoading={isLoading}
        className=' mx-auto w-3/5'
        >{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : (<Mail className="mr-2 h-6 w-6"/>)}
          Войти с email
        </Button>
        </form>
        <hr className="w-full"></hr>
      
        <Button 
        isLoading={isLoading}
        className='mx-auto w-3/5'
        type='button'
        onClick={loginWithGoogle}
        >
        {isLoading ? <Loader2 className="mr-2 h- w-4 animate-spin"/> : (<svg
                className='mr-2 h-6 w-6'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='github'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
                <path d='M1 1h22v22H1z' fill='none' />
              </svg>)}
              Google
        </Button>
    </div>
    </div>
    
  </div>
}

export default page