import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import SpotifyProvider from 'next-auth/providers/spotify';

import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        }),
    ],
    secret: process.env.JWT_SECRET,

    // pages: {
    //     signIn: '/login'
    // },
    // callbacks: {
    //     async jwt({token, user}){
    //         if(user){
    //             token.accessToken = user.accessToken
    //             token._id = user._id
    //         }

    //         return token
    //     },
    //     async session({session, token}){
    //         if(token){
    //             session.user._id = token._id
    //             session.user.accessToken = token.accessToken
    //         }

    //         return session
    //     }
    // }
})

export {handler as GET, handler as POST}