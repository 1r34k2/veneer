import { twMerge } from "tailwind-merge";
import {clsx} from "clsx";
export function cn(...input){
    return twMerge(clsx(...input))
}
export function chatHrefConstructor(id1, id2){
    const sortedIds = [id1, id2].sort()
    return `${sortedIds[0]}--${sortedIds[1]}`
}
export function ageFunc(dob){
    const dobArr = dob.split('-')
    const convDOB = new Date(dobArr[1] + "/" + dobArr[2] + "/" + dobArr[0])
    var month_diff = Date.now() - convDOB.getTime()
    var age_dt = new Date(month_diff)
    return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export function toPusherKey(key){
    return key.replace(/:/g, '__')
}