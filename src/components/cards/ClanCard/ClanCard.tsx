/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
import { PronounGrouper } from "@/utility/language";
import Conditional, { ConditionalParent } from "@/utility/react/Conditional";
import Link from "next/link";
import styles from "./ClanCard.module.css";

export default function ClanCard({
    clan,
    link = true
}: {
    clan: ClientClan;
    link?: boolean;
}) {
    return (
        <Box
            properties={{
                class: styles.ClanCard,
                theme: clan.color ? Color3.fromRGB(...clan.color) : undefined
            }}
        >
            <Conditional condition={link && clan.bgimage != null}>
                <div className={styles.headerImage}>
                    <img
                        src={clan.bgimage as string}
                        alt=""
                    ></img>
                </div>
            </Conditional>
            <div className={styles.horizontal}>
                <Conditional condition={clan.pfp != null}>
                    <div className={styles.horizontalLeft}>
                        <img
                            src={clan.pfp as string}
                            width="96"
                            height="96"
                            alt=""
                        ></img>
                    </div>
                </Conditional>
                <div className={styles.horizontalRight}>
                    <p
                        className={globals.title}
                        title={clan.displayName ?? clan.name}
                    >
                        <ConditionalParent
                            condition={link}
                            parent={children => (
                                <Link
                                    href={`/clan/${clan.name}`}
                                    className={globals.link}
                                >
                                    {children}
                                </Link>
                            )}
                        >
                            {clan.displayName ?? clan.name}
                        </ConditionalParent>
                    </p>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>group</span>
                        <span className={globals.text}>
                            {clan.members
                                .map(
                                    member =>
                                        `${member.name} (${PronounGrouper(
                                            member.pronouns
                                        )})`
                                )
                                .join(", ")}
                        </span>
                    </p>
                    <Conditional condition={clan.url != null}>
                        <p className={globals.iconText}>
                            <span className={globals.iconSmall}>link</span>
                            <span className={globals.text}>
                                <Link
                                    href={clan.url as string}
                                    className={globals.link}
                                >
                                    {clan.url}
                                </Link>
                            </span>
                        </p>
                    </Conditional>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>description</span>
                        <span className={globals.text}>{clan.description}</span>
                    </p>
                </div>
            </div>
        </Box>
    );
}
