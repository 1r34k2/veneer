'use client'
import { useState, useEffect, useRef } from "react";
import { useTransform,useMotionValue, motion, AnimatePresence } from "framer-motion";
import {storage} from "@/firebase/";
import { getDownloadURL, ref } from "firebase/storage";
import axios from "axios";
import { toast } from "react-hot-toast";
import {ageFunc} from "@/lib/utils";


async function like(id1,id2){
    await axios.post(`/api/like`,{
        id1,
        id2
    }).then((res)=>{
        if(res.status === 201){
            toast.success("У вас мэтч, переходи общаться!")
        }
    }).catch((err)=>{
        console.log(err)
    })
}
async function dislike(id1,id2){
    await axios.post(`/api/dislike`,{
        id1,
        id2
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}
export default function Card({user1, user2, profile, percent}) {
    const [imgUrl, setImgUrl] = useState("/grey.jpg")
    getDownloadURL(ref(storage, `images/${user2}`)).then(url => {
        setImgUrl(url)
    }).catch(function(error){
        console.log(error)
    })
    const [startX, setStartX] = useState(0);
    const [drag, setDrag] = useState(false);
    const [visible, setVisible] = useState(true);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opac1 = useTransform(x, [0, 200], [0, 1]);
    const opac2 = useTransform(x, [-200, 0], [1, 0]);
    const [infoVisible, setInfoVisible] = useState(false);
    
    const h1HandleClick = () => {
        setInfoVisible(!infoVisible);
    }
    const variants = {
        left: {x:-600,ease: "easeOut", opacity: 0},
        right: {x:600,ease: "easeOut", opacity: 0}
    }
    const [left, setLeft] = useState(false);
    return(
        <AnimatePresence>
        {visible && <motion.div 
         className="absolute h-96 w-72 mx-auto left:0 right:0 top-16 flex justify-center items-center flex-col"
         transition={{duration: 1, ease: "easeOut", dragSnapToOrigin: "false"}}
         drag = {true} style={{
                rotate,
                x,
                zIndex: 1,
            }} dragSnapToOrigin={true} dragMomentum={true} onDrag={(e) => {
                if(e.x - startX >= 250){
                    setLeft(false)
                }
                else if(e.x - startX <= -250){
                    setLeft(true)
                }
            }}
                whileDrag={{ cursor: "grabbing"}} onDragStart={(e) => {setStartX(e.x)
                setDrag(true)}} onDragEnd={
                (e) => {
                    if(e.x - startX >= 250){
                        setVisible(false)
                        like(user1,user2)
                    }
                    else if(e.x - startX <= -250){
                        setVisible(false)
                        dislike(user1,user2)
                    }
                    setDrag(false)
                }
            } variants={variants} exit={left ? "left" : "right" } >
            <div className="absolute w-full h-full rounded-3xl">
                <motion.div style={{opacity: opac1}} className="absolute bg-transparent top-10 z-20 right-5 text-4xl font-bold text-green-400 border-green-400 rounded-2xl border-8 px-1 rotate-45">
                    LIKE                
                </motion.div>
                <motion.div style={{opacity: opac2}} className="absolute bg-transparent top-10 z-20 left-5 text-red-500 border-red-500 text-4xl font-bold rounded-2xl border-8 px-1 -rotate-45">
                    NOPE               
                </motion.div>
                <div className="absolute flex flex-col items-center justify-center bottom-0 z-20 w-full h-1/5 bg-gradient-to-b from-transparent to-black rounded-b-3xl white ">
                    <h2 className=' text-center text-white bottom-6 left-4 text-xl cursor-default select-none' onClick={drag ? null : h1HandleClick }>{profile.name}, {ageFunc(profile.dob)}</h2>
                </div>
                <motion.div className="absolute w-full h-4/5  rounded-3xl white">

                </motion.div>
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
            </motion.div>} 
        </AnimatePresence>
    )
}