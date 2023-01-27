import { NextApiRequest, NextApiResponse } from "next"
import { client as sanityClient } from "../../utils/sanityClient"
import { topicPostsQuery } from "../../utils/queries"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { topics } = req.query
        const posts = await sanityClient.fetch(topicPostsQuery(topics as string))
        res.status(200).json(posts)
    } 
}

export default handler