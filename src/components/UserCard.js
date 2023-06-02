'use client'
import { useState, useEffect, useRef } from "react";
import { useTransform,useMotionValue, motion, AnimatePresence } from "framer-motion";
import {storage} from "@/firebase/";
import { getDownloadURL, ref } from "firebase/storage";
import {ageFunc} from "@/lib/utils";
export default function UserCard({user1, id, profile}) {
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${id}`)).then(url => {
        setImgUrl(url)
    }).catch(function(error){
        console.log(error)
    })
    const [infoVisible, setInfoVisible] = useState(false);
    
    const h1HandleClick = () => {
        setInfoVisible(!infoVisible);
    }
    return(
        <div 
         className="absolute h-96 w-72 mx-auto left:0 right:0 top-16 flex justify-center items-center flex-col" >
            <div className="absolute w-full h-full rounded-3xl">
                
                <div onClick={h1HandleClick} className="absolute flex flex-col items-center justify-center bottom-0 z-20 w-full h-1/5 bg-gradient-to-b from-transparent to-black rounded-b-3xl white ">
                    <h2 className=' text-center text-white bottom-6 left-4 text-xl cursor-default select-none' >{profile.name}, {ageFunc(profile.dob)}</h2>
                </div>
                
                <div className="absolute w-full h-4/5  rounded-3xl white">

                </div>
                <img className="absolute z-10 w-full h-full rounded-3xl pointer-events-none" src={imgUrl}/>
            </div>
            <AnimatePresence>
            {infoVisible && <motion.div transition={{duration: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute z-0 -bottom-40 w-full h-3/5 bg-white rounded-3xl">
                <div className="w-full h-3/5 rounded-3xl mt-16 p-5">
                    <h1 className="text-xl bold">О себе:</h1>
                    <p className="text-sm word-wrap">{profile.about}</p>
                </div>
                
            </motion.div>}
            </AnimatePresence>
            </div>
    )
}