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
                    .matches(/^[A-z]+$/, "Letters only")
                    .min(1)
                    .max(24)
                    .lowercase(),
                yup
                    .string()
                    .required()
                    .matches(/^[A-z]+$/, "Letters only")
                    .min(1)
                    .max(24)
                    .lowercase()
            ])
            .required(),
        description: yup.string().max(10000).ensure(),
        pronunciation: yup
            .tuple([
                yup
                    .string()
                    .required()
                    .matches(/^[A-z-]+$/, "Letters only")
                    .lowercase()
                    .max(50),
                yup
                    .string()
                    .required()
                    .matches(/^[A-z-]+$/, "Letters only")
                    .lowercase()
                    .max(50)
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
            .min(1),
        gender: yup
            .string()
            .required()
            .matches(/^[A-z- ]+$/, "Letters only")
            .min(3)
            .max(30),

        // Personal
        preferences: yup.object({
            love: yup
                .array()
                .of(yup.string().required().min(5).max(500))
                .max(10),
            hate: yup
                .array()
                .of(yup.string().required().min(5).max(500))
                .max(10)
        }),
        facts: yup.array().of(yup.string().required().min(5).max(500)).max(10),

        // Hiveswap identity
        trueSign: yup.string().required().oneOf(TrueSignKeys),
        falseSign: yup
            .string()
            .nullable()
            .transform(v => {
                return v === "" ? null : v;
            })
            .oneOf(TrueSignKeys),
        class: yup.string().oneOf(ClassKeys),

        // Trollian
        username: yup.string().max(100),
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
        quirks: SubmitQuirkHolderSchema.required(), // DO NOT HANDLE RIGHT NOW.
        quotes: yup.array().of(yup.string().max(1000)).max(20),

        // Physical stuff
        species: yup
            .string()
            .notRequired()
            .matches(/^([A-z-]+)|()$/, "Letters only")
            .max(50), // "Troll-*" if defined. Otherwise, just "Troll".
        height: yup.number().required().positive(), // Inches
        age: yup.number().required().positive(), // Sweeps
        images: yup.array().of(yup.string().required().url()).required(),
        // Meta stuff
        policies: yup
            .object({
                fanart: PolicySchema.notRequired(),
                fanartOthers: PolicySchema.notRequired(),
                kinning: PolicySchema.notRequired(),
                shipping: PolicySchema.notRequired(),
                fanfiction: PolicySchema.notRequired()
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
                .matches(/^[A-z]+$/, "Letters only")
                .min(1)
                .max(24)
                .lowercase(),
            yup
                .string()
                .matches(/^[A-z]+$/, "Letters only")
                .min(1)
                .max(24)
                .lowercase()
        ]),
        description: yup.string().max(10000),
        pronunciation: yup.tuple([
            yup
                .string()
                .matches(/^[A-z-]+$/, "Letters only")
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
            .min(3)
            .max(30),

        // Personal
        preferences: yup.object({
            love: yup.array().of(yup.string().min(5).max(500)).max(10),
            hate: yup.array().of(yup.string().min(5).max(500)).max(10)
        }),
        facts: yup.array().of(yup.string().min(5).max(500)).max(10),

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
