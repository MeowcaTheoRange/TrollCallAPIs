import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { appRouter } from "./app";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", appRouter);

app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});
