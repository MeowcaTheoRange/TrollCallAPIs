import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getSingleTroll } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { Router } from "express";
import { NextApiRequest, NextApiResponse } from "next";

export const trollRouter = Router();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req;
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
    } else return res.status(405).end();
}
