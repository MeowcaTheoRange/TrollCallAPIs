import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { SubmitTroll } from "@/types/client/troll";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { getManyFlairs } from "../flair";
import { cutArray, cutObject, sanitize } from "../utility/merge";
import { ServerFlairToClientFlair } from "./flair";

export async function ServerTrollToClientTroll(
    serverTroll: ServerTroll
): Promise<ClientTroll> {
    const sanitizedTroll = sanitize(serverTroll);
    const flairs = await getManyFlairs(
        { _id: { $in: serverTroll.flairs } },
        ServerFlairToClientFlair
    );
    let clientTroll: ClientTroll = {
        ...sanitizedTroll,
        trueSign: TrueSign[serverTroll.trueSign],
        falseSign:
            serverTroll.falseSign != null
                ? TrueSign[serverTroll.falseSign]
                : null,
        class: Class[serverTroll.class],
        owners: [],
        flairs: cutArray(flairs)
    };

    return clientTroll;
}

export function SubmitTrollToServerTroll(
    submitTroll: Partial<SubmitTroll>
): Omit<Partial<ServerTroll>, "_id"> {
    let serverTroll: Omit<Partial<ServerTroll>, "_id"> = {
        ...submitTroll,
        quirks: submitTroll.quirks
            ? Object.fromEntries(submitTroll.quirks)
            : undefined,
        owners: undefined,
        flairs: undefined,
        updatedDate: new Date()
    };
    return serverTroll;
}

export function MergeServerTrolls(
    submitTroll: ServerTroll,
    merge: Partial<Omit<ServerTroll, "_id">>
): ServerTroll {
    let serverTroll: ServerTroll = {
        ...submitTroll,
        ...cutObject(merge),
        updatedDate: new Date()
    };
    return serverTroll;
}
