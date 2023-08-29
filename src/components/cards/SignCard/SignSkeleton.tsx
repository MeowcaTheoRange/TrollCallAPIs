/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global_skeleton.module.css";
import styles from "./SignCard.module.css";

export default function SignSkeleton() {
    return (
        <Box
            properties={{
                nfw: true,
                class: styles.SignCard + " " + styles.Skeleton
            }}
        >
            <div className={styles.gridItem}>
                <img
                    src={"/assets/signs/Lime/Cancer.svg"}
                    className={styles.topImage}
                    alt=""
                ></img>
            </div>
            <div className={styles.gridItem + " " + styles.secondary}>
                <p className={globals.title}>jjjjfjfjffjfjjffj</p>
                <p className={globals.horizontalList}>
                    <span className={globals.text}>jjjfjfj</span>
                    <span className={globals.text}>+</span>
                    <span className={globals.text}>jjjfjfj</span>
                </p>
            </div>
        </Box>
    );
}
