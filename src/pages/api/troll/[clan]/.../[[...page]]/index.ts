import { ClanGET } from "@/lib/trollcall/api/clan";
import { getSingleClan } from "@/lib/trollcall/clan";
import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getManyPagedTrolls } from "@/lib/trollcall/troll";
import { ClientClan } from "@/types/clan";
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
            async (troll: any) => {
                const thisTroll = await ServerTrollToClientTroll(troll);
                thisTroll.owner = (await ClanGET({
                    _id: troll.owner
                })) as ClientClan;

                return thisTroll;
            },
            5,
            page
        );
        if (trolls == null) return res.status(404).end();
        res.json(trolls);
    } else return res.status(405).end();
}
