/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global_skeleton.module.css";
import SignSkeleton from "../SignCard/SignSkeleton";
import styles from "./TrollCard.module.css";

export default function TrollSkeleton() {
    return (
        <Box
            properties={{
                class: styles.TrollCard + " " + styles.Skeleton
            }}
        >
            <div className={styles.top}>
                <div className={styles.gridItem + " " + styles.primary}>
                    <img
                        className={styles.topImage}
                        alt=""
                    ></img>
                </div>
                <div className={styles.gridItem + " " + styles.secondary}>
                    <p className={globals.title}>GABBEN NEWELL</p>
                    <p className={globals.text}>(gay-ben new-wul)</p>
                    <p className={globals.text}>
                        Also known as gaben@valvesoftware.com online.
                    </p>
                    <hr className={globals.invisep} />
                    <p className={globals.horizontalList}>
                        <span className={globals.text}>Lord of Sales</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>Software</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>de/ck</span>
                    </p>
                    <p className={globals.horizontalList}>
                        <span className={globals.text}>All Time</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>30%</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>Steam</span>
                    </p>
                    <hr className={globals.invisep} />
                    <ul>
                        <li className={globals.text}>Steam Summer Sale</li>
                        <li className={globals.text}>Dota</li>
                    </ul>
                    <br />
                    <div className={styles.stack + " " + styles.noFalseSign}>
                        <SignSkeleton />
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={globals.iconText}>
                    <span className={globals.iconSmall}>thumb_up</span>
                    <span className={globals.text}>n &lt; 3</span>
                </p>
                <p className={globals.iconText}>
                    <span className={globals.iconSmall}>thumb_down</span>
                    <span className={globals.text}>n &gt;= 3</span>
                </p>
                <p className={globals.iconText}>
                    <span className={globals.iconSmall}>format_quote</span>
                    <span className={globals.text}>
                        Hopefully, it would have been worth the wait.
                    </span>
                </p>
            </div>
        </Box>
    );
}
