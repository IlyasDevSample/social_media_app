import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { type } from "os"
import { client as sanityClient } from "../../../utils/sanityClient"

type User = {
    _id: string,
    userName: string,
    imageUrl: string,
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email, image } = user

            const userExists: User[] = await sanityClient
                .fetch(`*[_type == "user" && userName== "${email}"]{_id, userName, imageURL}`)

            if (userExists.length === 0) {
                const newUser = {
                    _type: 'user',
                    userName: email,
                    imageURL: image,
                }
                await sanityClient.create(newUser)
            }

            return true
        },
        async jwt({ token, user }) {
            // add properties to token on sign in 
            const userDb: User[] = await sanityClient
                .fetch(`*[_type == "user" && userName== "${user?.email}"]{_id, userName, imageURL}`)

            if (userDb.length > 0) {
                // add provider user id to token
                token.id = userDb[0]._id
            }
            return token
        },
        async session({ session, token }: any) {
            // add property to session from token
            session.user.id = token.id
            return session
        },
    }
})