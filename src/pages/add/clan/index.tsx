import Box from "@/components/Box/Box";
import ClanFormTemplate from "@/components/form/template/clan";
import TooSignedIn from "@/components/template/too-signed-in";
import globals from "@/styles/global.module.css";
import { ThemerGetSet } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import { defaultTheme } from "@/utility/react/Themer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AddClan({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    const userCredentials = useContext(AuthContext);
    const router = useRouter();
    // Prevent hydration error. Nav Auth section is a client-rendered element.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        setTheme(defaultTheme);
    }, []);
    return isClient && userCredentials.TROLLCALL_NAME == null ? (
        <>
            <Box properties={{ title: { text: "Add Clan" } }}>
                <span className={globals.text}>
                    Create a clan to contribute to the site!
                </span>
            </Box>
            <ClanFormTemplate router={router} />
        </>
    ) : (
        <TooSignedIn />
    );
}
