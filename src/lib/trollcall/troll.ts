import { ServerTroll } from "@/types/troll";
import { Filter, cursorToArray, readMany, readOne } from "../db/crud";

/**
 * A function that returns one ServerTrolls from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerTroll.
 */

export async function getSingleTroll(query: Filter<ServerTroll>): Promise<ServerTroll | null> {
    const troll = (await readOne("trolls", query)) as ServerTroll | null;
    return troll;
}

/**
 * A function that returns many ServerTrolls from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerTrolls returned. Helps reduce loops.
 * @returns An array of ServerTrolls.
 */

export async function getManyTrolls(
    query: Filter<ServerTroll>,
    func?: (input: any) => any
): Promise<(ServerTroll | null)[]> {
    const troll = (await cursorToArray(readMany("trolls", query), func)) as (ServerTroll | null)[];
    return troll;
}
