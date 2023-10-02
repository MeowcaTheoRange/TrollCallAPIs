import { ClanGET } from "@/lib/trollcall/api/clan";
import { ServerFlairToClientFlair } from "@/lib/trollcall/convert/flair";
import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getManyFlairs } from "@/lib/trollcall/flair";
import { getManyPagedTrolls } from "@/lib/trollcall/troll";
import { cutArray, cutObjectBlank } from "@/lib/trollcall/utility/merge";
import { ClientClan } from "@/types/clan";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const owners: { [key: string]: any } = {};

        const trolls = await getManyPagedTrolls(
            {},
            async (troll: any) => {
                const thisTroll = await ServerTrollToClientTroll(troll);
                let clientOwner;
                if (owners[troll.owner.toString()] != null)
                    clientOwner = owners[troll.owner.toString()];
                else {
                    clientOwner = (await ClanGET({
                        _id: troll.owner
                    })) as ClientClan;
                    if (clientOwner == null) return res.status(404).end();
                    owners[troll.owner.toString()] = clientOwner;
                }
                thisTroll.owner = clientOwner;
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
