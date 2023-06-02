'use client'
import { useState } from "react"
import {storage} from "@/firebase/";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "./ui/Button";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import axios from "axios";

const getToday = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear() - 18
    return yyyy + '-' + mm + '-' + dd
}

export default function Config({id, profile}){
    const [showSuccess, setShowSuccess] = useState(false)
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null);
    const { 
        register, handleSubmit
     } = useForm()
    async function onSubmit(data){
        editProfile(data.name, data.dob, data.gender, data.about)
    }
    async function editProfile(name, dob, gender, about){
        try{
            if(gender == "Выберите пол:"){
                toast.error("Выберите пол!")
                return
            }
            if(img){
                await uploadBytesResumable(ref(storage, `images/${id}`), img)
            }
            
            await axios.post('/api/profile/edit',{
                id,
                name,
                gender,
                dob,
                about
            })
            toast.success('Профиль успешно изменен!')
            
        }catch(error){
            if(error instanceof AxiosError){
                return
            }
        }
    }
    async function handleChange(e){
        if(e.target.files[0])[
            setImg(e.target.files[0])
        ]
    }
    getDownloadURL(ref(storage, `images/${id}`)).then(url => {
        setImgUrl(url)
        setLoading(false)
    }).catch(function(error){
        console.log(error)
        setLoading(false)
    })
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5">
    <div className="flex flex-row gap-4">
          <div className="relative h-96 w-72 flex items-center justify-center">
              {loading ? <Loader2 className='animate-spin mr-2 h-7 w-7' ></Loader2> : <Image  fill referrerPolicy="no-referrer" className=' h-96 w-72 rounded-3xl' alt={id} src={imgUrl} />}
          </div>
          <div className = "h-96 w-72 rounded-3xl p-6 bg-white">
            <div className ='max-w-sm flex flex-col gap-4 align-center'>
            <input required {...register("name")} placeholder="Имя в профиле" type='text' defaultValue={profile.name} className="block bg-gray-100 h-7 placeholder-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                
                <input required {...register("dob")} type='date' max={getToday()} defaultValue={profile.dob} className="block  bg-gray-100 h-7 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                <select defaultValue={profile.gender} required {...register("gender")} className="block px-3 py-0 bg-gray-100 h-7 w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option {...profile.gender === '' ? 'selected' : ''}>Выберите пол:</option>
                    <option {...profile.gender === 'Мужской' ? 'selected' : ''}>Мужской</option>
                    <option {...profile.gender === 'Женский' ? 'selected' : ''}>Женский</option>
                </select> 
                <textarea {...register("about")} placeholder="Информация о себе" defaultValue={profile.about} className="block bg-gray-100 h-32 resize-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">

                </textarea>
                <div className="flex flex-col">
                <label htmlFor="file-upload" className="block text-center text-sm font-medium text-gray-900 dark:text-gray-300">
                    Выберите картинку для профиля:
                </label>
                <input onChange={handleChange} accept="image/png, image/gif, image/jpeg" type='file' id='file-upload' className="block h-7 mt-2 text-gray-900 text-sm rounded-md border bg-gray-100 border-gray-300 cursor-pointer"  />
                </div>
            </div>
          </div>
          </div>
          <Button>Сохранить</Button>    
    </form>
          )  
              
}
