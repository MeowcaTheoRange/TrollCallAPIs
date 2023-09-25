import Box from "@/components/Box/Box";
import SignCard from "@/components/cards/SignCard/SignCard";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import {
    SignColorValues,
    Sway,
    SwayKeys,
    SwayType,
    SwayValues,
    TrueSignValues
} from "@/types/assist/extended_zodiac";
import { ThemerGetSet } from "@/types/generics";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    sway
}: {
    themerVars: ThemerGetSet;
    sway: SwayType;
}) {
    useEffect(
        () =>
            setTheme([
                new Color3(...sway.color),
                new Color3(...sway.color).darken(50)
            ]),
        []
    );
    return (
        <>
            <Box properties={{}}>
                <p className={`${globals.iconText} ${globals.forceLTR}`}>
                    <span className={globals.icon}>arrow_back</span>
                    <Link
                        className={globals.link}
                        href="/hiveswap/"
                    >
                        <span className={globals.text}>hiveswap</span>
                    </Link>
                    <span className={globals.text}>/</span>
                    <Link
                        className={globals.link}
                        href="/hiveswap/aspects"
                    >
                        <span className={globals.text}>aspects</span>
                    </Link>
                    <span className={globals.text}>/</span>
                    <span className={globals.text}>{sway.name}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: sway.name
                    },
                    theme: new Color3(...sway.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/sway/${sway.name}.png`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>{sway.description}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "True Signs"
                    },
                    theme: new Color3(...sway.color).darken(70)
                }}
            >
                <hr className={globals.invisepHeader} />
                {SignColorValues.map((color, idx) => (
                    <>
                        <p className={globals.titleSmall}>{color.name}</p>
                        <hr className={globals.sepHeader} />
                        <div className={globals.horizontalList}>
                            {TrueSignValues.filter(
                                x =>
                                    x.sway.name == sway.name &&
                                    x.color.name == color.name
                            ).map((sign, tsidx) => (
                                <SignCard
                                    sign={sign}
                                    key={"ts" + sway.name + tsidx}
                                />
                            ))}
                        </div>
                    </>
                ))}
            </Box>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: SwayValues.map(sway => ({
            params: {
                name: sway.name
            }
        })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<{
    sway: SwayType;
}> = (context: GetStaticPropsContext) => {
    if (context.params?.name == null) return { notFound: true };
    const sway = context.params.name as string;
    if (!SwayKeys.includes(sway)) return { notFound: true };
    return {
        props: { sway: Sway[sway] }
    };
};
