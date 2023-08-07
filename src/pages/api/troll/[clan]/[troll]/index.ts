import { ClanGET } from "@/lib/trollcall/api/clan";
import { getSingleClan } from "@/lib/trollcall/clan";
import { ServerFlairToClientFlair } from "@/lib/trollcall/convert/flair";
import {
    MergeServerTrolls,
    ServerTrollToClientTroll,
    SubmitTrollToServerTroll
} from "@/lib/trollcall/convert/troll";
import { getManyFlairs } from "@/lib/trollcall/flair";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { changeTroll, getSingleTroll } from "@/lib/trollcall/troll";
import { cutArray } from "@/lib/trollcall/utility/merge";
import { ClientClan } from "@/types/clan";
import { PartialTrollSchema, SubmitTroll } from "@/types/client/troll";
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
        const troll = await getSingleTroll({
            "name.0": query.troll,
            "owner": clan._id
        });
        if (troll == null) return res.status(404).end();
        const serverTroll = await ServerTrollToClientTroll(troll);
        serverTroll.flairs = cutArray(
            await getManyFlairs(
                { _id: { $in: troll.flairs } },
                ServerFlairToClientFlair
            )
        );
        // we know this is not null, as we passed in our own clan
        serverTroll.owner = (await ClanGET(null, clan)) as ClientClan;
        res.json(serverTroll);
    } else if (method === "PUT") {
        let validatedTroll: Partial<SubmitTroll>;
        try {
            validatedTroll = (await PartialTrollSchema.validate(body, {
                stripUnknown: true
            })) as Partial<SubmitTroll>;
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkClan = await getSingleClan({
            name: query.clan
        });
        if (checkClan == null) return res.status(404).end();
        if (!compareCredentials(checkClan, cookies)) {
            const thisClan = await getSingleClan({
                name: cookies.TROLLCALL_NAME
            });
            if (thisClan == null || !compareCredentials(thisClan, cookies))
                return res.status(403).end();
            console.log(getLevel(thisClan));
            if (!compareLevels(getLevel(thisClan), "MODERATOR"))
                return res.status(403).end();
        }
        const editingTroll = await getSingleTroll({
            "name.0": query.troll,
            "owner": checkClan._id
        });
        if (editingTroll == null) return res.status(404).end();
        const serverTroll = SubmitTrollToServerTroll(validatedTroll);
        const bothTrolls = MergeServerTrolls(editingTroll, serverTroll);
        const newTroll = await changeTroll(bothTrolls);
        if (newTroll == null) return res.status(503).end();
        res.json(newTroll);
    } else return res.status(405).end();
}
