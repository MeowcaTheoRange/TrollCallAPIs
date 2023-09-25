import Box from "@/components/Box/Box";
import ClanCard from "@/components/cards/ClanCard/ClanCard";
import TrollCard from "@/components/cards/TrollCard/TrollCard";
import TrollSkeleton from "@/components/cards/TrollCard/TrollSkeleton";
import { ClanGET } from "@/lib/trollcall/api/clan";
import { cutObject } from "@/lib/trollcall/utility/merge";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { ClientClan } from "@/types/clan";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import AuthContext from "@/utility/react/AuthContext";
import Conditional from "@/utility/react/Conditional";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Index({
    themerVars: [theme, setTheme],
    clan
}: {
    themerVars: ThemerGetSet;
    clan: ClientClan;
}) {
    // Get user creds
    const userCredentials = useContext(AuthContext);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    // Get user trolls
    const [fetchedTrolls, setFetchedTrolls] = useState<ClientTroll[] | null>(
        null
    );

    async function getTroll(page?: number) {
        const res = await fetch(
            page
                ? "/api/troll/" + clan.name + "/.../" + page
                : "/api/troll/" + clan.name + "/..."
        );
        const json = await res.json();
        setFetchedTrolls(json);
    }
    useEffect(() => {
        getTroll(0);
        const color = clan.color?.map(x => x / 255) as [number, number, number];
        if (color != null)
            setTheme([
                new Color3(...color),
                new Color3(...color).darken(50),
                768
            ]);
    }, []);
    return (
        <>
            <Conditional condition={clan.bgimage != null}>
                <style>{`
main.App {
    background-image: var(--darken), url(${clan.bgimage}) !important;
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
            {isClient && userCredentials.TROLLCALL_NAME == clan.name ? (
                <Box
                    properties={{
                        title: {
                            text: "Admin"
                        },
                        theme: theme[1]
                    }}
                >
                    <p>
                        Well, it seems you can manage{" "}
                        <b>{clan.displayName ?? clan.name}</b>! Have this menu.
                    </p>
                    <Link
                        className={globals.linkButton}
                        href={`/edit/clan/${clan.name}/`}
                    >
                        Edit Clan
                    </Link>
                </Box>
            ) : (
                <></>
            )}
            <Box
                properties={{
                    title: {
                        text: "Clan Trolls",
                        link: "/troll/s/" + clan.name,
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
            clan: cutObject(clan)
        }
    };
};
