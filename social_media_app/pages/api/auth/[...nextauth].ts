import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { type } from "os"
import { client as sanityClient } from "../../../utils/sanityClient"

type User = {
    _id: string,
    userName: string,
    imageURL: string,
}
let userExists: User[] = [];
// server side
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

            // check if user exists in db
            userExists = await sanityClient
                .fetch(`*[_type == "user" && userName== "${email}"]{_id, userName, imageURL}`)

            // if not, create user and add to userExists array
            if (userExists.length === 0) {
                const res = await sanityClient.create({
                    _type: "user",
                    userName: email,
                    imageURL: image,
                })
                userExists.push({ _id: res._id, userName: res.userName as string, imageURL: res.imageURL as string })
            }

            return true
        },
        async jwt({ token, user }) {
            // add properties to token on sign in 

            if (userExists.length > 0) {
                // add provider user id to token
                token.id = userExists[0]._id
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