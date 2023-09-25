import Box from "@/components/Box/Box";
import MessageFormTemplate from "@/components/form/template/message";
import NotSignedIn from "@/components/template/not-signed-in";
import globals from "@/styles/global.module.css";
import { ThemerGetSet } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import { defaultTheme } from "@/utility/react/Themer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AddMessage({
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
    return isClient && userCredentials.TROLLCALL_NAME != null ? (
        <>
            <Box properties={{ title: { text: "Add Message" } }}>
                <span className={globals.text}>Send a message to someone.</span>
            </Box>
            <MessageFormTemplate router={router} />
        </>
    ) : (
        <NotSignedIn />
    );
}
