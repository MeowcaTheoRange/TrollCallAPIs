import Box from "@/components/Box/Box";
import SignCard from "@/components/cards/SignCard/SignCard";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import {
    SignColor,
    SignColorKeys,
    SignColorType,
    SignColorValues,
    TrueSignValues
} from "@/types/assist/extended_zodiac";
import { ThemerGetSet } from "@/types/generics";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    color
}: {
    themerVars: ThemerGetSet;
    color: SignColorType;
}) {
    useEffect(
        () =>
            setTheme([
                new Color3(...color.color),
                new Color3(...color.color).darken(50)
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
                    <span className={globals.text}>{color.name}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: color.name + ` (${color.sign})`
                    },
                    theme: new Color3(...color.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/signs/${color.name}/${color.sign}.svg`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>{color.description}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "True Signs"
                    }
                }}
            >
                <div className={globals.horizontalList}>
                    {TrueSignValues.filter(x => x.color.name == color.name).map(
                        (sign, tsidx) => (
                            <SignCard
                                sign={sign}
                                key={"ts" + color.name + tsidx}
                            />
                        )
                    )}
                </div>
            </Box>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: SignColorValues.map(color => ({
            params: {
                name: color.name
            }
        })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<{
    color: SignColorType;
}> = (context: GetStaticPropsContext) => {
    if (context.params?.name == null) return { notFound: true };
    const color = context.params.name as string;
    if (!SignColorKeys.includes(color)) return { notFound: true };
    return {
        props: { color: SignColor[color] }
    };
};
