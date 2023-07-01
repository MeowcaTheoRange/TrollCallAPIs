import { ClientFlair, ServerFlair } from "@/types/flair";
import { sanitize } from "../utility/merge";

export async function ServerFlairToClientFlair(
    serverFlair: ServerFlair
): Promise<ClientFlair> {
    const sanitizedFlair = sanitize(serverFlair);
    let clientFlair: ClientFlair = {
        ...sanitizedFlair
    };

    return clientFlair;
}
