import { SubmitUserToServerUser } from "@/lib/trollcall/convert/user";
import { createUser, getSingleUser } from "@/lib/trollcall/user";
import { SubmitUserSchema } from "@/types/client/user";
import { ServerUser } from "@/types/user";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method } = req;
    if (method === "POST") {
        let validatedUser;
        try {
            validatedUser = await SubmitUserSchema.validate(body);
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkExistingUser = await getSingleUser({
            name: validatedUser.name
        });
        if (checkExistingUser != null) return res.status(409).end();
        // we are sure this object is full, so cast partial
        const serverUser = SubmitUserToServerUser(validatedUser) as Omit<
            ServerUser,
            "_id"
        >;
        const newUser = await createUser(serverUser);
        if (newUser == null) return res.status(503).end();
        // Give cookies
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
        ]);
        res.json(newUser);
    } else return res.status(405).end();
}
