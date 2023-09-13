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
        setInterval(() => setAdService(Math.random()), 60000);
    }, []);
    return !hide ? (
        <div className={globals.boxLike}>
            {adService < 0.2 ? (
                <iframe
                    src="https://mothvertising.moth.monster/embed"
                    className={styles.Mothvertisement}
                    key={Math.random()}
                ></iframe>
            ) : adService < 0.4 ? (
                <iframe
                    src="https://dimden.neocities.org/navlink/"
                    key={Math.random()}
                    className={styles.NavLink}
                    width="180"
                    height="180"
                ></iframe>
            ) : adService < 0.6 ? (
                <iframe
                    className={styles.NavLink}
                    width="300"
                    height="250"
                    src="https://googol.neocities.org/neolink/embed.html"
                    key={Math.random()}
                ></iframe>
            ) : adService < 0.8 ? (
                <iframe
                    src="https://john.citrons.xyz/embed?ref=example.com"
                    key={Math.random()}
                    className={styles.Johnvertisement}
                    width="732"
                    height="90"
                ></iframe>
            ) : (
                <iframe
                    width="468"
                    height="60"
                    className={styles.NavLink}
                    src="https://hbaguette.neocities.org/bannerlink/embed.html"
                    key={Math.random()}
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
                {adService < 0.2 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://mothvertising.moth.monster/"}
                        target="_blank"
                    >
                        Mothvertising
                    </Link>
                ) : adService < 0.4 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://dimden.dev/navlinkads/"}
                        target="_blank"
                    >
                        NavLink Ads
                    </Link>
                ) : adService < 0.6 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://googol.neocities.org/neolink/"}
                        target="_blank"
                    >
                        NeoLink Ads
                    </Link>
                ) : adService < 0.8 ? (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://john.citrons.xyz/"}
                        target="_blank"
                    >
                        johnvertisement
                    </Link>
                ) : (
                    <Link
                        className={globals.small + " " + globals.link}
                        href={"https://wsmz.gay/#misc-bannerlink"}
                        target="_blank"
                    >
                        BannerLink Ads
                    </Link>
                )}
                <span className={globals.small}>-</span>
                <button
                    onClick={() => {
                        setAdService(Math.random());
                    }}
                    className={globals.small + " " + globals.buttonLink}
                >
                    Re-roll
                </button>
                <span className={globals.small}>-</span>
                <span className={globals.small}>
                    Not displaying?{" "}
                    <a
                        className={globals.link}
                        href={"/help/credits#adblock"}
                    >
                        Try whitelisting us on your ad-blocker.
                    </a>
                </span>
            </div>
        </div>
    ) : (
        <></>
    );
}
