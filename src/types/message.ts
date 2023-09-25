import * as yup from "yup";
import { ObjectIdSchema } from "./assist/mongo";
import { ClientClanSchema } from "./clan";
import { SubmitMessageSchema } from "./client/message";

export const ServerMessageSchema = SubmitMessageSchema.shape({
    _id: ObjectIdSchema.required(),
    date: yup.date(),
    from: ObjectIdSchema.required(),
    to: ObjectIdSchema.required()
});

export type ServerMessage = yup.InferType<typeof ServerMessageSchema>;

export const ClientMessageSchema = yup.object({
    _id: yup.string().required(),
    date: yup.date(),
    from: ClientClanSchema.required(),
    subject: yup.string().min(0).max(500).ensure(),
    body: yup.string().min(0).max(10000).ensure()
});

export type ClientMessage = yup.InferType<typeof ClientMessageSchema>;
