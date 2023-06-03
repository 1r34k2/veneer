'use client'
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/firebase"
import { useState } from "react"
import Image from "next/image"
const ImageForSideBarChat = function({id}){
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${id}`)).then(url => {
        setImgUrl(url)
    }).catch(function(error){
        console.log(error)
    })
  return <div>
    <div className='flex rounded-full overflow-hidden items-center justify-center h-6 w-6'>
            <Image
            width={900}
            height={1200}
            className=" w-6 h-8"
            referrerPolicy="no-referrer"
            src={imgUrl}
            />
          </div>
  </div>
}

export default ImageForSideBarChat