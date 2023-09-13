import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import { TrollGET } from "@/lib/trollcall/api/troll";
import { getSingleClan } from "@/lib/trollcall/clan";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { ThemerGetSet, WidthGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import { parseQuirk } from "@/utility/quirk";
import Conditional from "@/utility/react/Conditional";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Index({
    themerVars: [theme, setTheme],
    widthVars: [width, setWidth],
    troll
}: {
    themerVars: ThemerGetSet;
    widthVars: WidthGetSet;
    troll: ClientTroll;
}) {
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[] | null>(
        null
    );
    const trollColor = (troll.pageColor?.map(x => x / 255) ??
        troll.textColor?.map(x => x / 255) ??
        troll.falseSign?.color.color ??
        troll.trueSign?.color.color) as [number, number, number] | undefined;
    const policies = {
        fanart: troll.policies?.fanart ?? troll.owner.policies.fanart,
        fanartOthers:
            troll.policies?.fanartOthers ?? troll.owner.policies.fanartOthers,
        fanfiction:
            troll.policies?.fanfiction ?? troll.owner.policies.fanfiction,
        kinning: troll.policies?.kinning ?? troll.owner.policies.kinning,
        shipping: troll.policies?.shipping ?? troll.owner.policies.shipping
    };
    useEffect(() => {
        if (trollColor != null)
            setTheme([
                new Color3(...trollColor),
                new Color3(...trollColor).darken(50)
            ]);
    }, []);
    setWidth(1024);
    return (
        <>
            <div className={styles.boxbox}>
                <div className={styles.trollBox}>
                    <TrollCard
                        troll={troll}
                        link={false}
                        small={false}
                    />
                    <Box
                        properties={{
                            title: {
                                text: "More..."
                            }
                        }}
                    >
                        <Link
                            className={globals.linkButton}
                            href={`/gallery/${troll.owner.name}/${troll.name[0]}/`}
                        >
                            Gallery
                        </Link>
                    </Box>
                    <Box
                        properties={{
                            title: {
                                text: "About " + troll.name[0]
                            }
                        }}
                    >
                        <Box>
                            <p className={globals.titleSmall}>Policies</p>
                            <div className={globals.verticalListTop}>
                                <div className={globals.iconText}>
                                    <span className={globals.icon}>
                                        {policies.fanart === "yes"
                                            ? "check"
                                            : policies.fanart === "ask"
                                            ? "contact_support"
                                            : "close"}
                                    </span>
                                    <span className={globals.text}>Fanart</span>
                                </div>
                                <div className={globals.iconText}>
                                    <span className={globals.icon}>
                                        {policies.fanartOthers === "yes"
                                            ? "check"
                                            : policies.fanartOthers === "ask"
                                            ? "contact_support"
                                            : "close"}
                                    </span>
                                    <span className={globals.text}>
                                        Fanart Others
                                    </span>
                                </div>
                                <div className={globals.iconText}>
                                    <span className={globals.icon}>
                                        {policies.fanfiction === "yes"
                                            ? "check"
                                            : policies.fanfiction === "ask"
                                            ? "contact_support"
                                            : "close"}
                                    </span>
                                    <span className={globals.text}>
                                        Fanfiction
                                    </span>
                                </div>
                                <div className={globals.iconText}>
                                    <span className={globals.icon}>
                                        {policies.kinning === "yes"
                                            ? "check"
                                            : policies.kinning === "ask"
                                            ? "contact_support"
                                            : "close"}
                                    </span>
                                    <span className={globals.text}>
                                        Kinning
                                    </span>
                                </div>
                                <div className={globals.iconText}>
                                    <span className={globals.icon}>
                                        {policies.shipping === "yes"
                                            ? "check"
                                            : policies.shipping === "ask"
                                            ? "contact_support"
                                            : "close"}
                                    </span>
                                    <span className={globals.text}>
                                        Shipping
                                    </span>
                                </div>
                            </div>
                        </Box>
                        <Conditional
                            condition={
                                troll.preferences.love != null &&
                                troll.preferences.hate != null
                            }
                        >
                            <Box>
                                <p className={globals.titleSmall}>
                                    Preferences
                                </p>
                                <div className={globals.verticalListTop}>
                                    <Conditional
                                        condition={
                                            troll.preferences.love != null
                                        }
                                    >
                                        {troll.preferences.love?.map(
                                            (pref, i) => (
                                                <div
                                                    className={globals.iconText}
                                                >
                                                    <span
                                                        className={globals.icon}
                                                    >
                                                        thumb_up
                                                    </span>
                                                    <span
                                                        className={globals.text}
                                                    >
                                                        {pref}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </Conditional>
                                    <Conditional
                                        condition={
                                            troll.preferences.hate != null
                                        }
                                    >
                                        {troll.preferences.hate?.map(
                                            (pref, i) => (
                                                <div
                                                    className={globals.iconText}
                                                >
                                                    <span
                                                        className={globals.icon}
                                                    >
                                                        thumb_down
                                                    </span>
                                                    <span
                                                        className={globals.text}
                                                    >
                                                        {pref}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </Conditional>
                                </div>
                            </Box>
                        </Conditional>
                        <Conditional condition={troll.quotes != null}>
                            <Box>
                                <p className={globals.titleSmall}>Quotes</p>
                                {troll.quotes?.map((quote, i) => (
                                    <div className={globals.iconText}>
                                        <span className={globals.icon}>
                                            format_quote
                                        </span>
                                        <span className={globals.text}>
                                            {parseQuirk(
                                                quote,
                                                troll.quirks["default"]
                                            )}
                                        </span>
                                    </div>
                                ))}
                                <Link
                                    className={globals.linkButton}
                                    href={`/quirk/${troll.owner.name}/${troll.name[0]}/`}
                                >
                                    Quirk Tester
                                </Link>
                            </Box>
                        </Conditional>
                    </Box>
                </div>
                <div
                    className={styles.imageBox}
                    style={{ backgroundImage: `url("${troll.images[0]}")` }}
                ></div>
            </div>
            <Box
                properties={{
                    title: {
                        text: "Owned by"
                    }
                }}
            >
                <ClanCard clan={troll.owner} />
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Description"
                    }
                }}
            >
                <p className={globals.blockText}>{troll.description}</p>
            </Box>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{
    troll: ClientTroll;
}> = async (context: GetStaticPropsContext) => {
    if (context.params?.clan == null) return { notFound: true };
    const clan = await getSingleClan({
        name: context.params?.clan
    });
    if (clan == null)
        return {
            notFound: true
        };
    if (context.params?.troll == null) return { notFound: true };
    const troll = await TrollGET({ name: context.params.troll }, null, clan);
    if (troll == null)
        return {
            notFound: true
        };
    return {
        props: {
            troll
        }
    };
};
