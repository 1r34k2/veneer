import md5 from 'md5';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';    
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const getToday = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return mm + '/' + dd + '/' + yyyy 
}



export default async function page({params, searchParams}) {
    const token = searchParams.token
    const session = await getServerSession(authOptions)
    const api_key = '97bcf44c84e782f84ab4904e788a45a8'
    const method = 'auth.getSession'
    const secret = '632a627c6362bf165e2b61fa5211c060'
    const api_sig = md5('api_key'+api_key+'method'+method+'token'+token+secret)
    const parser = new XMLParser()
    const res = await axios.get("http://ws.audioscrobbler.com/2.0",{
        params: {
            method:method,
            api_key:api_key,
            token:token,
            api_sig:api_sig
        }        
    }
    ).catch(function(error){})
    if(res.data != undefined){
        await axios.post('https://ire4ka.online/api/lastfm',{
            session,
            username: parser.parse(res.data).lfm.session.name,
            lastUpdate: getToday()
        }).then(function(resp){
        }).catch(function(error){
            console.log(error)
        })
        await axios.post('https://ire4ka.online/api/getTopArtists',{
            session,
            user: parser.parse(res.data).lfm.session.name
        }).then(function(resp){
            
        })
    }
    redirect('/dashboard')
    
}