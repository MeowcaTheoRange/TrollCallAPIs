import { ClanGET } from "@/lib/trollcall/api/clan";
import { getManyPagedClans } from "@/lib/trollcall/clan";
import { ServerClanToClientClan } from "@/lib/trollcall/convert/clan";
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
                return thisClan;
            },
            5,
            page
        );
        if (clans == null) return res.status(404).end();
        res.json(clans);
    } else return res.status(405).end();
}
