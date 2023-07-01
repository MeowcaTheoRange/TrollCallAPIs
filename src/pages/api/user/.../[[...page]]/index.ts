import { ServerUserToClientUser } from "@/lib/trollcall/convert/user";
import { getManyPagedUsers } from "@/lib/trollcall/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const users = await getManyPagedUsers(
            {},
            ServerUserToClientUser,
            5,
            page
        );
        if (users == null) return res.status(404).end();
        res.json(users);
    } else return res.status(405).end();
}
