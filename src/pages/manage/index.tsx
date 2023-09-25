import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import form_globals from "@/styles/global_form.module.css";
import { ThemerGetSet } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import { defaultTheme } from "@/utility/react/Themer";
import { deleteCookie, getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export default function Manage({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    const userCredentials = useContext(AuthContext);
    const nameInput = useRef<HTMLInputElement>(null);
    const codeInput = useRef<HTMLInputElement>(null);
    const router = useRouter();
    // Prevent hydration error. Nav Auth section is a client-rendered element.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        setTheme(defaultTheme);
    }, []);
    const cookies = getCookies() as {
        TROLLCALL_NAME: string;
        TROLLCALL_CODE: string;
    };

    const [statusHolder, setStatusHolder] = useState("");
    return isClient && userCredentials.TROLLCALL_NAME != null ? (
        <>
            <Box properties={{ title: { text: "Sign out?" } }}>
                <p className={globals.text}>
                    Are you sure you want to sign out of TrollCall?
                </p>
                <p className={globals.text}>
                    Make sure to remember your credentials!
                </p>
                <details>
                    <summary>
                        <span className={globals.text}>Show login</span>
                    </summary>
                    <p className={globals.text}>
                        NAME:{" "}
                        <span className={globals.mono}>
                            {cookies.TROLLCALL_NAME}
                        </span>
                    </p>
                    <p className={globals.text}>
                        CODE:{" "}
                        <span
                            className={`${globals.mono} ${styles.showOnHover}`}
                        >
                            {isClient && cookies.TROLLCALL_CODE}
                        </span>
                    </p>
                </details>
                <button
                    className={globals.button}
                    onClick={() => {
                        deleteCookie("TROLLCALL_NAME", {
                            path: "/"
                        });
                        deleteCookie("TROLLCALL_CODE", {
                            path: "/"
                        });
                        router.push("/");
                    }}
                >
                    Sign out
                </button>
            </Box>
        </>
    ) : (
        <>
            <Box properties={{ title: { text: "Sign in / join a clan" } }}>
                <p className={globals.text}>Join a clan on TrollCall.</p>
                <p className={globals.text}>
                    Have you remembered your credientials? If not,{" "}
                    <b>submit an issue</b> or <b>join the Discord</b> for help.
                </p>
                <div className={globals.verticalListTop}>
                    <p className={globals.titleSmall}>Name</p>
                    <div className={globals.horizontalListLeft}>
                        <input
                            type="text"
                            name="name"
                            placeholder="jim"
                            ref={nameInput}
                            className={`
                                ${form_globals.textLikeInput}
                                ${form_globals.textLikeInputTight}
                            `}
                        />
                    </div>
                </div>
                <div className={globals.verticalListTop}>
                    <p className={globals.titleSmall}>Code</p>
                    <div className={globals.horizontalListLeft}>
                        <input
                            type="password"
                            name="code"
                            placeholder="Tim Sweeney"
                            ref={codeInput}
                            className={`
                                ${form_globals.textLikeInput}
                                ${form_globals.textLikeInputTight}
                            `}
                        />
                    </div>
                </div>
                <button
                    className={globals.button}
                    onClick={async () => {
                        setCookie(
                            "TROLLCALL_NAME",
                            nameInput.current?.value.toLowerCase() ?? "",
                            {
                                path: "/",
                                maxAge: 31540000
                            }
                        );
                        setCookie(
                            "TROLLCALL_CODE",
                            codeInput.current?.value ?? "",
                            {
                                path: "/",
                                maxAge: 31540000
                            }
                        );
                        const status = await fetch("/api/test/signin");
                        if (status.status === 200) router.push("/");
                        else setStatusHolder(await status.text());
                    }}
                >
                    Sign in
                </button>
                <span className={globals.text}>{statusHolder}</span>
            </Box>
        </>
    );
}
