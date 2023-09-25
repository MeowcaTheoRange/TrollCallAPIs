import { ServerMessage } from "@/types/message";
import { Sort } from "mongodb";
import {
    Filter,
    createOne,
    cursorToArray,
    deleteOne,
    readMany,
    readOne
} from "../db/crud";

const MessageSort: Sort = { _id: -1 };

/**
 * A function that returns one ServerMessages from the database.
 * @param query A partial Find query. Can contain an ID.
 * @returns A ServerMessage.
 */

export async function getSingleMessage(
    query: Filter<ServerMessage>
): Promise<ServerMessage | null> {
    const message = (await readOne("messages", query)) as ServerMessage | null;
    return message;
}

/**
 * A function that returns many ServerMessages from the database using a FindCursor.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerMessages returned. Helps reduce loops.
 * @returns An array of ServerMessages.
 */

export async function getManyMessages<T>(
    query: Filter<ServerMessage>,
    func?: (input: any) => T
): Promise<(Awaited<T> | null)[]> {
    const Message = (await cursorToArray(
        readMany("messages", query, MessageSort),
        func
    )) as (Awaited<T> | null)[];
    return Message;
}

/**
 * A function that returns many ServerMessages from the database using a FindCursor, limited by count.
 * @param query A partial Find query. Can contain an ID.
 * @param func A function to run on every ServerMessage returned. Helps reduce loops.
 * @returns An array of ServerMessages.
 */

export async function getManyPagedMessages<T>(
    query: Filter<ServerMessage>,
    func?: (input: any) => T,
    count: number = 5,
    page: number = 0
): Promise<(Awaited<T> | null)[]> {
    const find = readMany("messages", query, MessageSort)
        .limit(count)
        .skip(page * count);
    const clan = (await cursorToArray(find, func)) as (Awaited<T> | null)[];
    return clan;
}

/**
 * A function that puts one ServerMessage into the database.
 * @param Message A ServerMessage.
 * @returns A ServerMessage, or null, depending on if the operation succeeded.
 */

export async function createMessage(
    message: Omit<ServerMessage, "_id">
): Promise<Omit<ServerMessage, "_id"> | null> {
    const newMessage = await createOne("messages", message);
    return newMessage.acknowledged ? message : null;
}

/**
 * A function that changes one database Message with the given params.
 * @param Message A ServerMessage.
 * @returns A ServerMessage, or null, depending on if the operation succeeded.
 */

export async function deleteMessage(
    message: Partial<ServerMessage>
): Promise<ServerMessage> {
    const newMessage: ServerMessage = await deleteOne("messages", message);
    return newMessage;
}
