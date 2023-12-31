/* eslint-disable @next/next/no-img-element */
import { Color3 } from "@/types/assist/color";
import { ClientFlair } from "@/types/flair";
import { ConditionalParent } from "@/utility/react/Conditional";
import { ThemeModeContext } from "@/utility/react/Themer";
import Link from "next/link";
import { useContext } from "react";
import styles from "./FlairCard.module.css";

export default function FlairCard({ flair }: { flair: ClientFlair }) {
    const inverted = useContext(ThemeModeContext);
    const color = Color3.fromRGB(...flair.color);
    const style = (
        inverted
            ? {
                  "--pri-bg": "#" + color.lighten(70).toHex(),
                  "--pri-fg": "#" + color.darken(70).toHex()
              }
            : {
                  "--pri-bg": "#" + color.darken(70).toHex(),
                  "--pri-fg": "#" + color.lighten(70).toHex()
              }
    ) as React.CSSProperties;
    return (
        <ConditionalParent
            condition={flair.link != null}
            parent={children => (
                <Link
                    className={styles.FlairLink}
                    href={flair.link ?? ""}
                    target="_blank"
                >
                    {children}
                </Link>
            )}
        >
            <div
                className={styles.FlairCard}
                style={style}
                title={flair.alt}
            >
                {flair.name}
            </div>
        </ConditionalParent>
    );
}
