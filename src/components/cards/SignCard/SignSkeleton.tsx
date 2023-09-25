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
                <span className={styles.topImagePlaceholder}>λ</span>
            </div>
            <div className={styles.gridItem + " " + styles.secondary}>
                <p className={globals.title}>half-life</p>
                <p className={globals.horizontalList}>
                    <span className={globals.text}>born.</span>
                </p>
            </div>
        </Box>
    );
}
