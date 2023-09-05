import globals from "@/styles/global.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Ads.module.css";

export default function Ads() {
    const [hide, setHide] = useState(false);
    const [adService, setAdService] = useState(0);
    useEffect(() => {
        setHide(window.localStorage.getItem("hideAds") === "true");
        setAdService(Math.random());
    }, []);
    return !hide ? (
        <div className={globals.boxLike}>
            {adService < 0.25 ? (
                <iframe
                    src="https://mothvertising.moth.monster/embed"
                    className={styles.Mothvertisement}
                    key={Math.random()}
                ></iframe>
            ) : adService < 0.5 ? (
                <iframe
                    src="https://dimden.neocities.org/navlink/"
                    key={Math.random()}
                    className={styles.NavLink}
                    name="neolink"
                    width="180"
                    height="180"
                ></iframe>
            ) : adService < 0.75 ? (
                <iframe
                    className={styles.NavLink}
                    width="300"
                    height="250"
                    src="https://googol.neocities.org/neolink/embed.html"
                    name="neolink"
                ></iframe>
            ) : (
                <iframe
                    src="https://john.citrons.xyz/embed?ref=example.com"
                    className={styles.Johnvertisement}
                    width="732"
                    height="90"
                ></iframe>
            )}
            <div className={globals.horizontalListLeft}>
                <button
                    onClick={() => {
                        window.localStorage.setItem("hideAds", "true");
                        setHide(true);
                    }}
                    className={globals.small + " " + globals.buttonLink}
                >
                    Hide forever
                </button>
                <span className={globals.small}>-</span>
                {adService < 0.25 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://mothvertising.moth.monster/"}
                        target="_blank"
                    >
                        Mothvertising
                    </Link>
                ) : adService < 0.5 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://dimden.dev/navlinkads/"}
                        target="_blank"
                    >
                        NavLink Ads
                    </Link>
                ) : adService < 0.75 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://googol.neocities.org/neolink/"}
                        target="_blank"
                    >
                        NeoLink Ads
                    </Link>
                ) : (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://john.citrons.xyz/"}
                        target="_blank"
                    >
                        johnvertisement
                    </Link>
                )}
            </div>
        </div>
    ) : (
        <></>
    );
}
