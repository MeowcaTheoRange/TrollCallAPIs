import Ads from "@/components/Ads/Ads";
import Box from "@/components/Box/Box";
import Nav from "@/components/Nav/Nav";
import "@/styles/_app.css";
import "@/styles/global.module.css";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import AuthContext from "@/utility/react/AuthContext";
import Themer, { ThemeModeContext } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState([
        new Color3(0.9, 0.9, 0.8),
        new Color3(0.7, 0.7, 0.6),
        false
    ] as [Color3, Color3, boolean?]);
    const [width, setWidth] = useState(768);
    const cookies = getCookies() as {
        TROLLCALL_NAME: string;
        TROLLCALL_CODE: string;
    };
    return (
        <main className={"App" + (theme[2] ? " " + "inverted" : "")}>
            <Themer
                pri={theme[0]}
                sec={theme[1]}
                inverted={theme[2]}
            />
            <AuthContext.Provider value={cookies}>
                <Nav />
                <ThemeModeContext.Provider value={theme[2]}>
                    <div
                        className={"mainContent"}
                        style={{
                            maxWidth: width
                        }}
                    >
                        <Component
                            {...pageProps}
                            themerVars={[theme, setTheme]}
                            widthVars={[width, setWidth]}
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
                            <p className={globals.text}>
                                TrollCall rev. 4 created by MeowcaTheoRange.
                            </p>
                            <p className={globals.text}>
                                <b>trollcall.xyz</b> domain owned by Redact.
                            </p>
                            <p className={globals.text}>
                                The TrollCall name is derived from the original
                                Hiveswap Troll Call. The name may be used in an
                                entity context or a project context.
                            </p>
                            <p className={globals.text}>
                                The textboxes found in the [INSERT PAGE HERE]
                                are inspired by those from the game{" "}
                                <b>Celeste</b>.
                            </p>
                            <p>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://github.com/MeowcaTheoRange/Fonts"
                                    >
                                        TrollCall Display
                                    </Link>{" "}
                                    font by MeowcaTheoRange.
                                </span>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://fonts.google.com/specimen/Space+Grotesk"
                                    >
                                        Space Grotesk
                                    </Link>{" "}
                                    font by Florian Karsten.
                                </span>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://fonts.google.com/specimen/Space+Mono"
                                    >
                                        Space Mono
                                    </Link>{" "}
                                    font by Colophon Foundry.
                                </span>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://fonts.google.com/specimen/Poppins"
                                    >
                                        Poppins
                                    </Link>{" "}
                                    font by Indian Type Foundry.
                                </span>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://fonts.google.com/specimen/Flow+Circular"
                                    >
                                        Flow Circular
                                    </Link>{" "}
                                    font by Dan Ross.
                                </span>
                                <span className={globals.blockText}>
                                    <Link
                                        className={globals.link}
                                        href="https://www.creativefabrica.com/product/renogare/"
                                    >
                                        Renogare
                                    </Link>{" "}
                                    font by Deepak Dogra.
                                </span>
                            </p>
                            <p className={globals.text}>
                                Homestuck and HIVESWAP © Homestuck Inc.
                            </p>
                        </Box>
                    </div>
                </ThemeModeContext.Provider>
            </AuthContext.Provider>
        </main>
    );
}
