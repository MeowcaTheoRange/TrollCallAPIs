import { MergeServerUsers, ServerUserToClientUser, SubmitUserToServerUser } from "@/lib/trollcall/convert/user";
import { changeUser, getSingleUser } from "@/lib/trollcall/user";
import { PartialUserSchema, SubmitUser } from "@/types/client/user";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            validatedUser = (await PartialUserSchema.validate(body)) as Partial<SubmitUser>;
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkExistingUser = await getSingleUser({
            name: query.user
        });
        if (checkExistingUser == null) return res.status(404).end();
        if (checkExistingUser.code !== cookies.TROLLCALL_CODE || checkExistingUser.name !== cookies.TROLLCALL_NAME)
            return res.status(403).end();
        const serverUser = SubmitUserToServerUser(validatedUser);
        const bothUsers = MergeServerUsers(checkExistingUser, serverUser);
        const newUser = await changeUser(bothUsers);
        if (newUser == null) return res.status(503).end();
        // Give cookies, redundant style
        res.setHeader("Set-Cookie", [
            serialize("TROLLCALL_NAME", newUser.name, { path: "/", maxAge: 31540000 }),
            serialize("TROLLCALL_NAME", newUser.code, { path: "/", maxAge: 31540000 })
        ]).json(newUser);
    } else return res.status(405).end();
}
