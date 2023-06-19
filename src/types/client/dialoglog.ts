import * as yup from "yup";

export const SubmitDialogSchema = yup.object({
    owners: yup.array().of(yup.string().required()).required().min(1),
    name: yup.string().required().min(3).max(100),
    description: yup.string().max(10000).ensure(),
    characters: yup
        .array()
        .of(
            yup
                .object({
                    troll: yup.string().required(),
                    time: yup.string().ensure()
                })
                .required()
        )
        .required(),
    log: yup
        .array()
        .of(
            yup
                .object({
                    character: yup.number().notRequired().min(0),
                    quirk: yup.string().default("default"),
                    text: yup.string().required().max(2000)
                })
                .required()
        )
        .required()
});

export type SubmitDialog = yup.InferType<typeof SubmitDialogSchema>;

export const PartialDialogSchema = yup.object({
    owners: yup.array().of(yup.string()).min(1),
    name: yup.string().min(3).max(100),
    description: yup.string().max(10000),
    characters: yup.array().of(
        yup.object({
            troll: yup.string(),
            time: yup.string()
        })
    ),
    log: yup.array().of(
        yup.object({
            character: yup.number().min(0),
            quirk: yup.string().default("default"),
            text: yup.string().max(2000)
        })
    )
});

export type PartialDialog = yup.InferType<typeof PartialDialogSchema>;
