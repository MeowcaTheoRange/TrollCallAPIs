import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import ClanSkeleton from "@/components/cards/ClanCard/ClanSkeleton";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ClientClan } from "@/types/clan";
import { ThemerGetSet } from "@/types/generics";
import { defaultTheme } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import { useEffect, useState } from "react";

getCookies();

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    const [fetchedClans, setFetchedClans] = useState<ClientClan[]>([]);
    const [clanPageNum, setClanPageNum] = useState(0);
    const [noMore, setNoMore] = useState(false);
    async function getClan(page?: number) {
        const res = await fetch(
            page ? "/api/clan/.../" + page : "/api/clan/..."
        );
        const json = await res.json();
        setFetchedClans(fetchedClans.concat(json));
        setNoMore(json.length < 5);
    }
    useEffect(() => {
        getClan(clanPageNum);
        setTheme(defaultTheme);
    }, [clanPageNum]);
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: "Explore clans"
                    }
                }}
            >
                <span className={globals.text}>
                    See a list of all the clans on TrollCall.
                </span>
            </Box>
            <Box>
                {fetchedClans.length <= 0 ? (
                    <>
                        <ClanSkeleton />
                        <ClanSkeleton />
                        <ClanSkeleton />
                    </>
                ) : (
                    <>
                        {fetchedClans.map((clan: ClientClan, idx) => (
                            <ClanCard
                                clan={clan}
                                key={idx + "clan"}
                            />
                        ))}
                        <button
                            className={globals.button}
                            onClick={() => {
                                setClanPageNum(clanPageNum + 1);
                            }}
                            disabled={noMore}
                        >
                            Load more
                        </button>
                    </>
                )}
            </Box>
        </>
    );
}
