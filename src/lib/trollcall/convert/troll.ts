import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { SubmitTroll } from "@/types/client/troll";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { cutObject, sanitize } from "../utility/merge";

export async function ServerTrollToClientTroll(
    serverTroll: ServerTroll
): Promise<Partial<ClientTroll>> {
    const sanitizedTroll = sanitize(serverTroll);

    let clientTroll: Partial<ClientTroll> = {
        ...sanitizedTroll,
        trueSign:
            serverTroll.trueSign != null
                ? TrueSign[serverTroll.trueSign]
                : null,
        falseSign:
            serverTroll.falseSign != null
                ? TrueSign[serverTroll.falseSign]
                : null,
        class: serverTroll.class ? Class[serverTroll.class] : null,
        owner: undefined,
        flairs: undefined,
        updatedDate: serverTroll.updatedDate?.getTime()
    };

    return clientTroll;
}

export function ClientTrollToSubmitTroll(
    clientTroll: ClientTroll
): SubmitTroll {
    let submitTroll: SubmitTroll = {
        ...clientTroll,
        quirks: clientTroll.quirks
            ? Object.entries(clientTroll.quirks)
            : undefined,
        trueSign: clientTroll.trueSign ? clientTroll.trueSign.name : undefined,
        falseSign: clientTroll.falseSign
            ? clientTroll.falseSign.name
            : undefined,
        class: clientTroll.class ? clientTroll.class.name : undefined
    };

    return submitTroll;
}

export function SubmitTrollToServerTroll(
    submitTroll: Partial<SubmitTroll>
): Omit<Partial<ServerTroll>, "_id"> {
    let serverTroll: Omit<Partial<ServerTroll>, "_id"> = {
        ...submitTroll,
        quirks: submitTroll.quirks
            ? Object.fromEntries(submitTroll.quirks)
            : undefined,
        owner: undefined,
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
