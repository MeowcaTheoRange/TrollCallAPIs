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
                    <p className={globals.title}>ffjfjf fjfjjj</p>
                    <p className={globals.text}>(fjjjf-jjfj fjjfjf-fjffj)</p>
                    <p className={globals.text}>
                        Also known as ffjfjjfjjfjfjjjjjfjjf online.
                    </p>
                    <br />
                    <p className={globals.horizontalListLeft}>
                        <span className={globals.text}>fj</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>ffjfj</span>
                        <span className={globals.text}>-</span>
                        <span className={globals.text}>fj/fjj/fjjjf</span>
                    </p>
                    <br />
                    <ul>
                        <li className={globals.text}>fjjfjjfjffj</li>
                        <li className={globals.text}>fjjjjfjffjjfffjfj</li>
                        <li className={globals.text}>
                            fjjjjffjjjfjjjfjjffjfjfj
                        </li>
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
                    <span className={globals.text}>
                        ffjj fjf jjffffjfjfj fjfjjfjfjjj
                    </span>
                </p>
                <p className={globals.iconText}>
                    <span className={globals.iconSmall}>thumb_down</span>
                    <span className={globals.text}>
                        ffjjj fjjfjjf jf jj jjfjjjffj j fff
                    </span>
                </p>
                <p className={globals.iconText}>
                    <span className={globals.iconSmall}>format_quote</span>
                    <span className={globals.text}>
                        jjj fjjf jfjjjf f j ffff j f jjfj jf fj fjjjfj jfj
                    </span>
                </p>
            </div>
        </Box>
    );
}
