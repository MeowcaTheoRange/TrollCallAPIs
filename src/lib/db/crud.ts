import { FindCursor, Filter as MDBFilter, ObjectId, Sort } from "mongodb";
import { mainDB } from "./mongodb";

// Functionally identical to the MongoDB type functions, but this is here if you want to extend TrollCall to another NoSQL database.
// That would be hard, though, as some parts of the codebase touch raw MongoDB concepts.

export type WithId<TSchema> = Omit<TSchema, "_id"> & {
    _id: ObjectId;
};

export type Document = { [key: string]: any };
export type Filter<T> = MDBFilter<Document>;

export async function createOne(collection: string, doc: any) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.insertOne(doc);
}

export async function readOne(collection: string, find: Filter<Document>) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.findOne(find);
} // MongoDB and its finicky type safety

export function readMany(
    collection: string,
    find: Filter<Document>,
    sort: Sort
) {
    const selectedCollection = mainDB.collection(collection);
    return selectedCollection.find(find).sort(sort);
}

export async function countMany(collection: string, find: any) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.countDocuments(find);
}

export async function replaceOne(collection: string, find: any, update: any) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.replaceOne(find, update);
}

export async function updateOne(collection: string, find: any, update: any) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.updateOne(find, update);
}

export async function deleteOne(collection: string, find: any) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.findOneAndDelete(find);
}

export async function cursorToArray<T>(
    cursor: FindCursor<T>,
    func: (input: any) => any = x => x
) {
    let array: T[] = [];
    while (await cursor.hasNext()) {
        array.push(await func(await cursor.next()));
    }
    return array;
}
