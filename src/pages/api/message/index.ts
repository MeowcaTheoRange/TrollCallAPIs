import { getSingleClan } from "@/lib/trollcall/clan";
import { SubmitMessageToServerMessage } from "@/lib/trollcall/convert/message";
import { createMessage } from "@/lib/trollcall/message";
import { compareCredentials } from "@/lib/trollcall/perms";
import { SubmitMessageSchema } from "@/types/client/message";
import { ServerMessage } from "@/types/message";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method, cookies, query } = req;
    if (method === "POST") {
        let validatedMessage;
        try {
            validatedMessage = await SubmitMessageSchema.validate(body, {
                stripUnknown: true
            });
        } catch (err) {
            return res.status(400).send(err);
        }
        const checkClan = await getSingleClan({
            name: cookies.TROLLCALL_NAME
        });
        if (checkClan == null) return res.status(404).end();
        if (!(await compareCredentials(checkClan, cookies)))
            return res.status(403).end();
        // ok, logged in now. check for "to"
        const checkRecipient = await getSingleClan({
            name: validatedMessage.to
        });
        if (checkRecipient == null) return res.status(400).end();
        // we are sure this object is full, so cast partial
        let serverMessage = SubmitMessageToServerMessage(
            validatedMessage
        ) as Omit<ServerMessage, "_id">;
        serverMessage.to = checkRecipient._id;
        serverMessage.from = checkClan._id;
        const newMessage = await createMessage(serverMessage);
        if (newMessage == null) return res.status(503).end();
        res.json(newMessage);
    } else return res.status(405).end();
}
