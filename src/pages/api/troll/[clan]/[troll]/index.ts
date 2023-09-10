import { TrollGET } from "@/lib/trollcall/api/troll";
import { getSingleClan } from "@/lib/trollcall/clan";
import {
    MergeServerTrolls,
    SubmitTrollToServerTroll
} from "@/lib/trollcall/convert/troll";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { changeTroll, getSingleTroll } from "@/lib/trollcall/troll";
import { PartialTrollSchema, SubmitTroll } from "@/types/client/troll";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, cookies, method, body } = req;
    if (method === "GET") {
        const troll = await TrollGET(
            {
                "name.0": query.troll
            },
            query.clan as string
        );
        if (troll == null) return res.status(404).end();
        res.json(troll);
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
        if (!(await compareCredentials(checkClan, cookies))) {
            const thisClan = await getSingleClan({
                name: cookies.TROLLCALL_NAME
            });
            if (
                thisClan == null ||
                !(await compareCredentials(thisClan, cookies))
            )
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
