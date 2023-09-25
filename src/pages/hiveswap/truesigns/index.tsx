import Box from "@/components/Box/Box";
import SignCard from "@/components/cards/SignCard/SignCard";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import {
    SignColorValues,
    TrueSignValues
} from "@/types/assist/extended_zodiac";
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
                    <span className={globals.text}>truesigns</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "True Signs"
                    }
                }}
            >
                <p className={globals.text}>Insert text here.</p>
            </Box>
            {SignColorValues.map((color, idx) => (
                <Box
                    key={"color" + idx}
                    properties={{
                        title: {
                            text: color.name
                        },
                        theme: new Color3(...color.color)
                    }}
                >
                    <p className={globals.text}>
                        An assortment of {color.name}-blooded signs.
                    </p>
                    <div className={globals.horizontalList}>
                        {TrueSignValues.filter(
                            x => x.color.name == color.name
                        ).map((sign, tsidx) => (
                            <SignCard
                                sign={sign}
                                key={"ts" + color.name + tsidx}
                            />
                        ))}
                    </div>
                </Box>
            ))}
        </>
    );
}
