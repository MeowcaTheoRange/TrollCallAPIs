import { mainDB } from "@/lib/db/mongodb";
import { hash } from "argon2";
import { NextApiRequest, NextApiResponse } from "next";

export async function addMany(
    collection: string,
    items: { [key: string]: any }[]
) {
    const selectedCollection = mainDB.collection(collection);
    return await selectedCollection.insertMany(items, { ordered: true });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, cookies, query, method } = req;
    if (method === "GET") {
        if (query.code == null) return res.status(400).end();

        return res.status(200).send(await hash(query.code.toString()));
    } else return res.status(405).end();
}
