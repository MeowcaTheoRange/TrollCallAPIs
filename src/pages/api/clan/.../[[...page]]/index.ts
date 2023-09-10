import { ClanGET } from "@/lib/trollcall/api/clan";
import { getManyPagedClans } from "@/lib/trollcall/clan";
import { ServerClanToClientClan } from "@/lib/trollcall/convert/clan";
import { ServerFlairToClientFlair } from "@/lib/trollcall/convert/flair";
import { getManyFlairs } from "@/lib/trollcall/flair";
import { cutArray } from "@/lib/trollcall/utility/merge";
import { ClientClan } from "@/types/clan";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const clans = await getManyPagedClans(
            {},
            async (clan: any) => {
                let thisClan = await ServerClanToClientClan(clan);
                thisClan = (await ClanGET(null, clan)) as ClientClan;
                thisClan.flairs = cutArray(
                    await getManyFlairs(
                        { _id: { $in: clan.flairs } },
                        ServerFlairToClientFlair
                    )
                );
                return thisClan;
            },
            5,
            page
        );
        if (clans == null) return res.status(404).end();
        res.json(clans);
    } else return res.status(405).end();
}
