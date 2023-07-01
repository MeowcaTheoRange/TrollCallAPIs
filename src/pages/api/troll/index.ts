import { SubmitTrollToServerTroll } from "@/lib/trollcall/convert/troll";
import { compareCredentials } from "@/lib/trollcall/perms";
import { createTroll, getSingleTroll } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { SubmitTrollSchema } from "@/types/client/troll";
import { ServerTroll } from "@/types/troll";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method, cookies } = req;
    if (method === "POST") {
        let validatedTroll;
        try {
            validatedTroll = await SubmitTrollSchema.validate(body, {
                stripUnknown: true
            });
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkUser = await getSingleUser({
            name: cookies.TROLLCALL_NAME
        });
        if (checkUser == null) return res.status(404).end();
        if (!compareCredentials(checkUser, cookies))
            return res.status(403).end();
        const checkExistingTroll = await getSingleTroll({
            "name.0": validatedTroll.name[0],
            "owners": checkUser._id
        });
        if (checkExistingTroll != null) return res.status(409).end();
        // we are sure this object is full, so cast partial
        let serverTroll = SubmitTrollToServerTroll(validatedTroll) as Omit<
            ServerTroll,
            "_id"
        >;
        serverTroll.owners[0] = checkUser._id;
        const newTroll = await createTroll(serverTroll);
        if (newTroll == null) return res.status(503).end();
        res.json(newTroll);
    } else return res.status(405).end();
}
