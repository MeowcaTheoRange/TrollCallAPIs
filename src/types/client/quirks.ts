import * as yup from "yup";
import { QuirkSchema } from "../quirks";

export const SubmitQuirkHolderSchema = yup
    .array()
    .of(
        yup
            .tuple([
                yup.string().required().lowercase(),
                QuirkSchema.required()
            ])
            .required()
    )
    .required()
    .test("has-default", 'Needs "default" Quirk Mode', v =>
        v.some(([k, v]) => k === "default" || k === "Default")
    );

export type SubmitQuirkHolder = yup.InferType<typeof SubmitQuirkHolderSchema>;

export const PartialQuirkHolderSchema = yup
    .array()
    .of(yup.tuple([yup.string().lowercase(), QuirkSchema]));

export type PartialQuirkHolder = yup.InferType<typeof PartialQuirkHolderSchema>;
