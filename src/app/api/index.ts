import { Router } from "express";
import { trollRouter } from "./troll";
import { userRouter } from "./user";

export const apiRouter = Router();

apiRouter.use("/", trollRouter);
apiRouter.use("/", userRouter);
