import { ClanGET } from "@/lib/trollcall/api/clan";
import { getSingleClan } from "@/lib/trollcall/clan";
import { ServerMessageToClientMessage } from "@/lib/trollcall/convert/message";
import { getManyPagedMessages } from "@/lib/trollcall/message";
import { cutObjectBlank } from "@/lib/trollcall/utility/merge";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const page = query.page ? query.page[0] : 0;
    if (method === "GET") {
        const clan = await getSingleClan({
            name: query.clan
        });
        if (clan == null) return res.status(404).end();
        const clientClan = await ClanGET(null, clan);
        if (clientClan == null) return res.status(404).end();

        const senders: { [key: string]: any } = {};

        const messages = await getManyPagedMessages(
            {
                "to": clan._id
            },
            async (message: any) => {
                const thisMessage = await ServerMessageToClientMessage(message);
                let clientFrom;
                if (senders[message.from.toString()] != null)
                    clientFrom = senders[message.from.toString()];
                else {
                    const from = await getSingleClan({
                        _id: message.from
                    });
                    if (from == null) return res.status(404).end();
                    clientFrom = await ClanGET(null, from);
                    if (clientFrom == null) return res.status(404).end();
                    senders[message.from.toString()] = clientFrom;
                }
                thisMessage.from = clientFrom;

                return cutObjectBlank(thisMessage);
            },
            5,
            page
        );
        if (messages == null) return res.status(404).end();
        res.json(messages);
    } else return res.status(405).end();
}
