import type { NextApiRequest, NextApiResponse } from 'next'
import { client as sanityClient } from "@/utils/sanityClient";
import { v4 as uuidv4 } from 'uuid';




export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        // Process a PUT request
        const { userId, postId, like } = req.body;
        
    }
}