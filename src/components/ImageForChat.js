'use client'
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/firebase"
import { useState } from "react"
import Image from "next/image"
const ImageForChat = function({id}){
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${id}`)).then(url => {
        setImgUrl(url)
    }).catch(function(error){
        console.log(error)
    })
  return <div>
    <div className='relative w-6 sm:w-10 h-8 sm:h-12'>
            <Image
            fill
            referrerPolicy="no-referrer"
            src={imgUrl}
            />
          </div>
  </div>
}

export default ImageForChat