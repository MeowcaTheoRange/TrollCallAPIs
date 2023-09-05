/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { Color3 } from "@/types/assist/color";
import { TrueSignType } from "@/types/assist/extended_zodiac";
import Link from "next/link";
import styles from "./SignCard.module.css";

export default function SignCard({ sign }: { sign: TrueSignType }) {
    return (
        <Box
            properties={{
                nfw: true,
                class: styles.SignCard,
                theme: new Color3(...sign.color.color)
            }}
        >
            <div className={styles.gridItem}>
                <img
                    src={
                        "/assets/signs/" +
                        sign.color.name +
                        "/" +
                        sign.name +
                        ".svg"
                    }
                    className={styles.topImage}
                    alt=""
                ></img>
            </div>
            <div className={styles.gridItem + " " + styles.secondary}>
                <p className={globals.title}>
                    <Link
                        href={`/hiveswap/truesigns/${sign.name}`}
                        className={globals.link}
                    >
                        {sign.name}
                    </Link>
                </p>
                <p className={globals.horizontalList}>
                    <span className={globals.text}>{sign.sway.name}</span>
                    <span className={globals.text}>+</span>
                    <span className={globals.text}>{sign.aspect.name}</span>
                </p>
            </div>
        </Box>
    );
}
