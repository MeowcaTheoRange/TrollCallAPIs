/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { TrueSignType } from "@/types/assist/extended_zodiac";
import { ClientTroll } from "@/types/troll";
import { pickRandom } from "@/utility/array";
import {
    AgeConverter,
    HeightConverter,
    PronounGrouper
} from "@/utility/language";
import { parseQuirk } from "@/utility/quirk";
import Conditional, { ConditionalParent } from "@/utility/react/Conditional";
import Link from "next/link";
import { useEffect, useState } from "react";
import FlairCard from "../FlairCard/FlairCard";
import SignCard from "../SignCard/SignCard";
import styles from "./TrollCard.module.css";

export default function TrollCard({
    troll,
    link = true,
    small = true
}: {
    troll: ClientTroll;
    link?: boolean;
    small?: boolean;
}) {
    const [randomLove, setRandomLove] = useState("");
    const [randomHate, setRandomHate] = useState("");
    const [randomQuote, setRandomQuote] = useState("");
    const trollColor = (troll.pageColor?.map(x => x / 255) ??
        troll.textColor?.map(x => x / 255) ??
        troll.falseSign?.color.color ??
        troll.trueSign?.color.color) as [number, number, number] | undefined;
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
                class: `${styles.TrollCard} ${
                    small ? "" : `${styles.TrollCardSmall} TrollCardSmall`
                }`,
                theme: trollColor ? new Color3(...trollColor) : undefined
            }}
        >
            <div className={styles.top}>
                <Conditional condition={small && troll.images.length >= 1}>
                    <div
                        className={styles.gridItem + " " + styles.primary}
                        style={{ backgroundImage: `url("${troll.images[0]}")` }}
                    ></div>
                </Conditional>
                <div className={styles.gridItem + " " + styles.secondary}>
                    <p
                        className={globals.title}
                        title={troll.name.join(" ")}
                    >
                        <ConditionalParent
                            condition={link}
                            parent={children => (
                                <Link
                                    href={`/troll/${troll.owner?.name ?? ""}/${
                                        troll.name[0]
                                    }`}
                                    className={globals.link}
                                >
                                    {children}
                                </Link>
                            )}
                        >
                            {troll.name.join(" ")}
                        </ConditionalParent>
                    </p>
                    <p className={globals.text}>
                        ({troll.pronunciation.join(" ")})
                    </p>
                    <Conditional condition={troll.username != null}>
                        <p className={globals.text}>
                            Also known as <b>{troll.username}</b> online.
                        </p>
                    </Conditional>
                    <Conditional
                        condition={
                            troll.flairs != null && troll.flairs.length > 0
                        }
                    >
                        <div className={globals.horizontalListLeft}>
                            {troll.flairs?.map(flair => (
                                <FlairCard flair={flair} />
                            ))}
                        </div>
                    </Conditional>
                    <hr className={globals.invisep} />
                    <Conditional
                        condition={
                            troll.class != null &&
                            troll.gender != null &&
                            troll.species != null
                        }
                    >
                        <p className={globals.horizontalList}>
                            <Conditional condition={troll.class != null}>
                                <span className={globals.text}>
                                    {troll.class?.name} of{" "}
                                    {troll.trueSign?.aspect.name}
                                </span>
                                <span className={globals.text}>-</span>
                            </Conditional>
                            <Conditional condition={troll.gender != null}>
                                <span className={globals.text}>
                                    {troll.gender}
                                </span>
                            </Conditional>
                            <Conditional
                                condition={
                                    troll.gender != null &&
                                    troll.species != null
                                }
                            >
                                <span className={globals.text}>-</span>
                            </Conditional>
                            <Conditional condition={troll.species != null}>
                                <span className={globals.text}>
                                    {troll.species}
                                </span>
                            </Conditional>
                        </p>
                    </Conditional>
                    <p className={globals.horizontalList}>
                        <span className={globals.text}>
                            {AgeConverter(troll.age)} old
                        </span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>
                            {HeightConverter(troll.height)}
                        </span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>
                            {PronounGrouper(troll.pronouns)}
                        </span>
                    </p>{" "}
                    <Conditional condition={troll.facts != null}>
                        <hr className={globals.invisep} />
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
                    </Conditional>{" "}
                    <Conditional condition={troll.trueSign != null}>
                        <hr className={globals.invisep} />
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
            <Conditional
                condition={
                    small &&
                    randomLove != "" &&
                    randomHate != "" &&
                    randomQuote != ""
                }
            >
                <div className={styles.bottom}>
                    <Conditional condition={randomLove != ""}>
                        <p className={globals.iconText}>
                            <span className={globals.iconSmall}>thumb_up</span>
                            <span className={globals.text}>{randomLove}</span>
                        </p>
                    </Conditional>
                    <Conditional condition={randomHate != ""}>
                        <p className={globals.iconText}>
                            <span className={globals.iconSmall}>
                                thumb_down
                            </span>
                            <span className={globals.text}>{randomHate}</span>
                        </p>
                    </Conditional>
                    <Conditional condition={randomQuote != ""}>
                        <p className={globals.iconText}>
                            <span className={globals.iconSmall}>
                                format_quote
                            </span>
                            <span className={globals.text}>
                                {troll.quirks != null
                                    ? parseQuirk(
                                          randomQuote,
                                          troll.quirks["default"]
                                      )
                                    : randomQuote}
                            </span>
                        </p>
                    </Conditional>
                </div>
            </Conditional>
        </Box>
    );
}
