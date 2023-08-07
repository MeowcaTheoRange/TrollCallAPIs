import { MongoClient } from "mongodb";

if (process.env.ENCRYPT_CODE == null) {
    console.log(
        "You need to write an encryption code to run a TrollCall server!"
    );
    process.exit();
}
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

export const client = new MongoClient(process.env.MONGODB_DATABASE, {});

export const mainDB = client.db(process.env.MONGODB_DATABASE_NAME);
