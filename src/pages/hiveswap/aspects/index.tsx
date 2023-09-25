import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import { AspectValues } from "@/types/assist/extended_zodiac";
import { ThemerGetSet } from "@/types/generics";
import { hiveswapTheme } from "@/utility/react/Themer";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    useEffect(() => setTheme(hiveswapTheme), []);
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
                    <span className={globals.text}>aspects</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Aspects"
                    }
                }}
            >
                <p className={globals.text}>Insert text here.</p>
            </Box>
            {AspectValues.map((aspect, idx) => (
                <Box
                    key={idx}
                    properties={{
                        title: {
                            text: aspect.name,
                            link: `/hiveswap/aspects/${aspect.name}`
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
                        <span className={globals.text}>
                            {aspect.description}
                        </span>
                    </p>
                </Box>
            ))}
        </>
    );
}
