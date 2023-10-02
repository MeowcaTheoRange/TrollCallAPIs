import { ServerClan } from "@/types/clan";
import { ClientMessage } from "@/types/message";
import { getSingleClan } from "../clan";
import { ServerMessageToClientMessage } from "../convert/message";
import { getSingleMessage } from "../message";
import { cutObjectBlank } from "../utility/merge";
import { ClanGET } from "./clan";

export async function MessageGET(
    query: Partial<{ [key: string]: string | string[] }>,
    recipientQuery?: string | null,
    existingRecipient?: ServerClan
): Promise<ClientMessage | null> {
    const to =
        existingRecipient != null || query == null
            ? existingRecipient
            : await getSingleClan({
                  name: recipientQuery
              });
    if (to == null) return null;
    const message = await getSingleMessage({
        ...query,
        "to": to._id
    });
    if (message == null) return null;
    const from = await getSingleClan({
        _id: message.from
    });
    if (from == null) return null;
    const fullClan = await ClanGET(null, from);
    if (fullClan == null) return null;
    const endMessage: ClientMessage = {
        ...(await ServerMessageToClientMessage(message)),
        from: fullClan
    };
    // we know this is not null, as we passed in our own clan
    return cutObjectBlank(endMessage);
}
