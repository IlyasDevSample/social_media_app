import { NextApiRequest, NextApiResponse } from "next";
import { postDetailQuery } from "../../../utils/queries";
import { client as sanityClient } from "@/utils/sanityClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (req.method === "GET") {
        const postQuery = postDetailQuery(id as string);
        const postDetails = await sanityClient.fetch(postQuery);
        res.status(200).json(postDetails[0]);
    }
}

export default handler;