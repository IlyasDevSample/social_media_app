import type { NextApiRequest, NextApiResponse } from 'next'
import { client as sanityClient } from "@/utils/sanityClient";
import { v4 as uuidv4 } from 'uuid';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        // Process a PUT request

        const { userId, postId, like } = req.body;
        
        const data = like ? 
            await sanityClient.patch(postId)
                .setIfMissing({ likes: [] })
                .insert('after', 'likes[-1]', [ { _key: uuidv4(), _ref: userId } ])
                .commit()
            : 
            await sanityClient.patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();
        
    
        res.status(200).json(data)
    }
}