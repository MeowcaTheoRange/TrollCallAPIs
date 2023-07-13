import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { getSingleTroll } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, cookies, method, body } = req;
    if (method === "GET") {
        const user = await getSingleUser({
            name: query.user
        });
        if (user == null) return res.status(404).end();
        if (!compareCredentials(user, cookies)) {
            const thisUser = await getSingleUser({
                name: cookies.TROLLCALL_NAME
            });
            if (thisUser == null || !compareCredentials(thisUser, cookies))
                return res.status(403).end();
            if (!compareLevels(getLevel(thisUser), "MODERATOR"))
                return res.status(403).end();
        }
        const troll = await getSingleTroll({
            "name.0": query.troll,
            "owners.0": user._id
        });
        if (troll == null) return res.status(404).end();
        res.json(troll);
    }
}
