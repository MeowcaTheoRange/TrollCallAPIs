import { ServerUser } from "@/types/user";
import { Sort } from "mongodb";
import {
    Filter,
    createOne,
    cursorToArray,
    readMany,
    readOne,
    replaceOne
} from "../db/crud";

const UserSort: Sort = { updatedDate: -1, _id: -1 };

/**
 * A function that returns one ServerUser from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerUser.
 */

export async function getSingleUser(
    query: Filter<ServerUser>
): Promise<ServerUser | null> {
    const user = (await readOne("users", query)) as ServerUser | null;
    return user;
}

/**
 * A function that returns many ServerUsers from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerUser returned. Helps reduce loops.
 * @returns An array of ServerUsers.
 */

export async function getManyUsers<T>(
    query: Filter<ServerUser>,
    func?: (input: any) => T
): Promise<(Awaited<T> | null)[]> {
    const user = (await cursorToArray(
        readMany("users", query, UserSort),
        func
    )) as (Awaited<T> | null)[];
    return user;
}

/**
 * A function that returns many ServerUsers from the database using a FindCursor, limited by count.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerUser returned. Helps reduce loops.
 * @returns An array of ServerUsers.
 */

export async function getManyPagedUsers<T>(
    query: Filter<ServerUser>,
    func?: (input: any) => T,
    count: number = 5,
    page: number = 0
): Promise<(Awaited<T> | null)[]> {
    const find = readMany("users", query, UserSort)
        .limit(count)
        .skip(page * count);
    const user = (await cursorToArray(find, func)) as (Awaited<T> | null)[];
    return user;
}

/**
 * A function that puts one ServerUser into the database.
 * @param user A ServerUser.
 * @returns A ServerUser, or null, depending on if the operation succeeded.
 */

export async function createUser(
    user: Omit<ServerUser, "_id">
): Promise<Omit<ServerUser, "_id"> | null> {
    const newUser = await createOne("users", user);
    return newUser.acknowledged ? user : null;
}

/**
 * A function that changes one database user with the given params.
 * @param user A ServerUser.
 * @returns A ServerUser, or null, depending on if the operation succeeded.
 */

export async function changeUser(user: ServerUser): Promise<ServerUser | null> {
    const newUser = await replaceOne("users", { _id: user._id }, user);
    return newUser.acknowledged ? user : null;
}
