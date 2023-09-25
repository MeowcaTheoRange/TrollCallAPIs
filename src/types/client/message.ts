import * as yup from "yup";
export const SubmitMessageSchema = yup.object({
    subject: yup.string().min(0).max(500).ensure(),
    body: yup.string().min(0).max(10000).ensure(),
    to: yup.string().min(3).required()
});

export type SubmitMessage = yup.InferType<typeof SubmitMessageSchema>;
