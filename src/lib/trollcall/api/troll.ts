import { ClientClan, ServerClan } from "@/types/clan";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { getSingleClan } from "../clan";
import { ServerFlairToClientFlair } from "../convert/flair";
import { ServerTrollToClientTroll } from "../convert/troll";
import { getManyFlairs } from "../flair";
import { getSingleTroll } from "../troll";
import { cutArray, cutObjectBlank } from "../utility/merge";
import { ClanGET } from "./clan";

export async function TrollGET(
    query?: Partial<{ [key: string]: string | string[] }> | null,
    clanQuery?: string | null,
    existingOwner?: ServerClan,
    existingTroll?: ServerTroll
): Promise<ClientTroll | null> {
    const clan =
        existingOwner != null || query == null
            ? existingOwner
            : await getSingleClan({
                  name: clanQuery
              });
    if (clan == null) return null;
    const troll =
        existingTroll != null || query == null
            ? existingTroll
            : await getSingleTroll({
                  ...query,
                  "owner": clan._id
              });
    if (troll == null) return null;
    const serverTroll = await ServerTrollToClientTroll(troll);
    if (troll.flairs != null)
        serverTroll.flairs = cutArray(
            await getManyFlairs(
                { _id: { $in: troll.flairs } },
                ServerFlairToClientFlair
            )
        );
    // we know this is not null, as we passed in our own clan
    serverTroll.owner = (await ClanGET(null, clan)) as ClientClan;
    return cutObjectBlank(serverTroll) as ClientTroll;
}
