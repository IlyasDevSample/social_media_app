import { NextApiRequest, NextApiResponse } from "next"
import { postDetailQuery } from "../../../utils/queries"
import { client as sanityClient } from "@/utils/sanityClient"
import { v4 as uuidv4 } from 'uuid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (req.method === "GET") {
        const postQuery = postDetailQuery(id as string);
        const postDetails = await sanityClient.fetch(postQuery);
        res.status(200).json(postDetails[0]);
    }
    else if (req.method === "PUT") {
        const { userId, comment } = req.body
        const { id } = req.query
        // adding the comment to the comment table
        const commentData = await sanityClient.create({
            _type: 'comment',
            commentText: comment,
            postedBy: {
                _type: 'reference',
                _ref: userId
            }
        })


        // adding the comment to the post
        await sanityClient.patch(id as string)
            .setIfMissing({ comments: [] })
            .append('comments', [{
                _type: 'reference',
                _ref: commentData._id,
                _key: uuidv4()

            }])
            .commit()

        const postQuery = postDetailQuery(id as string);
        const postDetails = await sanityClient.fetch(postQuery);
        res.status(200).json(postDetails[0]);



    }
}

export default handler;