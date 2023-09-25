// import { Filter, cursorToArray } from "@/lib/db/crud";
// import { firstDB, mainDB } from "@/lib/db/mongodb";
// import { ServerClan } from "@/types/clan";
// import { ServerTroll } from "@/types/troll";
// import { AdaptivePossessive } from "@/utility/language";
// import { hash } from "argon2";
// import { Sort } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";

// export function readMany(
//     collection: string,
//     find: Filter<Document>,
//     sort: Sort
// ) {
//     const selectedCollection = firstDB.collection(collection);
//     return selectedCollection.find(find).sort(sort);
// }

// export async function addMany(
//     collection: string,
//     items: { [key: string]: any }[]
// ) {
//     const selectedCollection = mainDB.collection(collection);
//     return await selectedCollection.insertMany(items, { ordered: true });
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { body, cookies, query, method } = req;
//     if (method === "GET") {
//         const allUsers: ServerClan[] = await cursorToArray(
//             readMany("users", {}, { "name": 1 }),
//             async x => {
//                 const sc: ServerClan = {
//                     _id: x._id,
//                     updatedDate: new Date(x.updatedDate),
//                     displayName: AdaptivePossessive(x.name, "Clan"),
//                     url: x.url,
//                     color: x.color,
//                     pfp: x.pfp,
//                     bgimage: null,
//                     css: null,
//                     name: x.name,
//                     members: [
//                         {
//                             name: x.name,
//                             pronouns: [["they", "them", "theirs"]]
//                         }
//                     ],
//                     description: x.description,
//                     policies: {
//                         fanart: "no",
//                         fanartOthers: "no",
//                         kinning: "no",
//                         shipping: "no",
//                         fanfiction: "no"
//                     },
//                     code: await hash(x.code),
//                     flairs: []
//                 };
//                 return sc;
//             }
//         );
//         let allTrolls: ServerTroll[] = await cursorToArray(
//             readMany("trolls", {}, { "name.0": 1 }),
//             async x => {
//                 const st: ServerTroll = {
//                     _id: x._id,
//                     policies: x.policies,
//                     updatedDate: x.updatedDate,
//                     gender: x.gender,
//                     facts: x.facts,
//                     trueSign: x.trueSign,
//                     falseSign: x.falseSign,
//                     class: x.class,
//                     username: x.username,
//                     textColor: x.textColor,
//                     pageColor: null,
//                     quotes: [],
//                     species: x.species,
//                     name: x.name,
//                     pronouns: x.pronouns,
//                     description: x.description,
//                     flairs: [],
//                     pronunciation: x.pronunciation,
//                     preferences: x.preferences,
//                     quirks: x.quirks,
//                     height: x.height,
//                     age: Math.floor(x.age * 2.1666 * 10) / 10,
//                     images: [x.image],
//                     owner: x.owners[0]
//                 };
//                 return st;
//             }
//         );
//         const resultClans = await addMany("clans", allUsers);
//         const resultTrolls = await addMany("trolls", allTrolls);
//         return res
//             .status(200)
//             .json({ "users": resultClans, "trolls": resultTrolls });
//     } else return res.status(405).end();
// }

// /*
// type ServerTroll = Omit<{
//     policies?: {
//         fanart: "yes" | "ask" | "no" | null;
//         fanartOthers: "yes" | "ask" | "no" | null;
//         kinning: "yes" | "ask" | "no" | null;
//         shipping: "yes" | "ask" | "no" | null;
//         fanfiction: "yes" | "ask" | "no" | null;
//     } | null | undefined;
//     updatedDate?: Date | undefined;
//     gender?: string | undefined;
//     facts?: string[] | undefined;
//     trueSign?: string | null | undefined;
//     falseSign?: string | null | undefined;
//     class?: string | null | undefined;
//     username?: string | undefined;
//     textColor?: yup.Maybe<[number, number, number] | undefined>;
//     pageColor?: yup.Maybe<[number, number, number] | undefined>;
//     quotes?: string[] | undefined;
//     species?: yup.Maybe<string | undefined>;
//     name: [string, string];
//     pronouns: [string, string, string][];
//     description: string;
//     flairs: ObjectId[];
//     pronunciation: [string, string];
//     preferences: {
//         love?: string[] | undefined;
//         hate?: string[] | undefined;
//     };
//     quirks: AnyPresentValue;
//     height: number;
//     age: number;
//     images: string[];
//     owner: ObjectId;
// }, "_id"> & {
//     _id: ObjectId;
// }
// */
