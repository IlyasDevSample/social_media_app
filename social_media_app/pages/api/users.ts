import { NextApiRequest, NextApiResponse } from "next"
import { client as sanityClient } from "../../utils/sanityClient"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        // getting all users
        sanityClient.fetch(`*[_type == "user"]`).then((users) => {
            res.status(200).json(users)
        })
    }
}

export default handler