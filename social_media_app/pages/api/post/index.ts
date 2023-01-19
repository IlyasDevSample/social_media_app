import type { NextApiRequest, NextApiResponse } from 'next'
import { allPostsQuery } from "../../../utils/queries";
import { client as sanityClient} from "../../../utils/sanityClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method === 'GET') {
        const query = allPostsQuery();
        const posts = await sanityClient.fetch(query);
        res.status(200).json(posts);
    }

}

export default handler