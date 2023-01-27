import { NextApiRequest, NextApiResponse } from "next"
import { client as sanityClient } from "@/utils/sanityClient"
import { userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/queries"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const query = `*[_type == "user" && _id == "${id}"]`
    const user = await sanityClient.fetch(query)
    
    if (user.length) {
        const userPosts = await sanityClient.fetch(userCreatedPostsQuery(id as string))
        const userLikedPosts = await sanityClient.fetch(userLikedPostsQuery(id as string))

        res.status(200).json({
                user: user[0],
                userPosts,
                userLikedPosts
            })
    } else {
        res.status(404).json({ message: "Not found" })
    }
}

export default handler