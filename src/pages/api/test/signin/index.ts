import { getSingleClan } from "@/lib/trollcall/clan";
import { compareCredentials } from "@/lib/trollcall/perms";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, cookies, query, method } = req;
    if (method === "GET") {
        if (cookies.TROLLCALL_NAME == null)
            return res
                .status(403)
                .send("Can't authenticate (name is null, are you signed out?)");
        if (cookies.TROLLCALL_CODE == null)
            return res
                .status(403)
                .send("Can't authenticate (code is null, are you signed out?)");
        const checkClan = await getSingleClan({
            name: cookies.TROLLCALL_NAME
        });
        if (checkClan == null)
            return res
                .status(404)
                .send(
                    "Can't authenticate (can't find clan \"" +
                        cookies.TROLLCALL_NAME +
                        '")'
                );
        if (await compareCredentials(checkClan, cookies))
            return res
                .status(200)
                .send(
                    "Authenticated as " + checkClan.displayName ??
                        checkClan.name
                );
        else
            return res
                .status(403)
                .send(
                    "Can't authenticate (trying as " +
                        (checkClan.displayName ?? checkClan.name) +
                        ", check code?)"
                );
    } else return res.status(405).end();
}
