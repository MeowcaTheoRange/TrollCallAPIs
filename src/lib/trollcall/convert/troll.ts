import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { getManyFlairs } from "../flair";
import { getManyUsers } from "../user";
import { cutArray, sanitize } from "../utility/merge";
import { ServerFlairToClientFlair } from "./flair";
import { ServerUserToClientUser } from "./user";

export async function ServerTrollToClientTroll(serverTroll: ServerTroll): Promise<ClientTroll> {
    const sanitizedTroll = sanitize(serverTroll);
    const owners = await getManyUsers({ _id: { $in: serverTroll.owners } }, ServerUserToClientUser);
    const flairs = await getManyFlairs({ _id: { $in: serverTroll.flairs } }, ServerFlairToClientFlair);
    let clientTroll: ClientTroll = {
        ...sanitizedTroll,
        trueSign: TrueSign[serverTroll.trueSign],
        falseSign: serverTroll.falseSign != null ? TrueSign[serverTroll.falseSign] : null,
        class: Class[serverTroll.class],
        owners: cutArray(owners),
        flairs: cutArray(flairs)
    };

    return clientTroll;
}
