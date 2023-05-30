import { twMerge } from "tailwind-merge";
import {clsx} from "clsx";
export function cn(...input){
    return twMerge(clsx(...input))
}
export function chatHrefConstructor(id1, id2){
    const sortedIds = [id1, id2].sort()
    return `${sortedIds[0]}--${sortedIds[1]}`
}