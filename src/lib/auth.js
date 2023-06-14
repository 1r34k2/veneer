import GoogleProvider from 'next-auth/providers/google'
import EmailProvider  from 'next-auth/providers/email'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import { fetchRedis } from '@/helper/redis'
export const authOptions = {
    adapter: UpstashRedisAdapter(db,{
        userKeyPrefix: "userId:"
    }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                  user: process.env.EMAIL_SERVER_USER,
                  pass: process.env.EMAIL_SERVER_PASSWORD
                },
                secure: true,
              },
            from: process.env.EMAIL_FROM,
          })
    ],
    session:{
        strategy: 'jwt',
    },
    pages:{
        signIn: '/',
        signOut: '/'
        },
    callbacks: {
        async jwt({token, user}){
            const dbUserResult = (await fetchRedis('get', `user:${token.id}`))

      if (!dbUserResult) {
        if (user) {
          token.id = user.id
        }

        return token
      }

      const dbUser = JSON.parse(dbUserResult) 
            return{
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image:dbUser.image
            }
        },
        async session({session, token}){
            if(token){
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image
            }

            return session
        },
        redirect(){
            return '/dashboard'
        }
    }
}