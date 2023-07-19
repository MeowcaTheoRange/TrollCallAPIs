import {
    MergeServerUsers,
    ServerUserToClientUser,
    SubmitUserToServerUser
} from "@/lib/trollcall/convert/user";
import {
    compareCredentials,
    compareLevels,
    getLevel
} from "@/lib/trollcall/perms";
import { changeUser, getSingleUser } from "@/lib/trollcall/user";
import { PartialUserSchema, SubmitUser } from "@/types/client/user";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, cookies, query, method } = req;
    if (method === "GET") {
        const user = await getSingleUser({
            name: query.user
        });
        if (user == null) return res.status(404).end();
        const serverUser = await ServerUserToClientUser(user);
        res.json(serverUser);
    } else if (method === "PUT") {
        let validatedUser: Partial<SubmitUser>;
        try {
            validatedUser = (await PartialUserSchema.validate(body, {
                stripUnknown: true
            })) as Partial<SubmitUser>;
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkExistingUser = await getSingleUser({
            name: query.user
        });
        if (checkExistingUser == null) return res.status(404).end();
        let isModerator = false;
        if (!compareCredentials(checkExistingUser, cookies)) {
            const thisUser = await getSingleUser({
                name: cookies.TROLLCALL_NAME
            });
            if (thisUser == null || !compareCredentials(thisUser, cookies))
                return res.status(403).end();
            if (!compareLevels(getLevel(thisUser), "MODERATOR"))
                return res.status(403).end();
            isModerator = true;
        }
        const serverUser = SubmitUserToServerUser(validatedUser);
        if (serverUser.code === "")
            serverUser.code = checkExistingUser.code || nanoid(16);
        if (!compareLevels(getLevel(checkExistingUser), "SUPPORTER")) {
            serverUser.bgimage = null;
            serverUser.css = null;
        }
        const bothUsers = MergeServerUsers(checkExistingUser, serverUser);
        const newUser = await changeUser(bothUsers);
        if (newUser == null) return res.status(503).end();
        // Give cookies, redundant style
        if (!isModerator)
            // don't set cookies if moderator is changing credentials
            res.setHeader("Set-Cookie", [
                serialize("TROLLCALL_NAME", newUser.name, {
                    path: "/",
                    maxAge: 31540000
                }),
                serialize("TROLLCALL_CODE", newUser.code, {
                    path: "/",
                    maxAge: 31540000
                }),
                serialize("TROLLCALL_PFP", newUser.pfp ?? "", {
                    path: "/",
                    maxAge: 31540000
                })
            ]).json(newUser);
        else res.json(newUser);
    } else return res.status(405).end();
}
