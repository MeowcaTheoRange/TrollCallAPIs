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
import { defaultTheme } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import Link from "next/link";
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
        setTheme(defaultTheme);
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
                },
                {
                    character: "madeline_lol",
                    dialog: [
                        "AAAAAWAWAWAWAWAWWAJJKKOGJNKASNGllgnwklwa klw kflfwajniopfNOKPFOIWANIOPWNWONGOKWALGNW gkwognwipngwgnwiakopgl,"
                    ]
                },
                {
                    character: "madeline_lol",
                    dialog: [
                        "The quick red girl jumped over the giant mountain."
                    ]
                },
                {
                    character: "madeline_lol",
                    dialog: [
                        "BABBABABABABABAB ab abal bla  balb/@?>@?>!? !.rm1//.r1m /lm2/.2 2 2 2222/22//2/2//???@?@?2/2/2/2/2/2/2"
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
                <p className={globals.text}>
                    Here you can select some themes to test what TrollCall looks
                    like with ridiculous colors. It's pretty fun to try!
                </p>
                <p className={globals.text}>General themes</p>
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
                    <span className={globals.text}>-</span>
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
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 0, 0),
                                new Color3(0, 0, 0),
                                false
                            ])
                        }
                    >
                        AMOLED theme
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 1, 1),
                                new Color3(1, 1, 1),
                                true
                            ])
                        }
                    >
                        DELOMA theme
                    </button>
                </div>
                <p className={globals.text}>Coloured themes</p>
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
                        Rust theme
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
                        Bronze theme
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
                        Gold theme
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
                        Olive theme
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
                        Violet theme
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
                <p className={globals.text}>Experimental themes</p>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 0.5, 0.6),
                                new Color3(0, 0.1, 0.2),
                                theme[2]
                            ])
                        }
                    >
                        Celeste-ish
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.6, 0, 0),
                                new Color3(0.2, 0, 0),
                                theme[2]
                            ])
                        }
                    >
                        Time
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 0, 0.6),
                                new Color3(0.1, 0, 0.2),
                                theme[2]
                            ])
                        }
                    >
                        Rage
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 0.5, 0.6),
                                new Color3(0, 0, 0.1),
                                theme[2]
                            ])
                        }
                    >
                        Space
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 1, 0),
                                new Color3(0.5, 1, 0),
                                theme[2]
                            ])
                        }
                    >
                        Citrus
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0, 0),
                                new Color3(1, 0.75, 0),
                                theme[2]
                            ])
                        }
                    >
                        Hotdog
                    </button>
                </div>
                <p className={globals.text}>
                    Spectacular Comment Chain-adjacent themes
                </p>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.6, 0, 1),
                                new Color3(0, 0.5, 0.5),
                                false
                            ])
                        }
                    >
                        Lunar1314
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0.6, 0),
                                new Color3(0.5, 1, 1),
                                true
                            ])
                        }
                    >
                        Solar1314
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 1, 0),
                                new Color3(1, 1, 1),
                                theme[2]
                            ])
                        }
                    >
                        MrWaluigi
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0.5, 0.75),
                                new Color3(0.5, 0.25, 0.375),
                                theme[2]
                            ])
                        }
                    >
                        Madisongs
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(1, 0.25, 0.5),
                                new Color3(0.5, 0.125, 0.25),
                                theme[2]
                            ])
                        }
                    >
                        Badisongs
                    </button>
                    <span className={globals.text}>-</span>
                    <button
                        className={globals.buttonLink}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 0.9, 1),
                                new Color3(0.25, 0.45, 0.5),
                                theme[2]
                            ])
                        }
                    >
                        Addisongs
                    </button>
                </div>
                <p className={globals.text}>Vine funny themes</p>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0.5, 1, 0.5),
                                new Color3(1, 1, 1),
                                true
                            ])
                        }
                    >
                        White people be like
                    </button>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([
                                new Color3(0, 0.5, 0),
                                new Color3(0, 0, 0),
                                false
                            ])
                        }
                    >
                        Black people be like
                    </button>
                </div>
                <div className={globals.buttonRow}>
                    <a
                        className={globals.link}
                        href="https://youtu.be/raUjQRHMHIo"
                        target="_blank"
                    >
                        If you don't get the reference
                    </a>
                </div>
                <p className={globals.text}>User utility</p>
                <div className={globals.buttonRow}>
                    <button
                        className={globals.button}
                        onClick={() =>
                            setTheme([theme[0], theme[1], !theme[2]])
                        }
                    >
                        Invert theme palette
                    </button>
                </div>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "UI module"
                    }
                }}
            >
                <p className={globals.text}>Test all of the UI in TrollCall.</p>

                <p className={globals.title}>globals.title applied to p</p>
                <span className={globals.title}>
                    globals.title applied to span
                </span>
                <p className={globals.titleSmall}>
                    globals.titleSmall applied to p
                </p>
                <span className={globals.titleSmall}>
                    globals.titleSmall applied to span
                </span>
                <p className={globals.blockText}>
                    globals.blockText applied to p
                </p>
                <span className={globals.blockText}>
                    globals.blockText applied to span
                </span>
                <p className={globals.small}>globals.small applied to p</p>
                <span className={globals.small}>
                    globals.small applied to span
                </span>
                <p className={globals.mono}>globals.mono applied to p</p>
                <span className={globals.mono}>
                    globals.mono applied to span
                </span>
                <p className={globals.text}>globals.icon applied to p</p>
                <p className={globals.icon}>face</p>
                <p className={globals.text}>globals.icon applied to span</p>
                <span className={globals.icon}>face</span>
                <p className={globals.text}>globals.iconSmall applied to p</p>
                <p className={globals.iconSmall}>face</p>
                <p className={globals.text}>
                    globals.iconSmall applied to span
                </p>
                <span className={globals.iconSmall}>face</span>
                <p className={globals.text}>globals.iconlike applied to p</p>
                <p className={globals.iconlike}>HS</p>
                <p className={globals.text}>globals.iconlike applied to span</p>
                <span className={globals.iconlike}>HS</span>
                <Link
                    href="#link"
                    className={globals.link}
                    id="link"
                >
                    globals.link applied to a
                </Link>
                <button className={globals.button}>
                    globals.button applied to button
                </button>
                <Link
                    href="#linkButton"
                    className={globals.linkButton}
                    id="linkButton"
                >
                    globals.linkButton applied to a
                </Link>
                <button className={globals.buttonLink}>
                    globals.buttonLink applied to button
                </button>
            </Box>
        </>
    );
}
