import Box from "@/components/Box/Box";
import ClanFormTemplate from "@/components/form/template/clan";
import NotSignedInClan from "@/components/template/not-signed-in-clan";
import { ClanGET } from "@/lib/trollcall/api/clan";
import { ClientClanToSubmitClan } from "@/lib/trollcall/convert/clan";
import { cutObject } from "@/lib/trollcall/utility/merge";
import globals from "@/styles/global.module.css";
import { ClientClan } from "@/types/clan";
import { ThemerGetSet } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import { defaultTheme } from "@/utility/react/Themer";
import { getCookie } from "cookies-next";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AddTroll({
    themerVars: [theme, setTheme],
    clan
}: {
    themerVars: ThemerGetSet;
    clan: ClientClan;
}) {
    const userCredentials = useContext(AuthContext);
    const router = useRouter();
    // Prevent hydration error. Nav Auth section is a client-rendered element.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        setTheme(defaultTheme);
        console.log(clan);
    }, []);
    return isClient && userCredentials.TROLLCALL_NAME == clan.name ? (
        <>
            <Box properties={{ title: { text: "Edit Clan" } }}>
                <span className={globals.text}>Tweak your clan.</span>
            </Box>
            <ClanFormTemplate
                router={router}
                method="PUT"
                onSubmitURI={`/api/clan/${clan.name}`}
                initialValues={{
                    ...ClientClanToSubmitClan(clan),
                    code: getCookie("TROLLCALL_CODE")
                }}
            />
        </>
    ) : (
        <NotSignedInClan clan={clan.displayName ?? clan.name} />
    );
}

export const getServerSideProps: GetServerSideProps<{
    clan: ClientClan;
}> = async (context: GetStaticPropsContext) => {
    if (context.params?.clan == null) return { notFound: true };
    const clan = await ClanGET({
        name: context.params?.clan
    });
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
