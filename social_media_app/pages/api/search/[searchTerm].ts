import { NextApiRequest, NextApiResponse } from "next";
import { client as sanityClient } from "@/utils/sanityClient"
import { searchPostsQuery } from "@/utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { searchTerm } = req.query;
    try {
        const posts = await sanityClient.fetch(searchPostsQuery(searchTerm as string));
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

    
}

export default handler;