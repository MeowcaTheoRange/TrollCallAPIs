import * as yup from "yup";
import { ColorSchema } from "../assist/color";
import { TrueSignKeys } from "../assist/extended_zodiac";

export const SubmitUserSchema = yup
    .object({
        name: yup
            .string()
            .required()
            .matches(/^[\w-]+$/, "No special characters or spaces")
            .min(3)
            .max(50)
            .lowercase(),
        description: yup.string().max(10000).ensure(),
        url: yup.string().notRequired().url(),
        trueSign: yup.string().required().oneOf(TrueSignKeys),
        color: ColorSchema.required(),
        pfp: yup.string().notRequired().url(),
        code: yup.string().notRequired().max(256, "Too secure!!")
        // flairs: yup.array().of(ClientFlairSchema).required(),
    })
    .required();

export type SubmitUser = yup.InferType<typeof SubmitUserSchema>;

export const PartialUserSchema = yup
    .object({
        name: yup
            .string()
            .matches(/^[\w-]+$/, "No special characters or spaces")
            .min(3)
            .max(50)
            .lowercase(),
        description: yup.string().max(10000),
        url: yup.string().url(),
        trueSign: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(TrueSignKeys),
        color: yup.tuple([yup.number().min(0).max(255), yup.number().min(0).max(255), yup.number().min(0).max(255)]),
        pfp: yup.string().url(),
        code: yup.string().max(256, "Too secure!!")
        // flairs: yup.array().of(ClientFlairSchema).required(),
    })
    .required();

export type PartialUser = yup.InferType<typeof PartialUserSchema>;
