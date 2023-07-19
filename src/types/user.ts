import { WithId } from "@/lib/db/crud";
import * as yup from "yup";
import { TrueSignSchema } from "./assist/extended_zodiac";
import { ObjectIdSchema } from "./assist/mongo";
import { SubmitUserSchema } from "./client/user";
import { ClientFlairSchema } from "./flair";

export const ServerUserSchema = SubmitUserSchema.shape({
    flairs: yup.array().of(ObjectIdSchema.required()).required(),
    code: yup.string().required(),
    updatedDate: yup.date().notRequired()
});

export type ServerUser = WithId<yup.InferType<typeof ServerUserSchema>>;

export const ClientUserSchema = SubmitUserSchema.shape({
    flairs: yup.array().of(ClientFlairSchema.required()).required(),
    trueSign: TrueSignSchema.notRequired(),
    updatedDate: yup.number().notRequired()
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;
