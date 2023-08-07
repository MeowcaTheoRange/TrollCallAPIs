import { WithId } from "@/lib/db/crud";
import * as yup from "yup";
import { ObjectIdSchema } from "./assist/mongo";
import { SubmitClanSchema } from "./client/clan";
import { ClientFlairSchema } from "./flair";

export const ServerClanSchema = SubmitClanSchema.shape({
    flairs: yup.array().of(ObjectIdSchema.required()).required(),
    code: yup.string().required().max(10000),
    updatedDate: yup.date().notRequired()
});

export type ServerClan = WithId<yup.InferType<typeof ServerClanSchema>>;

export const ClientClanSchema = SubmitClanSchema.shape({
    flairs: yup.array().of(ClientFlairSchema.required()).required(),
    updatedDate: yup.number().notRequired()
});

export type ClientClan = yup.InferType<typeof ClientClanSchema>;
