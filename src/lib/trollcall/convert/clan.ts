import { ClientClan, ServerClan } from "@/types/clan";
import { SubmitClan } from "@/types/client/clan";
import { cutObject, removeCode, sanitize } from "../utility/merge";

export async function ServerClanToClientClan(
    serverClan: ServerClan
): Promise<Partial<ClientClan>> {
    const sanitizedClan = removeCode(sanitize(serverClan));
    let clientClan: Partial<ClientClan> = {
        ...sanitizedClan,
        flairs: undefined,
        updatedDate: serverClan.updatedDate?.getTime()
    };
    return clientClan;
}

export function ClientClanToSubmitClan(clientClan: ClientClan): SubmitClan {
    let serverClan: SubmitClan = {
        ...clientClan
    };
    return serverClan;
}

export function SubmitClanToServerClan(
    submitClan: Partial<SubmitClan>
): Omit<Partial<ServerClan>, "_id"> {
    let serverClan: Omit<Partial<ServerClan>, "_id"> = {
        ...submitClan,
        flairs: undefined,
        code: submitClan.code || undefined,
        updatedDate: new Date()
    };
    return serverClan;
}

export function MergeServerClans(
    submitClan: ServerClan,
    merge: Partial<Omit<ServerClan, "_id">>
): ServerClan {
    let serverClan: ServerClan = {
        ...submitClan,
        ...cutObject(merge),
        updatedDate: new Date()
    };
    return serverClan;
}
