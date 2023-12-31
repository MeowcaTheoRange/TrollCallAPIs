import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import ClanSkeleton from "@/components/cards/ClanCard/ClanSkeleton";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
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
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[]>([]);
    const [fetchedClans, setFetchedClans] = useState<ClientClan[]>([]);
    async function getTroll(page?: number) {
        const res = await fetch(
            page ? "/api/troll/.../" + page : "/api/troll/..."
        );
        const json = await res.json();
        setFetchedTrolls(json);
    }
    async function getClan(page?: number) {
        const res = await fetch(
            page ? "/api/clan/.../" + page : "/api/clan/..."
        );
        const json = await res.json();
        setFetchedClans(json);
    }
    useEffect(() => {
        getTroll(0);
        getClan(0);
        setTheme(defaultTheme);
    }, []);
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: "Hello!"
                    }
                }}
            >
                <span className={globals.text}>Welcome to TrollCall!</span>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Hiveswap"
                    },
                    theme: new Color3(0.25, 0, 0.5)
                }}
            >
                <span className={globals.text}>
                    Indulge yourself within the Extended Zodiac and its effects
                    on... everything, I guess.
                </span>
                <Link
                    className={globals.linkButton}
                    href="/hiveswap"
                >
                    Enter the Hiveswap section
                </Link>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Current characters",
                        link: "/troll/s",
                        small: true
                    }
                }}
            >
                {fetchedTrolls == null ? (
                    <>
                        <TrollSkeleton />
                        <TrollSkeleton />
                        <TrollSkeleton />
                    </>
                ) : (
                    fetchedTrolls.map((troll: ClientTroll, idx) => (
                        <TrollCard
                            troll={troll}
                            key={idx + "troll"}
                        />
                    ))
                )}
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Current clans",
                        link: "/clan/s",
                        small: true
                    }
                }}
            >
                {fetchedClans == null ? (
                    <>
                        <ClanSkeleton />
                        <ClanSkeleton />
                        <ClanSkeleton />
                    </>
                ) : (
                    fetchedClans.map((clan: ClientClan, idx) => (
                        <ClanCard
                            clan={clan}
                            key={idx + "clan"}
                        />
                    ))
                )}
            </Box>
        </>
    );
}
