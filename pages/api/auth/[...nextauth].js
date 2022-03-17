import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        ,
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
          })
    ],

    pages:{
        signIn: '/auth/signin',
        join:'/join-us'
    },
    callbacks:{
        async session({session,token}){
            session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase()
            session.user.uid = token.sub
            return session
        }
        ,
        async signIn({ user, account }) {
            console.log(user,account);
            return true
          },
    },
    secret: process.env.JWT_SECRET,
})