'use client'
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/firebase"
import { useState } from "react"
import Image from "next/image"
const ImageForLayout = function({id}){
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${id}`)).then(url => {
        setImgUrl(url)
    }).catch(function(error){
        console.log(error)
    })
  return <div>
    <div className='relative flex justify-center items-center rounded-full overflow-hidden w-9 h-9'>
            <Image
            width={300}
            height={400}
            className=" w-9 h-12"
            referrerPolicy="no-referrer"
            src={imgUrl}
            />
          </div>
  </div>
}

export default ImageForLayout