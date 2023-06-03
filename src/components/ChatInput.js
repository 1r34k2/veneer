'use client'
import TextareaAutoSize from "react-textarea-autosize";
import { useRef, useState } from "react";
import Button from "./ui/Button";
import axios from "axios"
import toast from "react-hot-toast";
const ChatInput = function({name, chatId}){
    const textareaRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const sendMessage = async () => {
        setIsLoading(true)

        try{
            await axios.post('/api/message/send',{
                text: input,
                chatId: chatId
            }).then(()=>{
                setInput('')
                textareaRef.current.focus()
            })
            
        } catch(error){
            console.log(error)
            toast.error("Не удалось отправить сообщение.")
        }finally{
            setIsLoading(false)
        }
    }
  return <div className="border-t border-gray-2000 px-4 pt-4 mb-2 sm:mb-0">
    <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
      <TextareaAutoSize ref={textareaRef} onKeyDown={(e)=>{
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            sendMessage()
        }
      }} rows={1} value={input} onChange={(e)=>setInput(e.target.value)} placeholder={`Сообщение пользователю ${name}`} 
      className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:leading-6'
      />
      <div onClick={()=>{
          textareaRef.current.focus()
      }} className='py-2' aria-hidden='true'>
        <div className='py-px'>
            <div className="h-9" />     
        </div>
        </div>
        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrin-0">
                <Button isLoading={isLoading} onClick={sendMessage} type='submit'>Post</Button>
            </div>
        </div>
    </div>
  </div>
}

export default ChatInput