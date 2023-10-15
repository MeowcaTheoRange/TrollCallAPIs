import { createClan, getSingleClan } from "@/lib/trollcall/clan";
import { SubmitClanToServerClan } from "@/lib/trollcall/convert/clan";
import { compareLevels, getLevel } from "@/lib/trollcall/perms";
import { ServerClan } from "@/types/clan";
import { SubmitClanSchema } from "@/types/client/clan";
import { hash } from "argon2";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method } = req;
    if (method === "POST") {
        let validatedClan;
        try {
            validatedClan = await SubmitClanSchema.validate(body, {
                stripUnknown: true
            });
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkExistingClan = await getSingleClan({
            name: validatedClan.name
        });
        if (checkExistingClan != null) return res.status(409).end();
        // we are sure this object is full, so cast partial
        const serverClan = SubmitClanToServerClan(validatedClan) as Omit<
            ServerClan,
            "_id"
        >;
        if (serverClan.code == null) serverClan.code = nanoid(16);

        const currentcode = serverClan.code;

        // Encrypt code lole
        serverClan.code = (await hash(serverClan.code)).toString();

        if (
            serverClan.flairs != null &&
            !compareLevels(getLevel(serverClan), "SUPPORTER")
        ) {
            serverClan.bgimage = null;
            serverClan.css = null;
        }
        const newClan = await createClan(serverClan);
        if (newClan == null) return res.status(503).end();
        // Give cookies
        res.setHeader("Set-Cookie", [
            serialize("TROLLCALL_NAME", newClan.name, {
                path: "/",
                maxAge: 31540000
            }),
            serialize("TROLLCALL_CODE", currentcode, {
                path: "/",
                maxAge: 31540000
            })
        ]);
        res.json(newClan);
    } else return res.status(405).end();
}
