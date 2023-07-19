import * as yup from "yup";
import { TrueSignKeys } from "../assist/extended_zodiac";
import { PolicySchema } from "../assist/generics";

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
        trueSign: yup.string().notRequired().oneOf(TrueSignKeys),
        pronouns: yup
            .array()
            .of(
                yup
                    .tuple([
                        yup
                            .string()
                            .required()
                            .matches(/^[A-z]+$/, "Letters only")
                            .min(1)
                            .max(10)
                            .lowercase(), // she, he, they
                        yup
                            .string()
                            .required()
                            .matches(/^[A-z]+$/, "Letters only")
                            .min(1)
                            .max(10)
                            .lowercase(), // her, him, them
                        yup
                            .string()
                            .required()
                            .matches(/^[A-z]+$/, "Letters only")
                            .min(1)
                            .max(10)
                            .lowercase() // hers, his, theirs
                    ])
                    .required()
            )
            .required()
            .min(1),
        color: yup
            .tuple([
                yup.number().min(0).max(255),
                yup.number().min(0).max(255),
                yup.number().min(0).max(255)
            ])
            .notRequired(),
        policies: yup
            .object({
                fanart: PolicySchema.required(),
                fanartOthers: PolicySchema.required(),
                kinning: PolicySchema.required(),
                shipping: PolicySchema.required(),
                fanfiction: PolicySchema.required()
            })
            .required(),
        pfp: yup.string().notRequired().url(),
        bgimage: yup.string().notRequired().url(),
        css: yup.string().notRequired(),
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
        pronouns: yup
            .array()
            .of(
                yup.tuple([
                    yup
                        .string()
                        .matches(/^[A-z]+$/, "Letters only")
                        .min(1)
                        .max(10)
                        .lowercase(), // she, he, they
                    yup
                        .string()
                        .matches(/^[A-z]+$/, "Letters only")
                        .min(1)
                        .max(10)
                        .lowercase(), // her, him, them
                    yup
                        .string()
                        .matches(/^[A-z]+$/, "Letters only")
                        .min(1)
                        .max(10)
                        .lowercase() // hers, his, theirs
                ])
            )
            .min(1),
        color: yup.tuple([
            yup.number().min(0).max(255),
            yup.number().min(0).max(255),
            yup.number().min(0).max(255)
        ]),
        policies: yup.object({
            fanart: PolicySchema,
            fanartOthers: PolicySchema,
            kinning: PolicySchema,
            shipping: PolicySchema,
            fanfiction: PolicySchema
        }),
        pfp: yup.string().url(),
        bgimage: yup.string().url(),
        css: yup.string(),
        code: yup.string().max(256, "Too secure!!")
        // flairs: yup.array().of(ClientFlairSchema).required(),
    })
    .required();

export type PartialUser = yup.InferType<typeof PartialUserSchema>;
