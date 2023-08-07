import * as yup from "yup";
import { PolicySchema } from "../assist/generics";

export const SubmitClanSchema = yup
    .object({
        name: yup
            .string()
            .required()
            .matches(/^[\w-]+$/, "No special characters or spaces")
            .min(3)
            .max(50)
            .lowercase(),
        members: yup
            .array()
            .of(
                yup
                    .object({
                        name: yup.string().required().min(3).max(50),
                        pronouns: yup
                            .array()
                            .of(
                                yup.tuple([
                                    yup
                                        .string()
                                        .required()
                                        .matches(/^[A-z]+$/, "Letters only")
                                        .max(10)
                                        .lowercase(), // she, he, they
                                    yup
                                        .string()
                                        .required()
                                        .matches(/^[A-z]+$/, "Letters only")
                                        .max(10)
                                        .lowercase(), // her, him, them
                                    yup
                                        .string()
                                        .required()
                                        .matches(/^[A-z]+$/, "Letters only")
                                        .max(10)
                                        .lowercase() // hers, his, theirs
                                ])
                            )
                            .required()
                            .min(1)
                    })
                    .required()
            )
            .required()
            .min(1)
            .max(20),
        description: yup.string().max(10000).ensure(),
        url: yup.string().notRequired().url(),
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

export type SubmitClan = yup.InferType<typeof SubmitClanSchema>;

export const PartialClanSchema = yup
    .object({
        name: yup
            .string()
            .matches(/^[\w-]+$/, "No special characters or spaces")
            .min(3)
            .max(50)
            .lowercase(),
        members: yup
            .array()
            .of(
                yup.object({
                    name: yup.string().min(3).max(50),
                    pronouns: yup
                        .array()
                        .of(
                            yup.tuple([
                                yup
                                    .string()
                                    .matches(/^[A-z]+$/, "Letters only")
                                    .max(10)
                                    .lowercase(), // she, he, they
                                yup
                                    .string()
                                    .matches(/^[A-z]+$/, "Letters only")
                                    .max(10)
                                    .lowercase(), // her, him, them
                                yup
                                    .string()
                                    .matches(/^[A-z]+$/, "Letters only")
                                    .max(10)
                                    .lowercase() // hers, his, theirs
                            ])
                        )
                        .min(1)
                })
            )
            .min(1),
        description: yup.string().max(10000),
        url: yup.string().url(),
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

export type PartialClan = yup.InferType<typeof PartialClanSchema>;
