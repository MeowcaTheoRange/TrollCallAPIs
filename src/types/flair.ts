import { WithId } from "@/lib/db/crud";
import * as yup from "yup";
import { SubmitFlairSchema } from "./client/flair";

export const ServerFlairSchema = SubmitFlairSchema.shape({});

export type ServerFlair = WithId<yup.InferType<typeof ServerFlairSchema>>;

export const ClientFlairSchema = SubmitFlairSchema.shape({});

export type ClientFlair = yup.InferType<typeof ClientFlairSchema>;
