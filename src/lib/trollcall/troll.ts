import { ServerTroll } from "@/types/troll";
import { Sort } from "mongodb";
import {
    Filter,
    createOne,
    cursorToArray,
    readMany,
    readOne,
    replaceOne
} from "../db/crud";

const TrollSort: Sort = { updatedDate: -1, _id: -1 };

/**
 * A function that returns one ServerTrolls from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerTroll.
 */

export async function getSingleTroll(
    query: Filter<ServerTroll>
): Promise<ServerTroll | null> {
    const troll = (await readOne("trolls", query)) as ServerTroll | null;
    return troll;
}

/**
 * A function that returns many ServerTrolls from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerTrolls returned. Helps reduce loops.
 * @returns An array of ServerTrolls.
 */

export async function getManyTrolls<T>(
    query: Filter<ServerTroll>,
    func?: (input: any) => T
): Promise<(Awaited<T> | null)[]> {
    const troll = (await cursorToArray(
        readMany("trolls", query, TrollSort),
        func
    )) as (Awaited<T> | null)[];
    return troll;
}

/**
 * A function that returns many ServerTrolls from the database using a FindCursor, limited by count.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerTroll returned. Helps reduce loops.
 * @returns An array of ServerTrolls.
 */

export async function getManyPagedTrolls<T>(
    query: Filter<ServerTroll>,
    func?: (input: any) => T,
    count: number = 5,
    page: number = 0
): Promise<(Awaited<T> | null)[]> {
    const find = readMany("trolls", query, TrollSort)
        .limit(count)
        .skip(page * count);
    const user = (await cursorToArray(find, func)) as (Awaited<T> | null)[];
    return user;
}

/**
 * A function that puts one ServerTroll into the database.
 * @param troll A ServerTroll.
 * @returns A ServerTroll, or null, depending on if the operation succeeded.
 */

export async function createTroll(
    troll: Omit<ServerTroll, "_id">
): Promise<Omit<ServerTroll, "_id"> | null> {
    const newTroll = await createOne("trolls", troll);
    return newTroll.acknowledged ? troll : null;
}

/**
 * A function that changes one database troll with the given params.
 * @param troll A ServerTroll.
 * @returns A ServerTroll, or null, depending on if the operation succeeded.
 */

export async function changeTroll(
    troll: ServerTroll
): Promise<ServerTroll | null> {
    const newTroll = await replaceOne("trolls", { _id: troll._id }, troll);
    return newTroll.acknowledged ? troll : null;
}
