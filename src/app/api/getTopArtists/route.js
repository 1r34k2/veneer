import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { db } from '@/lib/db';
const getToday = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return mm + '/' + dd + '/' + yyyy 
}
export async function POST(req){
    const body = await req.json()
    const {session, user} = body
    const lastMethod = 'user.gettopartists'
    const api_key = '97bcf44c84e782f84ab4904e788a45a8'
    const parser = new XMLParser()
    const resu = await axios.get("http://ws.audioscrobbler.com/2.0",{
        params: {
            method:lastMethod,
            api_key:api_key,
            user: user,
            limit: 200,
            period: 'overall'
        }        
    }).catch(function(error){
    })
            let data = []
            const data1 = parser.parse(resu.data).lfm.topartists.artist
            data1.forEach(element => {
                data.push(element.name + '~' + element.playcount)
            })
            await db.del(`lastfm:${session.user.id}`)
            await db.set(`lastfm:${session.user.id}`, JSON.stringify({username:user, lastUpdate: getToday(), artists:data}))
            return new Response("OK", {status: 200})
    }