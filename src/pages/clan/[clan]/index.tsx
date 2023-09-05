import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import { ClanGET } from "@/lib/trollcall/api/clan";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import Conditional from "@/utility/react/Conditional";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    clan
}: {
    themerVars: ThemerGetSet;
    clan: ClientClan;
}) {
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[] | null>(
        null
    );
    useEffect(() => {
        async function getTroll() {
            const res = await fetch("/api/troll/" + clan.name + "/...");
            const json = await res.json();
            setFetchedTrolls(json);
        }
        getTroll();
        const color = clan.color?.map(x => x / 255) as [number, number, number];
        if (color != null)
            setTheme([new Color3(...color), new Color3(...color).darken(50)]);
    }, []);
    return (
        <>
            <Conditional condition={clan.bgimage != null}>
                <style>{`
main.App {
    background-image: linear-gradient(#0008, #0008), url(${clan.bgimage});
    background-size: cover;
    background-repeat: repeat;
    background-position: 50% 50%;
}
${clan.css ?? ""}
            `}</style>
            </Conditional>
            <ClanCard
                clan={clan}
                link={false}
            />
            <Box
                properties={{
                    title: {
                        text: "Clan Trolls",
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
            clan
        }
    };
};
