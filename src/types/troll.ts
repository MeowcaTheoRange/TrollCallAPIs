import { WithId } from "@/lib/db/crud";
import * as yup from "yup";
import { ClassSchema, TrueSignSchema } from "./assist/extended_zodiac";
import { ObjectIdSchema } from "./assist/mongo";
import { SubmitTrollSchema } from "./client/troll";
import { ClientFlairSchema } from "./flair";
import { ServerQuirkHolder, ServerQuirkHolderSchema } from "./quirks";
import { ClientUserSchema } from "./user";

export const ServerTrollSchema = SubmitTrollSchema.shape({
    owners: yup.array().of(ObjectIdSchema.required()).required().min(1),
    flairs: yup.array().of(ObjectIdSchema.required()).required(),
    quirks: ServerQuirkHolderSchema.required(),
    updatedDate: yup.date().notRequired()
});

export type ServerTroll = WithId<yup.InferType<typeof ServerTrollSchema>>;

export const ClientTrollSchema = SubmitTrollSchema.shape({
    owners: yup.array().of(ClientUserSchema.required()).required().min(1),
    flairs: yup.array().of(ClientFlairSchema.required()).required(),
    quirks: ServerQuirkHolderSchema.required(),
    trueSign: TrueSignSchema.notRequired(),
    falseSign: TrueSignSchema.notRequired(),
    class: ClassSchema.notRequired()
});

export interface ClientTroll extends yup.InferType<typeof ClientTrollSchema> {
    quirks: ServerQuirkHolder;
} // [SEARCH: HACK] a hack. thanks, jquense
