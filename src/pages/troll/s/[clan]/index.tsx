import Box from "@/components/Box/Box";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import { ClanGET } from "@/lib/trollcall/api/clan";
import { cutObject } from "@/lib/trollcall/utility/merge";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import { defaultTheme } from "@/utility/react/Themer";
import { getCookies } from "cookies-next";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";

getCookies();

export default function Index({
    themerVars: [theme, setTheme],
    clan
}: {
    themerVars: ThemerGetSet;
    clan: ClientClan;
}) {
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[]>([]);
    const [trollPageNum, setTrollPageNum] = useState(0);
    const [noMore, setNoMore] = useState(false);
    async function getTroll(page?: number) {
        const res = await fetch(
            page
                ? "/api/troll/" + clan.name + "/.../" + page
                : "/api/troll/" + clan.name + "/..."
        );
        const json = await res.json();
        setFetchedTrolls(fetchedTrolls.concat(json));
        setNoMore(json.length < 5);
    }
    useEffect(() => {
        getTroll(trollPageNum);
        setTheme(defaultTheme);
        const color = clan.color?.map(x => x / 255) as [number, number, number];
        if (color != null)
            setTheme([
                new Color3(...color),
                new Color3(...color).darken(50),
                768
            ]);
    }, [trollPageNum]);
    return (
        <>
            <Box
                properties={{
                    title: {
                        text:
                            "Characters of  " + (clan.displayName ?? clan.name)
                    }
                }}
            >
                <span className={globals.text}>
                    See a list of the characters of{" "}
                    {clan.displayName ?? clan.name}.
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

export const getServerSideProps: GetServerSideProps<{
    clan: ClientClan;
}> = async (context: GetStaticPropsContext) => {
    if (context.params?.clan == null) return { notFound: true };
    const clan = await ClanGET({ name: context.params.clan });
    if (clan == null)
        return {
            notFound: true
        };
    return {
        props: {
            clan: cutObject(clan)
        }
    };
};
