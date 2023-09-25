import Ads from "@/components/Ads/Ads";
import Box from "@/components/Box/Box";
import Nav from "@/components/Nav/Nav";
import Credits from "@/components/template/credits";
import "@/styles/_app.css";
import "@/styles/global.module.css";
import globals from "@/styles/global.module.css";
import { ThemeGet, ThemeGetOpt } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import Themer, { ThemeModeContext, defaultTheme } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [theme, setTheme] = useState(defaultTheme as ThemeGet);
    function themeSetWrapper(themeSetter: ThemeGetOpt) {
        setTheme([
            themeSetter[0] ?? theme[0],
            themeSetter[1] ?? theme[1],
            themeSetter[2] ?? theme[2],
            themeSetter[3] ?? theme[3]
        ] as ThemeGet);
    }
    const cookies = getCookies() as {
        TROLLCALL_NAME: string;
        TROLLCALL_CODE: string;
    };
    // useEffect(() => {
    //     setTheme(defaultTheme);
    // }, [router.asPath]);
    return (
        <main className={"App" + (theme[3] ? " " + "inverted" : "")}>
            <Themer
                pri={theme[0]}
                sec={theme[1]}
                inverted={theme[3]}
            />
            <AuthContext.Provider value={cookies}>
                <Nav />
                <ThemeModeContext.Provider value={theme[3]}>
                    <div
                        className={"mainContent"}
                        style={{
                            maxWidth: theme[2]
                        }}
                    >
                        <Component
                            {...pageProps}
                            themerVars={[theme, themeSetWrapper]}
                        />
                        <Box
                            properties={{
                                title: {
                                    text: "TrollCall.xyz"
                                },
                                theme: theme[1]
                            }}
                        >
                            <Ads />
                            <p className={globals.horizontalList}>
                                <Link
                                    className={globals.link}
                                    href="/test"
                                >
                                    <span className={globals.text}>
                                        Testpage
                                    </span>
                                </Link>
                                <span className={globals.text}>-</span>
                                <Link
                                    className={globals.link}
                                    href="/help/credits"
                                >
                                    <span className={globals.text}>
                                        Open-source licenses & credits
                                    </span>
                                </Link>
                                <span className={globals.text}>-</span>
                                <Link
                                    className={globals.link}
                                    href="https://www.buymeacoffee.com/trollcall"
                                >
                                    <span className={globals.text}>
                                        Buy TrollCall a <b>sensible codebase</b>
                                    </span>
                                </Link>
                            </p>
                            <Credits />
                        </Box>
                    </div>
                </ThemeModeContext.Provider>
            </AuthContext.Provider>
        </main>
    );
}
