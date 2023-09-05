import globals from "@/styles/global.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NavLink.module.css";

export default function NavLink() {
    const [hide, setHide] = useState(false);
    useEffect(() => {
        setHide(window.localStorage.getItem("hideAds") === "true");
    }, []);
    return !hide ? (
        <div className={globals.boxLike}>
            <iframe
                src="https://dimden.neocities.org/navlink/"
                key={Math.random()}
                className={styles.NavLink}
                name="neolink"
                width="180"
                height="180"
            ></iframe>
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
                <Link
                    className={globals.small + " " + globals.link}
                    href={"https://dimden.dev/navlinkads/"}
                    target="_blank"
                >
                    NavLink Ads
                </Link>
            </div>
        </div>
    ) : (
        <></>
    );
}
