import { NextApiRequest, NextApiResponse } from "next"
import { client as sanityClient } from "../../utils/sanityClient"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        // getting all users
        const data = await sanityClient.fetch(`*[_type == "user"]`)
        res.status(200).json(data)
    }
}

export default handler