import * as yup from "yup";
import { ClassKeys, TrueSignKeys } from "../assist/extended_zodiac";
import { PolicySchema } from "../assist/generics";
import { PartialQuirkHolderSchema, SubmitQuirkHolderSchema } from "./quirks";

export const SubmitTrollSchema = yup
    .object({
        // Name and identification
        name: yup
            .tuple([
                yup
                    .string()
                    .required()
                    .matches(/^[A-z0-9-_]+$/, "Alphanumeric characters only")
                    .min(3)
                    .max(24)
                    .lowercase(),
                yup
                    .string()
                    .notRequired()
                    .matches(/^[A-z]+$/, "Letters only")
                    .max(24)
                    .lowercase()
                    .transform(v => {
                        return v.length <= 0 ? undefined : v;
                    })
            ])
            .required(),
        description: yup.string().max(10000).ensure(),
        pronunciation: yup
            .tuple([
                yup
                    .string()
                    .required()
                    .matches(/^[A-z0-9-_]+$/, "Alphanumeric characters only")
                    .lowercase()
                    .max(50),
                yup
                    .string()
                    .notRequired()
                    .matches(/^[A-z-]+$/, "Letters only")
                    .lowercase()
                    .max(50)
                    .transform(v => {
                        return v.length <= 0 ? undefined : v;
                    })
            ])
            .required(),
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
            .min(1)
            .max(20),
        gender: yup
            .string()
            .matches(/^[A-z- ]+$/, "Letters only")
            .max(30)
            .transform(v => {
                return v.length <= 0 ? undefined : v;
            }),

        // Personal
        preferences: yup
            .object({
                love: yup
                    .array()
                    .of(yup.string().required().min(5).max(500))
                    .min(1)
                    .max(10)
                    .transform(v => {
                        return v.length <= 0 ? undefined : v;
                    }),
                hate: yup
                    .array()
                    .of(yup.string().required().min(5).max(500))
                    .min(1)
                    .max(10)
                    .transform(v => {
                        return v.length <= 0 ? undefined : v;
                    })
            })
            .transform(v => {
                return v.love == null && v.hate == null ? undefined : v;
            }),
        facts: yup
            .array()
            .of(yup.string().required().min(5).max(500))
            .min(1)
            .max(10)
            .transform(v => {
                return v.length <= 0 ? null : v;
            }),

        // Hiveswap identity
        trueSign: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(TrueSignKeys),
        falseSign: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(TrueSignKeys),
        class: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(ClassKeys),

        // Trollian
        username: yup.string().max(50),
        textColor: yup
            .tuple([
                yup.number().min(0).max(255).required(),
                yup.number().min(0).max(255).required(),
                yup.number().min(0).max(255).required()
            ])
            .notRequired(), // default to trueSign color if undefined,
        pageColor: yup
            .tuple([
                yup.number().min(0).max(255).required(),
                yup.number().min(0).max(255).required(),
                yup.number().min(0).max(255).required()
            ])
            .notRequired(), // colors the page.
        quirks: SubmitQuirkHolderSchema.notRequired(), // DO NOT HANDLE RIGHT NOW.
        quotes: yup
            .array()
            .of(yup.string().max(1000).required())
            .min(1)
            .max(20)
            .transform(v => {
                return v.length <= 0 ? undefined : v;
            }),

        // Physical stuff
        species: yup
            .string()
            .notRequired()
            .matches(/^([A-z- ]+)|()$/, "Letters only")
            .max(50)
            .transform(v => {
                return v.length <= 0 ? undefined : v;
            }),
        height: yup.number().required().positive().max(1024), // Inches
        age: yup.number().required().positive().max(1024), // Sweeps
        images: yup
            .array()
            .of(yup.string().required().url())
            .required()
            .min(1)
            .max(20)
            .transform(v => {
                return v.length <= 0 ? undefined : v;
            }),
        // Meta stuff
        policies: yup
            .object({
                fanart: PolicySchema.notRequired().transform(v => {
                    return v === "" ? undefined : v;
                }),
                fanartOthers: PolicySchema.notRequired().transform(v => {
                    return v === "" ? undefined : v;
                }),
                kinning: PolicySchema.notRequired().transform(v => {
                    return v === "" ? undefined : v;
                }),
                shipping: PolicySchema.notRequired().transform(v => {
                    return v === "" ? undefined : v;
                }),
                fanfiction: PolicySchema.notRequired().transform(v => {
                    return v === "" ? undefined : v;
                })
            })
            .notRequired()
    })
    .required();

export type SubmitTroll = yup.InferType<typeof SubmitTrollSchema>;

export const PartialTrollSchema = yup
    .object({
        // Name and identification
        name: yup.tuple([
            yup
                .string()
                .matches(/^[A-z0-9-_]+$/, "Alphanumeric characters only")
                .min(3)
                .max(24)
                .lowercase(),
            yup
                .string()
                .matches(/^[A-z]+$/, "Letters only")
                .max(24)
                .lowercase()
        ]),
        description: yup.string().max(10000),
        pronunciation: yup.tuple([
            yup
                .string()
                .matches(/^[A-z0-9-_]+$/, "Alphanumeric characters only")
                .lowercase(),
            yup
                .string()
                .matches(/^[A-z-]+$/, "Letters only")
                .lowercase()
        ]),
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
        gender: yup
            .string()
            .matches(/^[A-z-_]+$/, "Letters only")
            .max(30),

        // Personal
        preferences: yup.object({
            love: yup.array().of(yup.string().min(5).max(500)).min(1).max(10),
            hate: yup.array().of(yup.string().min(5).max(500)).min(1).max(10)
        }),
        facts: yup.array().of(yup.string().min(5).max(500)).min(1).max(10),

        // Hiveswap identity
        trueSign: yup.string().oneOf(TrueSignKeys),
        falseSign: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(TrueSignKeys), // "Keelez Bunbat"
        class: yup.string().oneOf(ClassKeys),

        // Trollian
        username: yup.string().max(100),
        textColor: yup.tuple([
            yup.number().min(0).max(255),
            yup.number().min(0).max(255),
            yup.number().min(0).max(255)
        ]),
        pageColor: yup.tuple([
            yup.number().min(0).max(255),
            yup.number().min(0).max(255),
            yup.number().min(0).max(255)
        ]),
        quirks: PartialQuirkHolderSchema, // DO NOT HANDLE RIGHT NOW.
        quotes: yup.array().of(yup.string().max(1000)),

        // Physical stuff
        species: yup
            .string()
            .matches(/^([A-z-]+)|()$/, "Letters only")
            .max(50), // "Troll-*" if defined. Otherwise, just "Troll".
        height: yup.number().positive(), // Inches
        age: yup.number().positive(), // Sweeps
        images: yup.array().of(yup.string().url()),
        // Meta stuff
        policies: yup.object({
            fanart: PolicySchema,
            fanartOthers: PolicySchema,
            kinning: PolicySchema,
            shipping: PolicySchema,
            fanfiction: PolicySchema
        })
    })
    .required();

export type PartialTroll = yup.InferType<typeof PartialTrollSchema>;
