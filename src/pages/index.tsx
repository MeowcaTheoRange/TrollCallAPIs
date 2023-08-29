import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import ClanSkeleton from "@/components/cards/ClanCard/ClanSkeleton";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ClientClan } from "@/types/clan";
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
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[] | null>(
        null
    );
    const [fetchedClans, setFetchedClans] = useState<ClientClan[] | null>(null);
    useEffect(() => {
        async function getTroll() {
            const res = await fetch("/api/troll/...");
            const json = await res.json();
            setFetchedTrolls(json);
        }
        getTroll();
        async function getClan() {
            const res = await fetch("/api/clan/...");
            const json = await res.json();
            setFetchedClans(json);
        }
        getClan();
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
                        text: "List of characters",
                        small: true
                    }
                }}
            >
                {/* <span className={globals.text}>
                    This is a series of cards that represent the most important
                    aspects of TrollCall.
                </span> */}
                {fetchedTrolls == null ? (
                    <>
                        <TrollSkeleton />
                        <TrollSkeleton />
                        <TrollSkeleton />
                    </>
                ) : (
                    fetchedTrolls.map((troll: ClientTroll, idx) => (
                        <TrollCard troll={troll} />
                    ))
                )}
            </Box>
            <Box
                properties={{
                    title: {
                        text: "List of clans",
                        small: true
                    }
                }}
            >
                {/* <span className={globals.text}>
                    This is a series of cards that represent the most important
                    aspects of TrollCall.
                </span> */}
                {fetchedClans == null ? (
                    <>
                        <ClanSkeleton />
                        <ClanSkeleton />
                        <ClanSkeleton />
                    </>
                ) : (
                    fetchedClans.map((clan: ClientClan, idx) => (
                        <ClanCard clan={clan} />
                    ))
                )}
            </Box>
        </>
    );
}
