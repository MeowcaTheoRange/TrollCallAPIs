import Box from "@/components/Box/Box";
import ErrorHandler from "@/components/form/ErrorHandler/ErrorHandler";
import globals from "@/styles/global.module.css";
import form_globals from "@/styles/global_form.module.css";
import { SubmitMessage, SubmitMessageSchema } from "@/types/client/message";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NextRouter } from "next/router";
import { useState } from "react";

export default function MessageFormTemplate({
    router,
    onSubmitURI,
    on200URI,
    initialValues,
    method
}: {
    router: NextRouter;
    initialValues?: SubmitMessage;
    onSubmitURI?: string;
    on200URI?: string;
    method?: string;
}) {
    const [submitError, setSubmitError] = useState("");
    return (
        <Formik
            initialValues={
                initialValues ??
                ({
                    to: "",
                    body: "",
                    subject: ""
                } as SubmitMessage)
            }
            validationSchema={SubmitMessageSchema}
            onSubmit={async (values, { setSubmitting, setErrors, setFieldError }) => {
                fetch(onSubmitURI ?? "/api/message", {
                    method: method ?? "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) router.push(on200URI ?? `/clan/${values.to}`);
                    else setSubmitError(res.status.toString());
                });
            }}
        >
            {({ values, setFieldValue, errors, initialValues, isSubmitting, resetForm, submitForm }) => (
                <Form className={form_globals.FlexNormalizer}>
                    <Box>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Recipient</p>
                                <span className={globals.text}>
                                    Who will recieve this message. Type the name of the user (the part you will find in their URL, not the display name.)
                                </span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="to"
                                        placeholder="jim"
                                        className={`
                                            ${form_globals.textLikeInput}
                                            ${form_globals.textLikeInputTight}
                                        `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="to"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Subject</p>
                                <span className={globals.text}>What your message is about. Can be left blank.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="subject"
                                        placeholder="Hello, world!"
                                        className={`
                                            ${form_globals.textLikeInput}
                                            ${form_globals.textLikeInputTight}
                                        `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="subject"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Body</p>
                                <span className={globals.text}>The main text of your message.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <Field
                                    as="textarea"
                                    name="body"
                                    placeholder="body"
                                    className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputMultiline}
                                `}
                                />
                                <span
                                    className={`${globals.text} ${values.body.length > 10000 ? form_globals.render_error : ""} ${
                                        values.body.length >= 9900 ? form_globals.render_warning : ""
                                    }`}
                                >
                                    {values.body.length <= 10000
                                        ? 10000 - values.body.length + " characters remaining"
                                        : values.body.length - 10000 + " characters over limit"}
                                </span>
                                <ErrorMessage
                                    name="body"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "Form Settings" } }}>
                        <div className={globals.horizontalListLeft}>
                            <button
                                type="reset"
                                className={globals.button}
                                disabled={isSubmitting}
                                // onClick={() => resetForm()}
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                className={globals.button}
                                disabled={isSubmitting}
                                // onClick={submitForm}
                            >
                                Submit Form
                            </button>
                        </div>
                        <div className={globals.horizontalListLeft}>{submitError != null && submitError.length > 0 ? ErrorHandler(submitError) : ""}</div>
                        <details>
                            <summary>Advanced stuff</summary>
                            <div className={globals.verticalListTop}>
                                <details>
                                    <summary>Values (Advanced)</summary>
                                    <p className={`${globals.mono} ${globals.blockTextKeepTabs}`}>{JSON.stringify(values, null, 2)}</p>
                                </details>
                                <details>
                                    <summary>Errors (Advanced)</summary>
                                    <p className={`${globals.mono} ${globals.blockTextKeepTabs}`}>{JSON.stringify(errors, null, 2)}</p>
                                </details>
                                <p className={globals.text}>If something is wrong, make sure to send these with your report!</p>
                            </div>
                        </details>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
