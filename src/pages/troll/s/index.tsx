import Box from "@/components/Box/Box";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import { defaultTheme } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import { useEffect, useState } from "react";

getCookies();

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[]>([]);
    const [trollPageNum, setTrollPageNum] = useState(0);
    const [noMore, setNoMore] = useState(false);
    async function getTroll(page?: number) {
        const res = await fetch(
            page ? "/api/troll/.../" + page : "/api/troll/..."
        );
        const json = await res.json();
        setFetchedTrolls(fetchedTrolls.concat(json));
        setNoMore(json.length < 5);
    }
    useEffect(() => {
        getTroll(trollPageNum);
        setTheme(defaultTheme);
    }, [trollPageNum]);
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: "Explore characters"
                    }
                }}
            >
                <span className={globals.text}>
                    See a list of all the characters on TrollCall.
                </span>
            </Box>
            <Box>
                {fetchedTrolls.length <= 0 ? (
                    <>
                        <TrollSkeleton />
                        <TrollSkeleton />
                        <TrollSkeleton />
                    </>
                ) : (
                    <>
                        {fetchedTrolls.map((troll: ClientTroll, idx) => (
                            <TrollCard
                                troll={troll}
                                key={idx + "troll"}
                            />
                        ))}
                        <button
                            className={globals.button}
                            onClick={() => {
                                setTrollPageNum(trollPageNum + 1);
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
