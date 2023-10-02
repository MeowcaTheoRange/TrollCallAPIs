import { ClanGET } from "@/lib/trollcall/api/clan";
import { getSingleClan } from "@/lib/trollcall/clan";
import { ServerFlairToClientFlair } from "@/lib/trollcall/convert/flair";
import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getManyFlairs } from "@/lib/trollcall/flair";
import { getManyPagedTrolls } from "@/lib/trollcall/troll";
import { cutArray, cutObjectBlank } from "@/lib/trollcall/utility/merge";
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
        const clientClan = await ClanGET(null, clan);
        if (clientClan == null) return res.status(404).end();
        const trolls = await getManyPagedTrolls(
            {
                "owner": clan._id
            },
            async (troll: any) => {
                const thisTroll = await ServerTrollToClientTroll(troll);
                thisTroll.owner = clientClan;
                if (troll.flairs != null)
                    thisTroll.flairs = cutArray(
                        await getManyFlairs(
                            { _id: { $in: troll.flairs } },
                            ServerFlairToClientFlair
                        )
                    );

                return cutObjectBlank(thisTroll);
            },
            5,
            page
        );
        if (trolls == null) return res.status(404).end();
        res.json(trolls);
    } else return res.status(405).end();
}
