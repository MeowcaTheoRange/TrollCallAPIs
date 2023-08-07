import { ServerClan } from "@/types/clan";
import { Sort } from "mongodb";
import {
    Filter,
    createOne,
    cursorToArray,
    readMany,
    readOne,
    replaceOne
} from "../db/crud";

const ClanSort: Sort = { updatedDate: -1, _id: -1 };

/**
 * A function that returns one ServerClan from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerClan.
 */

export async function getSingleClan(
    query: Filter<ServerClan>
): Promise<ServerClan | null> {
    const clan = (await readOne("clans", query)) as ServerClan | null;
    return clan;
}

/**
 * A function that returns many ServerClans from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerClan returned. Helps reduce loops.
 * @returns An array of ServerClans.
 */

export async function getManyClans<T>(
    query: Filter<ServerClan>,
    func?: (input: any) => T
): Promise<(Awaited<T> | null)[]> {
    const clan = (await cursorToArray(
        readMany("clans", query, ClanSort),
        func
    )) as (Awaited<T> | null)[];
    return clan;
}

/**
 * A function that returns many ServerClans from the database using a FindCursor, limited by count.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerClan returned. Helps reduce loops.
 * @returns An array of ServerClans.
 */

export async function getManyPagedClans<T>(
    query: Filter<ServerClan>,
    func?: (input: any) => T,
    count: number = 5,
    page: number = 0
): Promise<(Awaited<T> | null)[]> {
    const find = readMany("clans", query, ClanSort)
        .limit(count)
        .skip(page * count);
    const clan = (await cursorToArray(find, func)) as (Awaited<T> | null)[];
    return clan;
}

/**
 * A function that puts one ServerClan into the database.
 * @param clan A ServerClan.
 * @returns A ServerClan, or null, depending on if the operation succeeded.
 */

export async function createClan(
    clan: Omit<ServerClan, "_id">
): Promise<Omit<ServerClan, "_id"> | null> {
    const newClan = await createOne("clans", clan);
    return newClan.acknowledged ? clan : null;
}

/**
 * A function that changes one database clan with the given params.
 * @param clan A ServerClan.
 * @returns A ServerClan, or null, depending on if the operation succeeded.
 */

export async function changeClan(clan: ServerClan): Promise<ServerClan | null> {
    const newClan = await replaceOne("clans", { _id: clan._id }, clan);
    return newClan.acknowledged ? clan : null;
}
