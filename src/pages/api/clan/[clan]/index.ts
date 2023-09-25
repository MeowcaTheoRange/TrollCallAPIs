import { ClanGET } from "@/lib/trollcall/api/clan";
import { changeClan, getSingleClan } from "@/lib/trollcall/clan";
import {
    MergeServerClans,
    SubmitClanToServerClan
} from "@/lib/trollcall/convert/clan";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { PartialClanSchema, SubmitClan } from "@/types/client/clan";
import { hash } from "argon2";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, cookies, query, method } = req;
    if (method === "GET") {
        const clan = await ClanGET({ name: query.clan });
        if (clan == null) return res.status(404).end();
        res.json(clan);
    } else if (method === "PUT") {
        let validatedClan: Partial<SubmitClan>;
        try {
            validatedClan = (await PartialClanSchema.validate(body, {
                stripUnknown: true
            })) as Partial<SubmitClan>;
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkExistingClan = await getSingleClan({
            name: query.clan
        });
        if (checkExistingClan == null) return res.status(404).end();
        let isModerator = false;
        if (!(await compareCredentials(checkExistingClan, cookies))) {
            const thisClan = await getSingleClan({
                name: cookies.TROLLCALL_NAME
            });
            if (
                thisClan == null ||
                !(await compareCredentials(thisClan, cookies))
            )
                return res.status(403).end();
            if (!compareLevels(getLevel(thisClan), "MODERATOR"))
                return res.status(403).end();
            isModerator = true;
        }
        const serverClan = SubmitClanToServerClan(validatedClan);
        if (serverClan.code == null)
            serverClan.code = checkExistingClan.code || nanoid(16);

        const currentcode = serverClan.code;

        // Encrypt code lole
        serverClan.code = await hash(serverClan.code);
        const bothClans = MergeServerClans(checkExistingClan, serverClan);
        if (
            bothClans.flairs == null ||
            !(
                bothClans.flairs != null &&
                compareLevels(getLevel(checkExistingClan), "SUPPORTER")
            )
        ) {
            bothClans.bgimage = null;
            bothClans.css = null;
        }
        if (bothClans.bgimage === "") bothClans.bgimage = null;
        if (bothClans.css === "") bothClans.css = null;

        const newClan = await changeClan(bothClans);
        if (newClan == null) return res.status(503).end();
        // Give cookies, redundant style
        if (!isModerator)
            // don't set cookies if moderator is changing credentials
            res.setHeader("Set-Cookie", [
                serialize("TROLLCALL_NAME", newClan.name, {
                    path: "/",
                    maxAge: 31540000
                }),
                serialize("TROLLCALL_CODE", currentcode, {
                    path: "/",
                    maxAge: 31540000
                })
            ]).json(newClan);
        else res.json(newClan);
    } else return res.status(405).end();
}
