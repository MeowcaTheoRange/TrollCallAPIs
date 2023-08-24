import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getManyPagedTrolls } from "@/lib/trollcall/troll";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const trolls = await getManyPagedTrolls(
            {},
            ServerTrollToClientTroll,
            5,
            page
        );
        console.log(trolls);
        if (trolls == null) return res.status(404).end();
        res.json(trolls);
    } else return res.status(405).end();
}
