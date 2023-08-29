import { ClientClan, ServerClan } from "@/types/clan";
import { getSingleClan } from "../clan";
import { ServerClanToClientClan } from "../convert/clan";
import { ServerFlairToClientFlair } from "../convert/flair";
import { getManyFlairs } from "../flair";
import { cutArray } from "../utility/merge";

export async function ClanGET(
    query?: Partial<{
        [key: string]: string | string[];
    }> | null,
    existingClan?: ServerClan
): Promise<ClientClan | null> {
    const clan =
        existingClan != null || query == null
            ? existingClan
            : await getSingleClan(query);
    if (clan == null) return null;
    const serverClan = await ServerClanToClientClan(clan);
    serverClan.flairs = cutArray(
        await getManyFlairs(
            { _id: { $in: clan.flairs } },
            ServerFlairToClientFlair
        )
    );
    return serverClan as ClientClan;
}
