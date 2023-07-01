import { ServerFlair } from "@/types/flair";
import { Sort } from "mongodb";
import { Filter, cursorToArray, readMany, readOne } from "../db/crud";

const FlairSort: Sort = { updatedDate: -1, _id: -1 };

/**
 * A function that returns one ServerFlairs from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerFlair.
 */

export async function getSingleFlair(
    query: Filter<ServerFlair>
): Promise<ServerFlair | null> {
    const flair = (await readOne("flairs", query)) as ServerFlair | null;
    return flair;
}

/**
 * A function that returns many ServerFlairs from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerFlairs returned. Helps reduce loops.
 * @returns An array of ServerFlairs.
 */

export async function getManyFlairs(
    query: Filter<ServerFlair>,
    func?: (input: any) => any
): Promise<(ServerFlair | null)[]> {
    const flair = (await cursorToArray(
        readMany("flairs", query, FlairSort),
        func
    )) as (ServerFlair | null)[];
    return flair;
}
