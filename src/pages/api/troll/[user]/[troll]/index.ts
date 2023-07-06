import {
    MergeServerTrolls,
    ServerTrollToClientTroll,
    SubmitTrollToServerTroll
} from "@/lib/trollcall/convert/troll";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { changeTroll, getSingleTroll } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { PartialTrollSchema, SubmitTroll } from "@/types/client/troll";
import { Router } from "express";
import { NextApiRequest, NextApiResponse } from "next";

export const trollRouter = Router();

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
        const troll = await getSingleTroll({
            "name.0": query.troll,
            "owners.0": user._id
        });
        if (troll == null) return res.status(404).end();
        const serverTroll = await ServerTrollToClientTroll(troll);
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
        const checkUser = await getSingleUser({
            name: query.user
        });
        if (checkUser == null) return res.status(404).end();
        // Make sure to reverse methods so that way other owners can edit this troll
        if (!compareCredentials(checkUser, cookies)) {
            const thisUser = await getSingleUser({
                name: cookies.TROLLCALL_NAME
            });
            if (thisUser == null || !compareCredentials(thisUser, cookies))
                return res.status(403).end();
            console.log(getLevel(thisUser));
            if (!compareLevels(getLevel(thisUser), "MODERATOR"))
                return res.status(403).end();
        }
        const editingTroll = await getSingleTroll({
            "name.0": query.troll,
            "owners": checkUser._id
        });
        if (editingTroll == null) return res.status(404).end();
        const serverTroll = SubmitTrollToServerTroll(validatedTroll);
        const bothTrolls = MergeServerTrolls(editingTroll, serverTroll);
        const newTroll = await changeTroll(bothTrolls);
        if (newTroll == null) return res.status(503).end();
        res.json(newTroll);
    } else return res.status(405).end();
}
