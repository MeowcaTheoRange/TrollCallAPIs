import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import {
    TrueSign,
    TrueSignKeys,
    TrueSignType,
    TrueSignValues
} from "@/types/assist/extended_zodiac";
import { ThemerGetSet } from "@/types/generics";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    trueSign
}: {
    themerVars: ThemerGetSet;
    trueSign: TrueSignType;
}) {
    useEffect(
        () =>
            setTheme([
                new Color3(...trueSign.color.color),
                new Color3(...trueSign.color.color).darken(50)
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
                        href="/hiveswap/truesigns"
                    >
                        <span className={globals.text}>truesigns</span>
                    </Link>
                    <span className={globals.text}>/</span>
                    <span className={globals.text}>{trueSign.name}</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: trueSign.name
                    },
                    theme: new Color3(...trueSign.color.color)
                }}
            >
                <p className={globals.iconTextTop}>
                    <img
                        className={globals.signage}
                        src={`/assets/signs/${trueSign.color.name}/${trueSign.name}.svg`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>
                        The True Sign of {trueSign.name} represents the{" "}
                        {trueSign.color.name}-blooded in the world, those who
                        are {trueSign.aspect.name}-bound and occupy the{" "}
                        {trueSign.sway.name} dream realm.
                    </span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: trueSign.color.name + ` (${trueSign.color.sign})`,
                        link: "/hiveswap/colors/" + trueSign.color.name
                    },
                    theme: new Color3(...trueSign.color.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/signs/${trueSign.color.name}/${trueSign.color.sign}.svg`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>
                        {trueSign.color.description}
                    </span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: trueSign.aspect.name + "-bound",
                        link: "/hiveswap/aspects/" + trueSign.aspect.name
                    },
                    theme: new Color3(...trueSign.aspect.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/aspect/${trueSign.aspect.name}.svg`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>
                        {trueSign.aspect.description}
                    </span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: trueSign.sway.name + "",
                        link: "/hiveswap/sway/" + trueSign.sway.name
                    },
                    theme: new Color3(...trueSign.sway.color)
                }}
            >
                <p className={globals.iconText}>
                    <img
                        className={globals.signage}
                        src={`/assets/sway/${trueSign.sway.name}.png`}
                        width="64"
                        height="64"
                    ></img>
                    <span className={globals.text}>
                        {trueSign.sway.description}
                    </span>
                </p>
            </Box>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: TrueSignValues.map(trueSign => ({
            params: {
                name: trueSign.name
            }
        })),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<{
    trueSign: TrueSignType;
}> = (context: GetStaticPropsContext) => {
    if (context.params?.name == null) return { notFound: true };
    const trueSign = context.params.name as string;
    if (!TrueSignKeys.includes(trueSign)) return { notFound: true };
    return {
        props: { trueSign: TrueSign[trueSign] }
    };
};
