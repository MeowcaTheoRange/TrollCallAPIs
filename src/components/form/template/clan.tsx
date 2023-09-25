import Box from "@/components/Box/Box";
import ErrorHandler from "@/components/form/ErrorHandler/ErrorHandler";
import globals from "@/styles/global.module.css";
import form_globals from "@/styles/global_form.module.css";
import { Color3 } from "@/types/assist/color";
import { SubmitClan, SubmitClanSchema } from "@/types/client/clan";
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { NextRouter } from "next/router";
import { useState } from "react";

export default function ClanFormTemplate({
    router,
    onSubmitURI,
    on200URI,
    initialValues,
    method
}: {
    router: NextRouter;
    initialValues?: SubmitClan;
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
                    name: "",
                    description: "",
                    members: [
                        {
                            name: "",
                            pronouns: [["", "", ""]]
                        }
                    ]
                } as SubmitClan)
            }
            validationSchema={SubmitClanSchema}
            onSubmit={async (values, { setSubmitting, setErrors, setFieldError }) => {
                fetch(onSubmitURI ?? "/api/clan", {
                    method: method ?? "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) router.push(on200URI ?? `/clan/${values.name}`);
                    else setSubmitError(res.status.toString());
                });
            }}
        >
            {({ values, setFieldValue, errors, initialValues, isSubmitting, resetForm, submitForm }) => (
                <Form className={form_globals.FlexNormalizer}>
                    <Box properties={{ title: { text: "Identity" } }}>
                        <span className={globals.text}>About your clan. Name, members, whatever else!</span>
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Name</p>
                                <span className={globals.text}>The name of your clan.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="jim"
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
                                ${values.name != initialValues.name && values.name != null && errors.name == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={globals.text}>By the way, your clan's link is based on the this name.</span>
                                <span className={globals.mono}>/clan/{values.name?.toLowerCase()}</span>
                                <span className={`${form_globals.render_info}`}>
                                    <span className={form_globals.iconSmall}>info</span>{" "}
                                    <span className={`${globals.text}`}>
                                        Keep in mind - if you have overlapping names with another clan, you will not be able to submit this clan.
                                    </span>
                                </span>
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Display name</p>
                                <span className={globals.text}>The display name for your clan. If left blank, the simple name will be used instead.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="text"
                                        name="displayName"
                                        placeholder="Clan of Jim"
                                        className={`
                                            ${form_globals.textLikeInput}
                                            ${form_globals.textLikeInputTight}
                                        `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="displayName"
                                    render={ErrorHandler}
                                />
                            </div>
                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${values.displayName != initialValues.displayName && errors.displayName == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={`${form_globals.render_info}`}>
                                    <span className={form_globals.iconSmall}>info</span>{" "}
                                    <span className={`${globals.text}`}>
                                        If you have overlapping display names with another clan, nothing will happen -- though you may have issues regarding
                                        impersonation.
                                    </span>
                                </span>
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Members</p>
                                <span className={globals.text}>All of the members of your clan.</span>
                            </div>
                            <FieldArray
                                name="members"
                                render={(arrayHelpers: ArrayHelpers) => (
                                    <div className={globals.verticalListTop}>
                                        {values.members && values.members.length > 0 ? (
                                            <>
                                                <div className={form_globals.horizlist}>
                                                    <button
                                                        className={`${globals.button}`}
                                                        type="button"
                                                        onClick={() => arrayHelpers.unshift({ name: "", pronouns: [["", "", ""]] })}
                                                    >
                                                        Add member
                                                    </button>
                                                </div>
                                                <div className={globals.verticalListTop}>
                                                    {values.members.map((member, index) => (
                                                        <div
                                                            className={globals.verticalListTop}
                                                            key={index}
                                                        >
                                                            <div className={form_globals.horizlist}>
                                                                <Field
                                                                    type="text"
                                                                    name={`members.${index}.name`}
                                                                    placeholder="Jimberly"
                                                                    className={`
                                ${form_globals.textLikeInput}
                                ${form_globals.textLikeInputTight}
                            `}
                                                                />
                                                            </div>
                                                            <ErrorMessage
                                                                name={`members.${index}.name`}
                                                                render={ErrorHandler}
                                                            />
                                                            <div className={form_globals.horizlist}>
                                                                <FieldArray
                                                                    name={`members.${index}.pronouns`}
                                                                    render={(arrayPronounHelpers: ArrayHelpers) => (
                                                                        <div className={globals.verticalListTop}>
                                                                            <div className={form_globals.horizlist}>
                                                                                <button
                                                                                    className={`${globals.button}`}
                                                                                    type="button"
                                                                                    onClick={() => arrayPronounHelpers.unshift(["", "", ""])}
                                                                                >
                                                                                    Add pronoun set
                                                                                </button>
                                                                            </div>
                                                                            <div className={globals.verticalListTop}>
                                                                                {values.members[index].pronouns && values.members[index].pronouns.length > 0 ? (
                                                                                    values.members[index].pronouns.map((pronounSet, mbPindex) => (
                                                                                        <div
                                                                                            className={form_globals.horizlist}
                                                                                            key={index}
                                                                                        >
                                                                                            <div className={form_globals.horizlist}>
                                                                                                <Field
                                                                                                    type="text"
                                                                                                    name={`members.${index}.pronouns.${mbPindex}.0`}
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
                                                                                                    name={`members.${index}.pronouns.${mbPindex}.1`}
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
                                                                                                    name={`members.${index}.pronouns.${mbPindex}.2`}
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
                                                                                                    onClick={() => arrayPronounHelpers.remove(mbPindex)}
                                                                                                >
                                                                                                    remove
                                                                                                </button>
                                                                                                <button
                                                                                                    className={`${globals.buttonIcon}`}
                                                                                                    type="button"
                                                                                                    onClick={() =>
                                                                                                        arrayPronounHelpers.insert(mbPindex + 1, ["", "", ""])
                                                                                                    }
                                                                                                >
                                                                                                    add
                                                                                                </button>
                                                                                                <button
                                                                                                    className={`${globals.buttonIcon} ${
                                                                                                        mbPindex <= 0 ? form_globals.layoutButtonDisabled : ""
                                                                                                    }`}
                                                                                                    disabled={mbPindex <= 0}
                                                                                                    type="button"
                                                                                                    onClick={() =>
                                                                                                        arrayPronounHelpers.move(mbPindex, mbPindex - 1)
                                                                                                    }
                                                                                                >
                                                                                                    keyboard_arrow_up
                                                                                                </button>
                                                                                                <button
                                                                                                    className={`${globals.buttonIcon} ${
                                                                                                        mbPindex >= values.members[index].pronouns.length - 1
                                                                                                            ? form_globals.layoutButtonDisabled
                                                                                                            : ""
                                                                                                    }`}
                                                                                                    disabled={
                                                                                                        mbPindex >= values.members[index].pronouns.length - 1
                                                                                                    }
                                                                                                    type="button"
                                                                                                    onClick={() =>
                                                                                                        arrayPronounHelpers.move(mbPindex, mbPindex + 1)
                                                                                                    }
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
                                                                        </div>
                                                                    )}
                                                                />
                                                            </div>
                                                            <ErrorMessage
                                                                name={`members.${index}.pronouns`}
                                                                render={ErrorHandler}
                                                            />
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
                                                                    onClick={() => arrayHelpers.insert(index + 1, { name: "", pronouns: [["", "", ""]] })}
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
                                                                        index >= values.members.length - 1 ? form_globals.layoutButtonDisabled : ""
                                                                    }`}
                                                                    disabled={index >= values.members.length - 1}
                                                                    type="button"
                                                                    onClick={() => arrayHelpers.move(index, index + 1)}
                                                                >
                                                                    keyboard_arrow_down
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={`${globals.button}`}
                                                    type="button"
                                                    onClick={() => arrayHelpers.unshift({ name: "", pronouns: [["", "", ""]] })}
                                                >
                                                    Add members
                                                </button>
                                            </>
                                        )}
                                        <ErrorMessage
                                            name={`members`}
                                            render={ErrorHandler}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>description</p>
                                <span className={globals.text}>Describe your clan to us!</span>
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
                                <p className={globals.titleSmall}>Clan Color</p>
                                <span className={globals.text}>The color that represents your clan the most.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                {values.color != null && errors.color == null ? (
                                    <>
                                        <div className={globals.horizontalListLeft}>
                                            <span className={globals.text}>Red</span>
                                            <Field
                                                type="number"
                                                name="color.0"
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
                                                name="color.1"
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
                                                name="color.2"
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
                                        <span className={globals.text}>#{Color3.fromRGB(...values.color).toHex()}</span>
                                        <Box
                                            properties={{
                                                title: {
                                                    text: "This is a title."
                                                },
                                                theme: Color3.fromRGB(...values.color)
                                            }}
                                        >
                                            <span className={globals.text}>This is average text!</span>
                                            <button
                                                className={globals.button}
                                                type="button"
                                                onClick={() => {
                                                    setFieldValue("color", undefined);
                                                }}
                                            >
                                                Clear Clan Color
                                            </button>
                                        </Box>
                                    </>
                                ) : (
                                    <button
                                        className={globals.button}
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("color", [255, 255, 255]);
                                        }}
                                    >
                                        Add Clan Color
                                    </button>
                                )}
                            </div>

                            <ErrorMessage
                                name="color"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>PFP Image</p>
                                <span className={globals.text}>An image.</span>
                            </div>
                            <div className={form_globals.horizlist}>
                                <span className={globals.icon}>image</span>
                                <Field
                                    type="text"
                                    name="pfp"
                                    placeholder="https://example.com/"
                                    className={`
                                        ${form_globals.textLikeInput}
                                        ${form_globals.textLikeInputTight}
                                    `}
                                />
                            </div>
                            <ErrorMessage
                                name="pfp"
                                render={ErrorHandler}
                            />
                        </div>
                    </Box>
                    <Box properties={{ title: { text: "More" } }}>
                        <span className={globals.text}>Clan preferences, et cetera.</span>
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
                                    <span className={globals.text}>Allow others to draw fanart of your characters.</span>
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
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Fanart with other characters</p>
                                    <span className={globals.text}>Allow others to draw fanart of your characters with other characters.</span>
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
                                        <option value="yes">Allow this</option>
                                        <option value="ask">Require asking</option>
                                        <option value="no">Don't do this</option>
                                    </Field>
                                </div>
                                <div className={globals.verticalListTop}>
                                    <p className={globals.titleSmall}>Kinning</p>
                                    <span className={globals.text}>Allow others to kin your characters.</span>
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
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>BG Image</p>
                                <span className={globals.text}>An image that will display as a banner.</span>
                                <span className={globals.text}>Supporter/moderator only.</span>
                            </div>
                            <div className={form_globals.horizlist}>
                                <span className={globals.icon}>image</span>
                                <Field
                                    type="text"
                                    name="bgimage"
                                    placeholder="https://example.com/"
                                    className={`
                                        ${form_globals.textLikeInput}
                                        ${form_globals.textLikeInputTight}
                                    `}
                                />
                            </div>
                            <ErrorMessage
                                name="bgimage"
                                render={ErrorHandler}
                            />
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>CSS</p>
                                <span className={globals.text}>Styling that is applied when your user page is accessed.</span>
                                <span className={globals.text}>Supporter/moderator only.</span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <Field
                                    as="textarea"
                                    name="css"
                                    placeholder="CSS"
                                    className={`
                                    ${form_globals.textLikeInput}
                                    ${form_globals.textLikeInputMultiline}
                                    ${form_globals.textLikeInputMono}
                                `}
                                />
                                <ErrorMessage
                                    name="css"
                                    render={ErrorHandler}
                                />
                            </div>
                        </div>
                        <hr className={globals.invisep} />
                        <div className={globals.verticalListTop}>
                            <div className={form_globals.verticalListCrunch}>
                                <p className={globals.titleSmall}>Code</p>
                                <span className={globals.text}>
                                    The authentication code for your clan. If this is left blank, it will be randomly generated.
                                </span>
                            </div>
                            <div className={globals.verticalListTop}>
                                <div className={globals.horizontalListLeft}>
                                    <Field
                                        type="password"
                                        name="code"
                                        placeholder="Tim Sweeney"
                                        className={`
                                            ${form_globals.textLikeInput}
                                            ${form_globals.textLikeInputTight}
                                        `}
                                    />
                                </div>
                                <ErrorMessage
                                    name="code"
                                    render={ErrorHandler}
                                />
                            </div>
                            <div
                                className={`
                                ${form_globals.verticalListCrunch}
                                ${form_globals.layoutAppearable}
                                ${values.code != initialValues.code && errors.code == null ? form_globals.appear : ""}
                            `}
                            >
                                <span className={`${form_globals.render_info}`}>
                                    <span className={form_globals.iconSmall}>info</span>{" "}
                                    <span className={`${globals.text}`}>
                                        Make sure to make this somewhat secure! You can share this code with friends, but make sure you trust them.
                                    </span>
                                </span>
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
