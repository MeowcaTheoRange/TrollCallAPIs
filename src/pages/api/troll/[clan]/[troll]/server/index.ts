import { getSingleClan } from "@/lib/trollcall/clan";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { getSingleTroll } from "@/lib/trollcall/troll";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, cookies, method, body } = req;
    if (method === "GET") {
        const clan = await getSingleClan({
            name: query.clan
        });
        if (clan == null) return res.status(404).end();
        if (!(await compareCredentials(clan, cookies))) {
            const thisClan = await getSingleClan({
                name: cookies.TROLLCALL_NAME
            });
            if (
                thisClan == null ||
                !(await compareCredentials(thisClan, cookies))
            )
                return res.status(403).end();
            if (!compareLevels(getLevel(thisClan), "MODERATOR"))
                return res.status(403).end();
        }
        const troll = await getSingleTroll({
            "name.0": query.troll,
            "owner": clan._id
        });
        if (troll == null) return res.status(404).end();
        res.json(troll);
    }
}
