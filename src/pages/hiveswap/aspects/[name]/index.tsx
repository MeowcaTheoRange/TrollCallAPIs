import Box from "@/components/Box/Box";
import SignCard from "@/components/cards/SignCard/SignCard";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import {
    Aspect,
    AspectKeys,
    AspectType,
    AspectValues,
    TrueSignValues
} from "@/types/assist/extended_zodiac";
import { ThemerGetSet } from "@/types/generics";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    aspect
}: {
    themerVars: ThemerGetSet;
    aspect: AspectType;
}) {
    useEffect(
        () =>
            setTheme([
                new Color3(...aspect.color),
                new Color3(...aspect.color).darken(50)
            ]),
        []
    );
    return (
        <>
            <Box properties={{}}>
                <p className={globals.iconText}>
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
                    <span className={globals.text}>{aspect.name}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: aspect.name
                    },
                    theme: new Color3(...aspect.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/aspect/${aspect.name}.svg`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>{aspect.description}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "True Signs"
                    },
                    theme: new Color3(...aspect.color).darken(70)
                }}
            >
                <div className={globals.horizontalList}>
                    {TrueSignValues.filter(
                        x => x.aspect.name == aspect.name
                    ).map((sign, tsidx) => (
                        <SignCard
                            sign={sign}
                            key={"ts" + aspect.name + tsidx}
                        />
                    ))}
                </div>
            </Box>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: AspectValues.map(aspect => ({
            params: {
                name: aspect.name
            }
        })),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<{
    aspect: AspectType;
}> = (context: GetStaticPropsContext) => {
    if (context.params?.name == null) return { notFound: true };
    const aspect = context.params.name as string;
    if (!AspectKeys.includes(aspect)) return { notFound: true };
    return {
        props: { aspect: Aspect[aspect] }
    };
};
