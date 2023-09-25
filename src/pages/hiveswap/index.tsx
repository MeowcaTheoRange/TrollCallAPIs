import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ThemerGetSet } from "@/types/generics";
import { hiveswapTheme } from "@/utility/react/Themer";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    // Make universal theme
    useEffect(() => setTheme(hiveswapTheme), []);
    return (
        <>
            <Box>
                <p className={`${globals.iconText} ${globals.forceLTR}`}>
                    <span className={globals.icon}>arrow_back</span>
                    <span className={globals.text}>hiveswap</span>
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Hiveswap"
                    }
                }}
            >
                <p className={globals.text}>
                    Welcome to the Hiveswap portion of TrollCall. Here we pay
                    homage to the original{" "}
                    <Link
                        className={globals.link}
                        href="http://hs.hiveswap.com/ezodiac/"
                    >
                        Extended Zodiac
                    </Link>{" "}
                    website by providing its services, but this time, in a kind
                    of cool modern statically generated way.
                </p>
                <p className={globals.text}>Also, original writing.</p>
                <hr className={globals.sep} />
                <p className={globals.title}>Aspects</p>
                <p>Insert text here.</p>
                <div className={globals.buttonLeft}>
                    <Link
                        className={globals.linkButton}
                        href="/hiveswap/aspects"
                    >
                        Go to Aspects page
                    </Link>
                    <hr className={globals.sep} />
                </div>
                <hr className={globals.invisep} />
                <p className={globals.title}>Sway</p>
                <p>Insert text here.</p>
                <div className={globals.buttonLeft}>
                    <Link
                        className={globals.linkButton}
                        href="/hiveswap/sway"
                    >
                        Go to Sway page
                    </Link>
                    <hr className={globals.sep} />
                </div>
                <hr className={globals.invisep} />
                <p className={globals.title}>Sign Colors</p>
                <p>Insert text here.</p>
                <div className={globals.buttonLeft}>
                    <Link
                        className={globals.linkButton}
                        href="/hiveswap/colors"
                    >
                        Go to Sign Colors page
                    </Link>
                    <hr className={globals.sep} />
                </div>
                <hr className={globals.invisep} />
                <p className={globals.title}>True Signs</p>
                <p>Insert text here.</p>
                <div className={globals.buttonLeft}>
                    <Link
                        className={globals.linkButton}
                        href="/hiveswap/truesigns"
                    >
                        Go to True Signs page
                    </Link>
                    <hr className={globals.sep} />
                </div>
            </Box>
        </>
    );
}
