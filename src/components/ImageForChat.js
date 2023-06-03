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
    <div className='relative flex justify-center items-center rounded-full overflow-hidden w-6 sm:w-12 h-6 sm:h-12'>
            <Image
            width={300}
            height={400}
            className=" w-6 h-8 sm:w-12 sm:h-16"
            referrerPolicy="no-referrer"
            src={imgUrl}
            />
          </div>
  </div>
}

export default ImageForChat