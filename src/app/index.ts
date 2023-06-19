import { Router } from "express";
import { apiRouter } from "./api/index";

export const appRouter = Router();

appRouter.use("/api/", apiRouter);
