import { getSingleClan } from "@/lib/trollcall/clan";
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
        const clan = await getSingleClan({
            name: query.clan
        });
        if (clan == null) return res.status(404).end();
        const trolls = await getManyPagedTrolls(
            {
                "owner": clan._id
            },
            ServerTrollToClientTroll,
            5,
            page
        );
        if (trolls == null) return res.status(404).end();
        res.json(trolls);
    } else return res.status(405).end();
}
