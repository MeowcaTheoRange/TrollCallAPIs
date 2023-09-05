import globals from "@/styles/global.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Mothvertising.module.css";

export default function Mothvertising() {
    const [hide, setHide] = useState(false);
    useEffect(() => {
        setHide(window.localStorage.getItem("hideAds") === "true");
    }, []);
    return !hide ? (
        <div className={globals.boxLike}>
            <iframe
                src="https://mothvertising.moth.monster/embed"
                className={styles.Mothvertisement}
                key={Math.random()}
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
                    href={"https://mothvertising.moth.monster/"}
                    target="_blank"
                >
                    Mothvertising
                </Link>
            </div>
        </div>
    ) : (
        <></>
    );
}
