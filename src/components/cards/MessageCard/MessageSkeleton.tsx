/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import styles from "./MessageCard.module.css";

export default function MessageSkeleton() {
    return (
        <Box
            properties={{
                class: styles.MessageCard + " " + styles.Skeleton
            }}
        >
            <div className={styles.horizontal}>
                <div className={styles.horizontalRight}>
                    <p className={globals.title}>Tim Sweeney</p>
                    {/* <p className={globals.text}>
                        to {recipient.displayName ?? recipient.name}
                    </p> */}
                    <hr className={globals.sep} />
                    <p className={globals.titleSmall}>12%</p>
                    <p className={globals.text}>
                        hey did you know we only take 12%? did you know? did
                        you? hey did you know we
                    </p>
                </div>
            </div>
        </Box>
    );
}
