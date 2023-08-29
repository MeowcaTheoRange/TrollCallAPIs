import Box from "@/components/Box/Box";
import CelesteBox from "@/components/CelesteBox/CelesteBox";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import ClanSkeleton from "@/components/cards/ClanCard/ClanSkeleton";
import SignCard from "@/components/cards/SignCard/SignCard";
import SignSkeleton from "@/components/cards/SignCard/SignSkeleton";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import { getCookies } from "cookies-next";
import { useEffect, useState } from "react";

getCookies();

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    const [fetchedTroll, setFetchedTroll] = useState<ClientTroll | null>(null);
    useEffect(() => {
        async function getTroll() {
            const res = await fetch("/api/troll/meowcatheorange/traobi");
            const json = await res.json();
            setFetchedTroll(json);
        }
        getTroll();
    }, []);

    const [openCB, CelesteBoxInstance] = CelesteBox({
        dialogList: {
            name: "CelesteBoxTest",
            list: [
                {
                    character: "madeline_lol",
                    dialog: [
                        "Hello, ",
                        {
                            effects: { style: { color: "#8000FF" } },
                            text: "world! "
                        },
                        {
                            effects: {
                                style: { color: "#FFFF00" }
                            },
                            text: [
                                "This is a ",
                                {
                                    effects: {
                                        className: "wavy"
                                    },
                                    text: "test"
                                },
                                ".\n"
                            ]
                        },
                        "I am very proud of myself for making this!"
                    ]
                }
            ]
        }
    });
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: '"Hello, world!"'
                    }
                }}
            >
                <span className={globals.text}>
                    Welcome to the TrollCall test page! Here you will find some
                    fun stuff that you can mess around with.
                </span>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Cards module"
                    }
                }}
            >
                <span className={globals.text}>
                    This is a series of cards that represent the most important
                    aspects of TrollCall.
                </span>
                {fetchedTroll == null ? (
                    <TrollSkeleton />
                ) : (
                    <TrollCard troll={fetchedTroll} />
                )}
                {fetchedTroll == null ? (
                    <ClanSkeleton />
                ) : (
                    <ClanCard clan={fetchedTroll.owner} />
                )}
                {fetchedTroll == null ? (
                    <SignSkeleton />
                ) : fetchedTroll.trueSign != null ? (
                    <SignCard sign={fetchedTroll.trueSign} />
                ) : (
                    <></>
                )}
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Skeletons module"
                    }
                }}
            >
                <p className={globals.text}>Troll Skeleton</p>
                <TrollSkeleton />
                <p className={globals.text}>Clan Skeleton</p>
                <ClanSkeleton />
                <p className={globals.text}>Sign Skeleton</p>
                <SignSkeleton />
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Celeste module"
                    }
                }}
            >
                <button
                    className={globals.button}
                    onClick={() => openCB()}
                >
                    Open the Box
                </button>
                {CelesteBoxInstance}
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Themer module"
                    }
                }}
            >
                <div className={globals.buttonRow}>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0, 0),
                                new Color3(0.5, 0, 0),
                                theme[2]
                            ])
                        }
                    >
                        Red theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0.5, 0),
                                new Color3(0.5, 0.25, 0),
                                theme[2]
                            ])
                        }
                    >
                        Orange theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 1, 0),
                                new Color3(0.5, 0.5, 0),
                                theme[2]
                            ])
                        }
                    >
                        Yellow theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 1, 0),
                                new Color3(0.25, 0.5, 0),
                                theme[2]
                            ])
                        }
                    >
                        Lime theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 1, 0),
                                new Color3(0, 0.5, 0),
                                theme[2]
                            ])
                        }
                    >
                        Green theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 1, 0.5),
                                new Color3(0, 0.5, 0.25),
                                theme[2]
                            ])
                        }
                    >
                        Jade theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 1, 1),
                                new Color3(0, 0.5, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Teal theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 0.5, 1),
                                new Color3(0, 0.25, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Indigo theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 0, 1),
                                new Color3(0, 0, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Blue theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 0, 1),
                                new Color3(0.25, 0, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Purple theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0, 1),
                                new Color3(0.5, 0, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Pink theme
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0, 0.5),
                                new Color3(0.5, 0, 0.25),
                                theme[2]
                            ])
                        }
                    >
                        Fuchsia theme
                    </button>
                </div>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.9, 0.9, 0.8),
                                new Color3(0.7, 0.7, 0.6),
                                theme[2]
                            ])
                        }
                    >
                        Default theme
                    </button>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 0.5, 0.4),
                                new Color3(0.1, 0.1, 0),
                                theme[2]
                            ])
                        }
                    >
                        HC theme
                    </button>
                </div>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([theme[0], theme[1], !theme[2]])
                        }
                    >
                        Invert current theme
                    </button>
                </div>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Scroll module"
                    }
                }}
            >
                <p className={globals.text}>Blah blah blah</p>
                <p className={globals.text}>Blah blah blah</p>
                <p className={globals.text}>Blah blah blah</p>
                <p className={globals.text}>Blah blah blah</p>
                <p className={globals.text}>Blah blah blah</p>
                <p className={globals.text}>Blah blah blah</p>
            </Box>
        </>
    );
}
