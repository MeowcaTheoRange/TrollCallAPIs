import globals from "@/styles/global_skeleton.module.css";
/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import styles from "./ClanCard.module.css";

export default function ClanSkeleton() {
    return (
        <Box
            properties={{
                class: styles.ClanCard + " " + styles.Skeleton
            }}
        >
            <div className={styles.headerImage}></div>
            <div className={styles.horizontal}>
                <div className={styles.horizontalLeft}></div>
                <div className={styles.horizontalRight}>
                    <p className={globals.title}>Epic Megagames</p>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>group</span>
                        <span className={globals.text}>
                            Tim Sweeney (88/12)
                        </span>
                    </p>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>link</span>
                        <span className={globals.text}>
                            https://trollcall.xyz/
                        </span>
                    </p>
                    <p className={globals.iconText}>
                        <span className={globals.iconSmall}>description</span>
                        <span className={globals.text}>Tim Sweeney</span>
                    </p>
                </div>
            </div>
        </Box>
    );
}
