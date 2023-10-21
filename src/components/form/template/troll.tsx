import Box from "@/components/Box/Box";
import SignCard from "@/components/cards/SignCard/SignCard";
import ErrorHandler from "@/components/form/ErrorHandler/ErrorHandler";
import globals from "@/styles/global.module.css";
import form_globals from "@/styles/global_form.module.css";
import { Color3 } from "@/types/assist/color";
import { ClassKeys, TrueSign, TrueSignKeys } from "@/types/assist/extended_zodiac";
import { SubmitTroll, SubmitTrollSchema } from "@/types/client/troll";
import { AgeConverter, HeightConverterImperial, HeightConverterMetric, PronounGrouper } from "@/utility/language";
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { NextRouter } from "next/router";
import { useState } from "react";

export default function TrollFormTemplate({
    router,
    user,
    onSubmitURI,
    on200URI,
    initialValues,
    method
}: {
    router: NextRouter;
    user: {
        TROLLCALL_NAME: string;
        TROLLCALL_CODE: string;
    };
    initialValues?: SubmitTroll;
    onSubmitURI?: string;
    on200URI?: string;
    method?: string;
}) {
    const [submitError, setSubmitError] = useState("");
    return (
        <Formik
            initialValues={
                {
                    name: ["", ""],
                    description: "",
                    pronunciation: ["", ""],
                    pronouns: [
                        ["she", "her", "hers"],
                        ["he", "him", "his"],
                        ["they", "them", "theirs"]
                    ],
                    gender: "",
                    images: [""],
                    ...(initialValues ?? {})
                } as SubmitTroll
            }
            validationSchema={SubmitTrollSchema}
            onSubmit={async (values, { setSubmitting, setErrors, setFieldError }) => {
                fetch(onSubmitURI ?? "/api/troll", {
                    method: method ?? "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) router.push(on200URI ?? `/troll/${user.TROLLCALL_NAME}/${values.name[0].toLowerCase()}`);
                    else setSubmitError(res.status.toString());
                });
            }}
        >
            {({ values, setFieldValue, errors, initialValues, isSubmitting, resetForm, submitForm }) => (
                <Form className={form_globals.FlexNormalizer}>
                    <Box properties={{ title: { text: "Identity" } }}>
                        <span className={globals.text}>About your character - on a personal level. Name, pronouns, basic stuff.</span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Name</p>
                                <span className={globals.text}>The name of your character.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="name.0"
                                        placeholder="Karkat"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                    <Field
                                        type="text"
                                        name="name.1"
                                        placeholder="Vantas"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="name"
                                    render={ErrorHandler}
                                />
                            </div>

                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${values.name != initialValues.name && errors.name?.[0] == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={globals.text}>By the way, your character's link is based on the first name.</span>
                                <span className={globals.mono}>
                                    /troll/[username]/
                                    {values.name[0].toLowerCase()}
                                </span>
                                <span className={`${form_globals.render_info}`}>
                                    <span className={form_globals.iconSmall}>info</span>{" "}
                                    <span className={`${globals.text}`}>
                                        Keep in mind - if you have overlapping names with another one of your characters, you will not be able to submit this
                                        character.
                                    </span>
                                </span>
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Pronunciation</p>
                                <span className={globals.text}>How to say the name of your character.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="pronunciation.0"
                                        placeholder="car-cat"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                    <Field
                                        type="text"
                                        name="pronunciation.1"
                                        placeholder="van-tes"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="pronunciation"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Pronouns</p>
                                <span className={globals.text}>How to refer to your character. Higher = more preferred.</span>
                            </div>
                            <FieldArray
                                name="pronouns"
                                render={(arrayHelpers: ArrayHelpers) => (
                                    <div className={globals.verticalListTop}>
                                        <div className={form_globals.horizlist}>
                                            <button
                                                className={`${globals.button}`}
                                                type="button"
                                                onClick={() => arrayHelpers.unshift(["", "", ""])}
                                            >
                                                Add pronoun set
                                            </button>
                                        </div>
                                        {values.pronouns && values.pronouns.length > 0 ? (
                                            values.pronouns.map((pronounSet, index) => (
                                                <div
                                                    className={form_globals.horizlist}
                                                    key={index}
                                                >
                                                    <div className={form_globals.horizlist}>
                                                        <Field
                                                            type="text"
                                                            name={`pronouns.${index}.0`}
                                                            placeholder="they"
                                                            className={`
                                        ${form_globals.textLikeInput}
                                        ${form_globals.textLikeInputSmall}
                                        ${form_globals.textLikeInputInvisible}
                                    `}
                                                        />
                                                        <span className={globals.text}>/</span>
                                                        <Field
                                                            type="text"
                                                            name={`pronouns.${index}.1`}
                                                            placeholder="them"
                                                            className={`
                                        ${form_globals.textLikeInput}
                                        ${form_globals.textLikeInputSmall}
                                        ${form_globals.textLikeInputInvisible}
                                    `}
                                                        />
                                                        <span className={globals.text}>/</span>
                                                        <Field
                                                            type="text"
                                                            name={`pronouns.${index}.2`}
                                                            placeholder="theirs"
                                                            className={`
                                        ${form_globals.textLikeInput}
                                        ${form_globals.textLikeInputSmall}
                                        ${form_globals.textLikeInputInvisible}
                                    `}
                                                        />
                                                    </div>
                                                    <div className={form_globals.horizlist}>
                                                        <button
                                                            className={`${globals.buttonIcon}`}
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            remove
                                                        </button>
                                                        <button
                                                            className={`${globals.buttonIcon}`}
                                                            type="button"
                                                            onClick={() => arrayHelpers.insert(index + 1, ["", "", ""])}
                                                        >
                                                            add
                                                        </button>
                                                        <button
                                                            className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                            disabled={index <= 0}
                                                            type="button"
                                                            onClick={() => arrayHelpers.move(index, index - 1)}
                                                        >
                                                            keyboard_arrow_up
                                                        </button>
                                                        <button
                                                            className={`${globals.buttonIcon} ${
                                                                index >= values.pronouns.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                            }`}
                                                            disabled={index >= values.pronouns.length - 1}
                                                            type="button"
                                                            onClick={() => arrayHelpers.move(index, index + 1)}
                                                        >
                                                            keyboard_arrow_down
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                        <ErrorMessage
                                            name="pronouns"
                                            render={ErrorHandler}
                                        />
                                    </div>
                                )}
                            />
                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${errors.pronouns == null ? form_globals.appear : ""}
                            `}
                            >
                                {values.pronouns.length > 0 && errors.pronouns == null ? (
                                    <>
                                        <span className={globals.text}>Short form: {PronounGrouper(values.pronouns)}</span>
                                        <span className={globals.text}>
                                            Medium form: {values.pronouns.map(pronounSet => pronounSet.slice(0, 2).join("/")).join(", ")}
                                        </span>
                                        <span className={globals.text}>Long form: {values.pronouns.map(pronounSet => pronounSet.join("/")).join(", ")}</span>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <span
                                className={`${form_globals.render_info}
                                    ${form_globals.layoutAppearable}
                                    ${values.pronouns == initialValues.pronouns && errors.pronouns == null ? form_globals.appear : ""}
                        `}
                            >
                                <span className={form_globals.iconSmall}>info</span>{" "}
                                <span className={`${globals.text}`}>Keep in mind - the included pronouns are removable, you don't have to keep them.</span>
                            </span>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Gender</p>
                                <span className={globals.text}>Your character's gender identity.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="gender"
                                        placeholder="Male"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="gender"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "Personal" } }}>
                        <span className={globals.text}>What your character does, thinks, and prefers.</span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>description</p>
                                <span className={globals.text}>Describe your character to us!</span>
                                <span className={globals.text}>You don't have to, but it would be cool if you did.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Description"
                                    className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputMultiline}
                                `}
                                />
                                <span
                                    className={`${globals.text} ${values.description.length > 10000 ? form_globals.render_error : ""} ${
                                        values.description.length >= 9900 ? form_globals.render_warning : ""
                                    }`}
                                >
                                    {values.description.length <= 10000
                                        ? 10000 - values.description.length + " characters remaining"
                                        : values.description.length - 10000 + " characters over limit"}
                                </span>
                                <ErrorMessage
                                    name="description"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Quotes</p>
                                <span className={globals.text}>Things your character has said.</span>
                            </div>
                            {values.quotes != null && Array.isArray(values.quotes) && values.quotes.length > 0 ? (
                                <FieldArray
                                    name="quotes"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <div className={globals.verticalListTop}>
                                            <div className={form_globals.horizlist}>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift("")}
                                                >
                                                    Add quote
                                                </button>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => setFieldValue("quotes", undefined)}
                                                >
                                                    Remove all quotes
                                                </button>
                                            </div>
                                            {Array.isArray(values.quotes) && values.quotes.length > 0 ? (
                                                values.quotes.map((pronounSet, index) => (
                                                    <div
                                                        className={form_globals.horizlist}
                                                        key={index}
                                                    >
                                                        <div className={form_globals.horizlist}>
                                                            <span className={globals.icon}>format_quote</span>
                                                            <Field
                                                                type="text"
                                                                name={`quotes.${index}`}
                                                                placeholder="A quote..."
                                                                className={`
                                                            ${form_globals.textLikeInput}
                                                            ${form_globals.textLikeInputTight}
                                                        `}
                                                            />
                                                        </div>
                                                        <div className={form_globals.horizlist}>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                remove
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={(): void => arrayHelpers.insert(index + 1, "")}
                                                            >
                                                                add
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                                disabled={index <= 0}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index - 1)}
                                                            >
                                                                keyboard_arrow_up
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${
                                                                    // @ts-ignore
                                                                    index >= values.quotes.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                }`}
                                                                // @ts-ignore
                                                                disabled={index >= values.quotes.length - 1}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index + 1)}
                                                            >
                                                                keyboard_arrow_down
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <button
                                        className={`${globals.button}`}
                                        type="button"
                                        onClick={() => setFieldValue("quotes", [""])}
                                    >
                                        Add facts
                                    </button>
                                </>
                            )}
                            <ErrorMessage
                                name="quotes"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Facts</p>
                                <span className={globals.text}>Fun facts about your character!</span>
                            </div>
                            {values.facts != null && Array.isArray(values.facts) && values.facts.length > 0 ? (
                                <FieldArray
                                    name="facts"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <div className={globals.verticalListTop}>
                                            <div className={form_globals.horizlist}>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift("")}
                                                >
                                                    Add fact
                                                </button>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => setFieldValue("facts", undefined)}
                                                >
                                                    Remove all facts
                                                </button>
                                            </div>
                                            {Array.isArray(values.facts) && values.facts.length > 0 ? (
                                                values.facts.map((pronounSet, index) => (
                                                    <div
                                                        className={form_globals.horizlist}
                                                        key={index}
                                                    >
                                                        <div className={form_globals.horizlist}>
                                                            <Field
                                                                type="text"
                                                                name={`facts.${index}`}
                                                                placeholder="Fun fact..."
                                                                className={`
                                                            ${form_globals.textLikeInput}
                                                            ${form_globals.textLikeInputTight}
                                                        `}
                                                            />
                                                        </div>
                                                        <div className={form_globals.horizlist}>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                remove
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={(): void => arrayHelpers.insert(index + 1, "")}
                                                            >
                                                                add
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                                disabled={index <= 0}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index - 1)}
                                                            >
                                                                keyboard_arrow_up
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${
                                                                    // @ts-ignore
                                                                    index >= values.facts.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                }`}
                                                                // @ts-ignore
                                                                disabled={index >= values.facts.length - 1}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index + 1)}
                                                            >
                                                                keyboard_arrow_down
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <button
                                        className={`${globals.button}`}
                                        type="button"
                                        onClick={() => setFieldValue("facts", [""])}
                                    >
                                        Add facts
                                    </button>
                                </>
                            )}
                            <ErrorMessage
                                name="facts"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Preferences</p>
                                <span className={globals.text}>What your character likes and dislikes.</span>
                            </div>
                            {values.preferences?.love != null && Array.isArray(values.preferences.love) && values.preferences.love.length > 0 ? (
                                <FieldArray
                                    name="preferences.love"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <div className={globals.verticalListTop}>
                                            <div className={form_globals.horizlist}>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift("")}
                                                >
                                                    Add like preference
                                                </button>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => setFieldValue("preferences.love", undefined)}
                                                >
                                                    Remove like preferences
                                                </button>
                                            </div>
                                            {Array.isArray(values.preferences.love) && values.preferences.love.length > 0 ? (
                                                values.preferences.love.map((pronounSet, index) => (
                                                    <div
                                                        className={form_globals.horizlist}
                                                        key={index}
                                                    >
                                                        <div className={form_globals.horizlist}>
                                                            <span className={globals.icon}>thumb_up</span>
                                                            <Field
                                                                type="text"
                                                                name={`preferences.love.${index}`}
                                                                placeholder="Like..."
                                                                className={`
                                                            ${form_globals.textLikeInput}
                                                            ${form_globals.textLikeInputTight}
                                                        `}
                                                            />
                                                        </div>
                                                        <div className={form_globals.horizlist}>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                remove
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={(): void => arrayHelpers.insert(index + 1, "")}
                                                            >
                                                                add
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                                disabled={index <= 0}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index - 1)}
                                                            >
                                                                keyboard_arrow_up
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${
                                                                    // @ts-ignore
                                                                    index >= values.preferences.love.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                }`}
                                                                // @ts-ignore
                                                                disabled={index >= values.preferences.love.length - 1}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index + 1)}
                                                            >
                                                                keyboard_arrow_down
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <button
                                        className={`${globals.button}`}
                                        type="button"
                                        onClick={() => setFieldValue("preferences.love", [""])}
                                    >
                                        Add like preferences
                                    </button>
                                </>
                            )}
                            <ErrorMessage
                                name="preferences.love"
                                render={ErrorHandler}
                            />
                            {values.preferences?.hate != null && Array.isArray(values.preferences.hate) && values.preferences.hate.length > 0 ? (
                                <FieldArray
                                    name="preferences.hate"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <div className={globals.verticalListTop}>
                                            <div className={form_globals.horizlist}>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift("")}
                                                >
                                                    Add dislike preference
                                                </button>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => setFieldValue("preferences.hate", undefined)}
                                                >
                                                    Remove dislike preferences
                                                </button>
                                            </div>
                                            {Array.isArray(values.preferences.hate) && values.preferences.hate.length > 0 ? (
                                                values.preferences.hate.map((pronounSet, index) => (
                                                    <div
                                                        className={form_globals.horizlist}
                                                        key={index}
                                                    >
                                                        <div className={form_globals.horizlist}>
                                                            <span className={globals.icon}>thumb_down</span>
                                                            <Field
                                                                type="text"
                                                                name={`preferences.hate.${index}`}
                                                                placeholder="Dislike..."
                                                                className={`
                                                            ${form_globals.textLikeInput}
                                                            ${form_globals.textLikeInputTight}
                                                        `}
                                                            />
                                                        </div>
                                                        <div className={form_globals.horizlist}>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                remove
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={(): void => arrayHelpers.insert(index + 1, "")}
                                                            >
                                                                add
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                                disabled={index <= 0}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index - 1)}
                                                            >
                                                                keyboard_arrow_up
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${
                                                                    // @ts-ignore
                                                                    index >= values.preferences.hate.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                }`}
                                                                // @ts-ignore
                                                                disabled={index >= values.preferences.hate.length - 1}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index + 1)}
                                                            >
                                                                keyboard_arrow_down
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <button
                                        className={`${globals.button}`}
                                        type="button"
                                        onClick={() => setFieldValue("preferences.hate", [""])}
                                    >
                                        Add dislike preferences
                                    </button>
                                </>
                            )}
                            <ErrorMessage
                                name="preferences.hate"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Username</p>
                                <span className={globals.text}>Your character's online username. This isn't required, but it would be funny if it was.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="carcinoGeneticist"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="username"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Text Color</p>
                                <span className={globals.text}>
                                    The color your character likes to type in. This is optional, but if this is left blank, the True Sign/False Sign color will
                                    be used instead.
                                </span>
                            </div>
                            <div className={globals.verticalListTop}>
                                {values.textColor != null ? (
                                    <>
                                        <div className={globals.horizontalListLeft}>
                                            <span className={globals.text}>Red</span>
                                            <Field
                                                type="number"
                                                name="textColor.0"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                            <span className={globals.text}>Green</span>
                                            <Field
                                                type="number"
                                                name="textColor.1"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                            <span className={globals.text}>Blue</span>
                                            <Field
                                                type="number"
                                                name="textColor.2"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                        </div>
                                        <span className={globals.text}>#{Color3.fromRGB(...values.textColor).toHex()}</span>
                                        <Box
                                            properties={{
                                                title: {
                                                    text: "This is a title."
                                                },
                                                theme: Color3.fromRGB(...values.textColor)
                                            }}
                                        >
                                            <span className={globals.text}>This is average text!</span>
                                            <button
                                                className={globals.button}
                                                type="button"
                                                onClick={() => {
                                                    setFieldValue("textColor", undefined);
                                                }}
                                            >
                                                Clear Text Color
                                            </button>
                                        </Box>
                                    </>
                                ) : (
                                    <button
                                        className={globals.button}
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("textColor", [255, 255, 255]);
                                        }}
                                    >
                                        Add Text Color
                                    </button>
                                )}
                            </div>

                            <ErrorMessage
                                name="textColor"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Images</p>
                                <span className={globals.text}>A collection of images of your character.</span>
                            </div>
                            {values.images != null && Array.isArray(values.images) && values.images.length > 0 ? (
                                <FieldArray
                                    name="images"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <div className={globals.verticalListTop}>
                                            <div className={form_globals.horizlist}>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift("")}
                                                >
                                                    Add image
                                                </button>
                                            </div>
                                            {Array.isArray(values.images) && values.images.length > 0 ? (
                                                values.images.map((pronounSet, index) => (
                                                    <div
                                                        className={form_globals.horizlist}
                                                        key={index}
                                                    >
                                                        <div className={form_globals.horizlist}>
                                                            <span className={globals.icon}>image</span>
                                                            <Field
                                                                type="text"
                                                                name={`images.${index}`}
                                                                placeholder="https://example.com/"
                                                                className={`
                                                            ${form_globals.textLikeInput}
                                                            ${form_globals.textLikeInputTight}
                                                        `}
                                                            />
                                                        </div>
                                                        <div className={form_globals.horizlist}>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                remove
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon}`}
                                                                type="button"
                                                                onClick={(): void => arrayHelpers.insert(index + 1, "")}
                                                            >
                                                                add
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${index <= 0 ? form_globals.layoutButtonDisabled : ""}`}
                                                                disabled={index <= 0}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index - 1)}
                                                            >
                                                                keyboard_arrow_up
                                                            </button>
                                                            <button
                                                                className={`${globals.buttonIcon} ${
                                                                    // @ts-ignore
                                                                    index >= values.images.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                }`}
                                                                // @ts-ignore
                                                                disabled={index >= values.images.length - 1}
                                                                type="button"
                                                                onClick={() => arrayHelpers.move(index, index + 1)}
                                                            >
                                                                keyboard_arrow_down
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <button
                                        className={`${globals.button}`}
                                        type="button"
                                        onClick={() => setFieldValue("images", [""])}
                                    >
                                        Add images
                                    </button>
                                </>
                            )}
                            <ErrorMessage
                                name="images"
                                render={ErrorHandler}
                            />
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "Hiveswap" } }}>
                        <span className={globals.text}>
                            Some things from the Hiveswap/Homestuck series. Can be almost completely ignored if you don't care about this sort of thing.
                        </span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>True Sign</p>
                                <span className={globals.text}>Your character's True Sign.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        as="select"
                                        name="trueSign"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">None</option>
                                        {TrueSignKeys.map((trueSign, idx) => (
                                            <option
                                                key={"ts" + idx}
                                                value={trueSign}
                                            >
                                                {trueSign}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="trueSign"
                                    render={ErrorHandler}
                                />
                            </div>
                            {values.trueSign != null && TrueSign[values.trueSign] != null && errors.falseSign == null ? (
                                <SignCard sign={TrueSign[values.trueSign]} />
                            ) : (
                                <></>
                            )}
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>False Sign</p>
                                <span className={globals.text}>
                                    Your character's False Sign, most likely used as a mask for their True Sign in public. This is most definitely optional.
                                </span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        as="select"
                                        name="falseSign"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">None</option>
                                        {TrueSignKeys.map((trueSign, idx) => (
                                            <option
                                                key={"ts" + idx}
                                                value={trueSign}
                                            >
                                                {trueSign}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="falseSign"
                                    render={ErrorHandler}
                                />
                            </div>
                            {values.falseSign != null && TrueSign[values.falseSign] != null && errors.falseSign == null ? (
                                <SignCard sign={TrueSign[values.falseSign]} />
                            ) : (
                                <></>
                            )}
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Classpect</p>
                                <span className={globals.text}>Your character's classpect. Also optional.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        as="select"
                                        name="class"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">None</option>
                                        {ClassKeys.map((classy, idx) => (
                                            <option
                                                key={"ts" + idx}
                                                value={classy}
                                            >
                                                {classy}
                                                {values.trueSign != null && TrueSign[values.trueSign] != null && errors.falseSign == null
                                                    ? " of " + TrueSign[values.trueSign].aspect.name
                                                    : ""}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="class"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "Physical" } }}>
                        <span className={globals.text}>Let's get physical! Some stuff that's about your character as they exist.</span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Species</p>
                                <span className={globals.text}>Your character's species. Can be just about anything! Not required.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="species"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="species"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Height</p>
                                <span className={globals.text}>Your character's height (in inches).</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="number"
                                        name="height"
                                        placeholder="60"
                                        min="1"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="height"
                                    render={ErrorHandler}
                                />
                            </div>
                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${values.height != initialValues.height && errors.height == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={globals.text}>Metric: {HeightConverterMetric(values.height)}</span>
                                <span className={globals.text}>Imperial: {HeightConverterImperial(values.height)}</span>
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Age</p>
                                <span className={globals.text}>Your character's age (in years).</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="number"
                                        name="age"
                                        placeholder="13"
                                        min="1"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="age"
                                    render={ErrorHandler}
                                />
                            </div>
                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${values.age != initialValues.age && errors.age == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={globals.text}>
                                    If your character's on Alternia, they'd be about <b>{AgeConverter(values.age, true)} old</b>.
                                </span>
                                <span
                                    className={`${form_globals.render_info}
                                        ${form_globals.layoutAppearable}
                                        ${values.age != initialValues.age && errors.age == null && values.age < 13 ? form_globals.appear : ""}
                            `}
                                >
                                    <span className={form_globals.iconSmall}>info</span>{" "}
                                    <span className={`${globals.text}`}>
                                        Your character is under 13 years old. Nothing will happen because of this, just keep in mind that TrollCall is a
                                        resource intended for those 13 and up.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "Meta" } }}>
                        <span className={globals.text}>How your character is shown on the site itself.</span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Page Color</p>
                                <span className={globals.text}>The color your character's page/card will be.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                {values.pageColor != null ? (
                                    <>
                                        <div className={globals.horizontalListLeft}>
                                            <span className={globals.text}>Red</span>
                                            <Field
                                                type="number"
                                                name="pageColor.0"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                            <span className={globals.text}>Green</span>
                                            <Field
                                                type="number"
                                                name="pageColor.1"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                            <span className={globals.text}>Blue</span>
                                            <Field
                                                type="number"
                                                name="pageColor.2"
                                                placeholder="0"
                                                min="0"
                                                max="255"
                                                className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputSmall}
                                    ${form_globals.textLikeInputInvisible}
                                `}
                                            />
                                        </div>
                                        {errors.pageColor == null ? (
                                            <>
                                                <span className={globals.text}>#{Color3.fromRGB(...values.pageColor).toHex()}</span>
                                                <Box
                                                    properties={{
                                                        title: {
                                                            text: "This is a title."
                                                        },
                                                        theme: Color3.fromRGB(...values.pageColor)
                                                    }}
                                                >
                                                    <span className={globals.text}>This is average text!</span>
                                                    <button
                                                        className={globals.button}
                                                        type="button"
                                                        onClick={() => {
                                                            setFieldValue("pageColor", undefined);
                                                        }}
                                                    >
                                                        Clear Page Color
                                                    </button>
                                                </Box>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        className={globals.button}
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("pageColor", [255, 255, 255]);
                                        }}
                                    >
                                        Add Page Color
                                    </button>
                                )}
                            </div>

                            <ErrorMessage
                                name="pageColor"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Policies</p>
                                <span className={globals.text}>How you want others to treat your characters.</span>
                            </div>
                            <Box
                                properties={{
                                    class: form_globals.vertilist
                                }}
                            >
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Fanart</p>
                                    <span className={globals.text}>Allow others to draw fanart of your character.</span>
                                    <Field
                                        as="select"
                                        name="policies.fanart"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">Default policy</option>
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Fanart with other characters</p>
                                    <span className={globals.text}>Allow others to draw fanart of your character with other characters.</span>
                                    <Field
                                        as="select"
                                        name="policies.fanartOthers"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">Default policy</option>
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Kinning</p>
                                    <span className={globals.text}>Allow others to kin your character.</span>
                                    <Field
                                        as="select"
                                        name="policies.kinning"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">Default policy</option>
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Shipping</p>
                                    <Field
                                        as="select"
                                        name="policies.shipping"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">Default policy</option>
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Fanfiction</p>
                                    <Field
                                        as="select"
                                        name="policies.fanfiction"
                                        placeholder="Troll"
                                        className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputTight}
                                    ${form_globals.selectInput}
                                `}
                                    >
                                        <option value="">Default policy</option>
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="policies"
                                    render={ErrorHandler}
                                />
                            </Box>
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
