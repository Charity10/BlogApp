import NextAuth from "next-auth";

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'

import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
          }),

          SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
          }),

        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: {label: 'Email', type: 'text', placeholder: 'John Doe'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials){
                const {email, password} = credentials

                await db.connect()
                                
                const user = await User.findOne({ email })

                if(!user){
                    throw new Error("Invalid input")
                }

                const comparePass = await bcrypt.compare(password, user.password)

                if(!comparePass){
                    throw new Error("Invalid input")
                } else {
                    const {password, ...currentUser} = user._doc

                    const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})

                    return {
                        ...currentUser,
                        accessToken
                    }
                }
            }
        })
    ],

    secret: process.env.JWT_SECRET,

    pages: {
        signIn: '/login'
    },

    // ssession: {
    //     strategy: 'jwt',
    // },

    callbacks: {
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken
                token._id = user._id
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.accessToken = token.accessToken
            }

            return session
        }
    }
})

export {handler as GET, handler as POST}





// import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import SpotifyProvider from 'next-auth/providers/spotify';
// import CredentialsProvider from 'next-auth/providers/credentials'

// import User from "@/models/User";
// import { signJwtToken } from "@/lib/jwt";
// import bcrypt from 'bcrypt'
// import db from "@/lib/db";

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         }),
//         SpotifyProvider({
//             clientId: process.env.SPOTIFY_CLIENT_ID,
//             clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//         }),
//         CredentialsProvider({
//             type: 'credentials',
//             credentials: {
//                 username: {label: 'Email', type: 'text', placeholder: 'John Doe'},
//                 password: {label: 'Password', type: 'password'}
//             },
//             async authorize(credentials, req){
//                 const {email, password} = credentials

//                 await db.connect()
                                
//                 const user = await User.findOne({ email })

//                 if(!user){
//                     throw new Error("Invalid input")
//                 }

//                 // 2 parameters -> 
//                 // 1 normal password -> 123123
//                 // 2 hashed password -> dasuytfygdsaidsaugydsaudsadsadsauads
//                 const comparePass = await bcrypt.compare(password, user.password)

//                 if(!comparePass){
//                     throw new Error("Invalid input")
//                 } else {
//                     const {password, ...currentUser} = user._doc

//                     const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})

//                     return {
//                         ...currentUser,
//                         accessToken
//                     }
//                 }
//             }
//         })
//     ],
//     secret: process.env.JWT_SECRET,

//     // pages: {
//     //     signIn: '/login'
//     // },
//     // callbacks: {
//     //     async jwt({token, user}){
//     //         if(user){
//     //             token.accessToken = user.accessToken
//     //             token._id = user._id
//     //         }

//     //         return token
//     //     },
//     //     async session({session, token}){
//     //         if(token){
//     //             session.user._id = token._id
//     //             session.user.accessToken = token.accessToken
//     //         }

//     //         return session
//     //     }
//     // }
// })

// export {handler as GET, handler as POST}