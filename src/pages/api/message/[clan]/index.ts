import { getSingleClan } from "@/lib/trollcall/clan";
import { deleteMessage } from "@/lib/trollcall/message";
import { compareCredentials } from "@/lib/trollcall/perms";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method, cookies, query } = req;
    if (method === "DELETE") {
        if (query.clan == null || Array.isArray(query.clan))
            return res.status(400).end();
        const checkClan = await getSingleClan({
            name: cookies.TROLLCALL_NAME
        });
        if (checkClan == null) return res.status(404).end();
        if (!(await compareCredentials(checkClan, cookies)))
            return res.status(403).end();
        console.log(query.clan);
        const newMessage = await deleteMessage({
            _id: new ObjectId(query.clan)
        });
        if (newMessage == null) return res.status(503).end();
        res.json(newMessage);
    } else return res.status(405).end();
}
