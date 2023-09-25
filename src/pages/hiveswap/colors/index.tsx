import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import { SignColorValues } from "@/types/assist/extended_zodiac";
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
                    <span className={globals.text}>sway</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Sign Colors"
                    }
                }}
            >
                <p className={globals.text}>Insert text here.</p>
            </Box>
            {SignColorValues.map((color, idx) => (
                <Box
                    key={idx}
                    properties={{
                        title: {
                            text: color.name + ` (${color.sign})`,
                            link: `/hiveswap/colors/${color.name}`
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
                        <span className={globals.text}>
                            {color.description}
                        </span>
                    </p>
                </Box>
            ))}
        </>
    );
}
