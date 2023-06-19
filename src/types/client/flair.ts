import * as yup from "yup";
import { ColorSchema } from "../assist/color";

export const SubmitFlairSchema = yup
    .object({
        name: yup.string().required().min(10).max(50),
        alt: yup.string().max(1000),

        color: ColorSchema.required(),
        link: yup.string().notRequired().url()
    })
    .required();

export type SubmitFlair = yup.InferType<typeof SubmitFlairSchema>;

export const PartialFlairSchema = yup
    .object({
        name: yup.string().min(10).max(50),
        alt: yup.string().max(1000),

        color: ColorSchema,
        link: yup.string().url()
    })
    .required();

export type PartialFlair = yup.InferType<typeof PartialFlairSchema>;
