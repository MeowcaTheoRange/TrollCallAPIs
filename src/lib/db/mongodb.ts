import { MongoClient } from "mongodb";

if (process.env.MONGODB_DATABASE == null) {
    console.log("You need a MongoDB Database URI to run a TrollCall server!");
    process.exit();
}
if (process.env.MONGODB_DATABASE_NAME == null) {
    console.log(
        'You need to specify a MongoDB Database Store to run a TrollCall server! Default can be "trollcall"'
    );
    process.exit();
}

let client;

if (process.env.NODE_ENV === "development") {
    //@ts-ignore
    if (!global._mongoClient) {
        //@ts-ignore
        global._mongoClient = new MongoClient(process.env.MONGODB_DATABASE, {});
    }
    //@ts-ignore
    client = global._mongoClient;
} else {
    client = new MongoClient(process.env.MONGODB_DATABASE, {});
}

export const mainDB = client.db(process.env.MONGODB_DATABASE_NAME);

export const firstDB = client.db("trollcall");
