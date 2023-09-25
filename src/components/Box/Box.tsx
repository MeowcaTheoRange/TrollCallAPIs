import globals from "@/styles/global.module.css";
import Conditional, { ConditionalParent } from "@/utility/react/Conditional";
import { ThemeModeContext } from "@/utility/react/Themer";
import Link from "next/link";
import { useContext } from "react";
import styles from "./Box.module.css";
import { BoxConfig } from "./types";

export default function Box({
    children,
    properties
}: {
    children: React.ReactNode;
    properties?: BoxConfig;
}) {
    const inverted = useContext(ThemeModeContext);
    const style = (
        properties?.theme
            ? inverted
                ? {
                      "--pri-bg": "#" + properties?.theme?.lighten(70).toHex(),
                      "--pri-fg": "#" + properties?.theme?.darken(70).toHex()
                  }
                : {
                      "--pri-bg": "#" + properties?.theme?.darken(70).toHex(),
                      "--pri-fg": "#" + properties?.theme?.lighten(70).toHex()
                  }
            : {}
    ) as React.CSSProperties;
    return (
        <div
            className={
                styles.Box +
                (!properties?.nfw ? " " + styles.fw : "") +
                (properties?.ltr ? " " + styles.ltr : "")
            }
            style={style}
        >
            <Conditional condition={properties?.title != null}>
                <span
                    className={
                        properties?.title?.small
                            ? globals.titleSmall
                            : globals.title
                    }
                >
                    <ConditionalParent
                        condition={properties?.title?.link != null}
                        parent={children => (
                            <Link
                                className={globals.link}
                                href={properties?.title?.link ?? ""}
                            >
                                {children}
                            </Link>
                        )}
                    >
                        {properties?.title?.text}
                    </ConditionalParent>
                </span>
            </Conditional>
            <div
                className={
                    styles.innerContent +
                    (properties?.title == null
                        ? " " + styles.innerContentNoTitle
                        : "") +
                    (properties?.class != null ? " " + properties.class : "")
                }
            >
                {children}
            </div>
        </div>
    );
}
