/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
import { PronounGrouper } from "@/utility/language";
import Conditional, { ConditionalParent } from "@/utility/react/Conditional";
import Link from "next/link";
import FlairCard from "../FlairCard/FlairCard";
import styles from "./ClanCard.module.css";

export default function ClanCard({
    clan,
    link = true
}: {
    clan: ClientClan;
    link?: boolean;
}) {
    console.log(clan);
    return (
        <Box
            properties={{
                class: styles.ClanCard,
                theme: clan.color ? Color3.fromRGB(...clan.color) : undefined
            }}
        >
            <Conditional
                condition={link && clan.bgimage != null && clan.bgimage != ""}
            >
                <div className={styles.headerImage}>
                    <img
                        src={clan.bgimage as string}
                        alt=""
                    ></img>
                </div>
            </Conditional>
            <div className={styles.horizontal}>
                <Conditional condition={clan.pfp != null && clan.pfp != ""}>
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
                    <Conditional
                        condition={
                            clan.flairs != null && clan.flairs.length > 0
                        }
                    >
                        <div className={globals.horizontalListLeft}>
                            {clan.flairs?.map(flair => (
                                <FlairCard flair={flair} />
                            ))}
                        </div>
                    </Conditional>
                    <hr className={globals.invisep} />
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
                    <Conditional condition={clan.url != null && clan.url != ""}>
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
                    <Conditional condition={clan.description.length > 0}>
                        <p className={globals.iconText}>
                            <span className={globals.iconSmall}>
                                description
                            </span>
                            <span className={globals.text}>
                                {clan.description}
                            </span>
                        </p>
                    </Conditional>
                </div>
            </div>
        </Box>
    );
}
