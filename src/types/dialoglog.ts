import { WithId } from "@/lib/db/crud";
import * as yup from "yup";
import { ObjectIdSchema } from "./assist/mongo";
import { ClientClanSchema } from "./clan";
import { SubmitDialogSchema } from "./client/dialoglog";
import { ClientTroll, ClientTrollSchema } from "./troll";

export const ServerDialogSchema = SubmitDialogSchema.shape({
    owners: yup.array().of(ObjectIdSchema.required()).required().min(1),
    characters: yup
        .array()
        .of(
            yup
                .object({
                    troll: ObjectIdSchema.required(),
                    time: yup.string().ensure()
                })
                .required()
        )
        .required()
});

export type ServerDialog = WithId<yup.InferType<typeof ServerDialogSchema>>;

export const ClientDialogSchema = SubmitDialogSchema.shape({
    owners: yup.array().of(ClientClanSchema.required()).required().min(1),
    characters: yup
        .array()
        .of(
            yup
                .object({
                    troll: ClientTrollSchema.required(),
                    time: yup.string().ensure()
                })
                .required()
        )
        .required()
});

export interface ClientDialog extends yup.InferType<typeof ClientDialogSchema> {
    characters: {
        troll: ClientTroll;
        time: string;
    }[];
} // [SEARCH: HACK] a hack. thanks, jquense
