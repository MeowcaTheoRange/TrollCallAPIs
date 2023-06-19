import { MongoClient } from "mongodb";

if (process.env.MONGODB_DATABASE == null) process.exit();

export const client = new MongoClient(process.env.MONGODB_DATABASE, {});

export const mainDB = client.db("trollcall_test");
