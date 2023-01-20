import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { allPostsQuery } from "../../../utils/queries";
import { client as sanityClient } from "../../../utils/sanityClient";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method === 'GET') {
        const query = allPostsQuery();
        const posts = await sanityClient.fetch(query);
        res.status(200).json(posts);
    } else if (method === 'POST') {

        const { caption, category, videoId } = req.body;
        const session = await getSession({ req })
        const user = session?.user as {email: string, name: string, image: string, id: string};

        if (!session) {
            return res.status(401).end('Unauthorized')
        }

        const post = {
            _type: 'post',
            caption,
            topic: category,
            video: {
                _type: 'file',
                asset: {
                    _ref: videoId,
                    _type: 'reference'
                }
            },
            userId: user?.id,
            postedBy: {
                _type: 'reference',
                _ref: user?.id,
            }
        }

        const result = await sanityClient.create(post);
        res.status(201).json(result);
    }

}

export default handler