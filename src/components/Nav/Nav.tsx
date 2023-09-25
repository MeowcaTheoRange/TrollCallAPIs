import globals from "@/styles/global.module.css";
import { AnyObject } from "@/types/generics";
import AuthContext from "@/utility/react/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav(elementProps: AnyObject) {
    const userCredentials = useContext(AuthContext);
    // Prevent hydration error. Nav Auth section is a client-rendered element.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return (
        <div
            className={styles.Nav}
            {...elementProps}
        >
            <div className={styles.left}>
                <div className={styles.titlePath}>
                    <span className={globals.title + " " + styles.longTitle}>
                        <Link
                            className={globals.link}
                            href="/"
                        >
                            TrollCall
                            <span className={globals.small}> r4 Beta</span>
                        </Link>
                    </span>
                    <span className={globals.title + " " + styles.shortTitle}>
                        <Link
                            className={globals.link}
                            href="/"
                        >
                            TC<span className={globals.small}> Beta</span>
                        </Link>
                    </span>
                </div>
                <span className={globals.icon}>
                    <Link
                        className={globals.link}
                        href="https://github.com/MeowcaTheoRange/TrollCallAPIs/issues"
                    >
                        bug_report
                    </Link>
                </span>
                <span className={globals.icon}>
                    <Link
                        className={globals.link}
                        href="/add/troll/"
                    >
                        add
                    </Link>
                </span>
                <span className={globals.iconlike}>
                    <Link
                        className={globals.link}
                        href="/hiveswap/"
                    >
                        HS
                    </Link>
                </span>
                <span className={globals.icon}>
                    <Link
                        className={globals.link}
                        href="http://discord.trollcall.xyz/"
                    >
                        message
                    </Link>
                </span>
            </div>
            <div className={styles.right}>
                {isClient &&
                userCredentials.TROLLCALL_NAME != null &&
                userCredentials.TROLLCALL_NAME != "" ? (
                    <>
                        <span className={globals.icon}>
                            <Link
                                className={globals.link}
                                href="/add/message/"
                            >
                                send
                            </Link>
                        </span>
                        <span className={globals.icon}>
                            <Link
                                href={`/clan/${userCredentials.TROLLCALL_NAME}`}
                                className={globals.link}
                            >
                                group
                            </Link>
                        </span>
                        <span className={globals.icon}>
                            <Link
                                href={`/edit/clan/${userCredentials.TROLLCALL_NAME}`}
                                className={globals.link}
                            >
                                settings
                            </Link>
                        </span>
                        <span className={globals.icon}>
                            <Link
                                href={`/manage`}
                                className={globals.link}
                            >
                                logout
                            </Link>
                        </span>
                    </>
                ) : (
                    <>
                        <span className={globals.icon}>
                            <Link
                                href={`/add/clan`}
                                className={globals.link}
                            >
                                group_add
                            </Link>
                        </span>
                        <span className={globals.icon}>
                            <Link
                                href={`/manage`}
                                className={globals.link}
                            >
                                login
                            </Link>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
