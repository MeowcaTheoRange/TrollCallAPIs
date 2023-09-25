import Box from "@/components/Box/Box";
import TrollFormTemplate from "@/components/form/template/troll";
import NotSignedInClan from "@/components/template/not-signed-in-clan";
import { TrollGET } from "@/lib/trollcall/api/troll";
import { getSingleClan } from "@/lib/trollcall/clan";
import { ClientTrollToSubmitTroll } from "@/lib/trollcall/convert/troll";
import { cutObject } from "@/lib/trollcall/utility/merge";
import globals from "@/styles/global.module.css";
import { ThemerGetSet } from "@/types/generics";
import { ClientTroll } from "@/types/troll";
import AuthContext from "@/utility/react/AuthContext";
import { defaultTheme } from "@/utility/react/Themer";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AddTroll({
    themerVars: [theme, setTheme],
    troll
}: {
    themerVars: ThemerGetSet;
    troll: ClientTroll;
}) {
    const userCredentials = useContext(AuthContext);
    const router = useRouter();
    // Prevent hydration error. Nav Auth section is a client-rendered element.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        setTheme(defaultTheme);
        console.log(troll);
    }, []);
    return isClient && userCredentials.TROLLCALL_NAME == troll.owner.name ? (
        <>
            <Box properties={{ title: { text: "Edit Troll" } }}>
                <span className={globals.text}>Edit one of your trolls.</span>
            </Box>
            <TrollFormTemplate
                user={userCredentials}
                router={router}
                method="PUT"
                onSubmitURI={`/api/troll/${troll.owner.name}/${troll.name[0]}`}
                initialValues={ClientTrollToSubmitTroll(troll)}
            />
        </>
    ) : (
        <NotSignedInClan clan={troll.owner.displayName ?? troll.owner.name} />
    );
}

export const getServerSideProps: GetServerSideProps<{
    troll: ClientTroll;
}> = async (context: GetStaticPropsContext) => {
    if (context.params?.clan == null) return { notFound: true };
    const serverClan = await getSingleClan({
        name: context.params?.clan
    });
    if (serverClan == null)
        return {
            notFound: true
        };
    if (context.params?.troll == null) return { notFound: true };
    const troll = await TrollGET(
        { name: context.params.troll },
        null,
        serverClan
    );
    if (troll == null)
        return {
            notFound: true
        };
    return {
        props: {
            troll: cutObject(troll)
        }
    };
};
