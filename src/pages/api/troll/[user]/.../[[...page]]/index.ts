import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getManyPagedTrolls } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const user = await getSingleUser({
            name: query.user
        });
        if (user == null) return res.status(404).end();
        const trolls = await getManyPagedTrolls(
            {
                "owners.0": user._id
            },
            ServerTrollToClientTroll,
            5,
            page
        );
        if (trolls == null) return res.status(404).end();
        res.json(trolls);
    } else return res.status(405).end();
}
