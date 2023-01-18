import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method === 'GET') {
        const query = 'SELECT * FROM posts'
    }

}

export default handler