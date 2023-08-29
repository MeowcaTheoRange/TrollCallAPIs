/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { TrueSignType } from "@/types/assist/extended_zodiac";
import { ClientTroll } from "@/types/troll";
import { pickRandom } from "@/utility/array";
import { AgeConverter, PronounGrouper } from "@/utility/language";
import { parseQuirk } from "@/utility/quirk";
import Conditional from "@/utility/react/Conditional";
import Link from "next/link";
import { useEffect, useState } from "react";
import SignCard from "../SignCard/SignCard";
import styles from "./TrollCard.module.css";

export default function TrollCard({ troll }: { troll: ClientTroll }) {
    const [randomLove, setRandomLove] = useState("");
    const [randomHate, setRandomHate] = useState("");
    const [randomQuote, setRandomQuote] = useState("");
    const trollColor =
        troll.pageColor ??
        troll.textColor ??
        troll.falseSign?.color.color ??
        troll.trueSign?.color.color;
    useEffect(() => {
        if (troll.preferences.love != null && troll.preferences.love.length > 0)
            setRandomLove(pickRandom(troll.preferences.love));
        if (troll.preferences.hate != null && troll.preferences.hate.length > 0)
            setRandomHate(pickRandom(troll.preferences.hate));
        if (troll.quotes != null && troll.quotes.length > 0)
            setRandomQuote(pickRandom(troll.quotes));
    }, []);
    return (
        <Box
            properties={{
                class: styles.TrollCard,
                theme: trollColor ? Color3.fromRGB(...trollColor) : undefined
            }}
        >
            <div className={styles.top}>
                <Conditional condition={troll.images.length > 0}>
                    <div className={styles.gridItem + " " + styles.primary}>
                        <img
                            src={troll.images[0]}
                            className={styles.topImage}
                            alt=""
                        ></img>
                    </div>
                </Conditional>
                <div className={styles.gridItem + " " + styles.secondary}>
                    <p className={globals.title}>
                        <Link
                            href={`/troll/${troll.owner?.name ?? ""}/${
                                troll.name[0]
                            }`}
                            className={globals.link}
                        >
                            {troll.name.join(" ")}
                        </Link>
                    </p>
                    <p className={globals.text}>
                        ({troll.pronunciation.join(" ")})
                    </p>
                    <p className={globals.text}>
                        Also known as <b>{troll.username}</b> online.
                    </p>
                    <br />
                    <p className={globals.horizontalListLeft}>
                        <span className={globals.text}>
                            {AgeConverter(troll.age, true)}
                        </span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>{troll.gender}</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>
                            {PronounGrouper(troll.pronouns)}
                        </span>
                    </p>
                    <br />
                    <Conditional condition={troll.facts != null}>
                        <ul>
                            {troll.facts?.map((fact, index) => (
                                <li
                                    key={index}
                                    className={globals.text}
                                >
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </Conditional>
                    <br />
                    <Conditional condition={troll.trueSign != null}>
                        <div
                            className={
                                styles.stack +
                                (troll.falseSign == null
                                    ? " " + styles.noFalseSign
                                    : "")
                            }
                        >
                            <Conditional condition={troll.falseSign != null}>
                                <SignCard
                                    sign={troll.falseSign as TrueSignType}
                                />
                            </Conditional>
                            <Conditional condition={troll.trueSign != null}>
                                <SignCard
                                    sign={troll.trueSign as TrueSignType}
                                />
                            </Conditional>
                        </div>
                    </Conditional>
                </div>
            </div>
            <div className={styles.bottom}>
                <Conditional condition={randomLove != ""}>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>thumb_up</span>
                        <span className={globals.text}>{randomLove}</span>
                    </p>
                </Conditional>
                <Conditional condition={randomHate != ""}>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>thumb_down</span>
                        <span className={globals.text}>{randomHate}</span>
                    </p>
                </Conditional>
                <Conditional condition={randomQuote != ""}>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>format_quote</span>
                        <span className={globals.text}>
                            {parseQuirk(randomQuote, troll.quirks["default"])}
                        </span>
                    </p>
                </Conditional>
            </div>
        </Box>
    );
}
