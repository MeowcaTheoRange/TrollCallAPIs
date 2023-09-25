import globals from "@/styles/global.module.css";
import Link from "next/link";

export default function Credits() {
    return (
        <>
            <p className={globals.text}>
                TrollCall rev. 4 created with ❤️ by MeowcaTheoRange using{" "}
                <Link
                    href="https://nextjs.org/"
                    className={globals.link}
                >
                    Next.js
                </Link>{" "}
                (Pages Router).
            </p>
            <p className={globals.text}>
                <b>trollcall.xyz</b> domain owned by [person who is not me].
            </p>
            <p className={globals.text}>
                The TrollCall name is derived from the original Hiveswap Troll
                Call. The name may be used in an entity context or a project
                context.
            </p>
            <p className={globals.text}>
                The textboxes found in the [INSERT PAGE HERE] are inspired by
                those from the game <b>Celeste</b>.
            </p>
            <p>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://github.com/MeowcaTheoRange/Fonts"
                    >
                        TrollCall Display
                    </Link>{" "}
                    font by MeowcaTheoRange.
                </span>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://fonts.google.com/specimen/Space+Grotesk"
                    >
                        Space Grotesk
                    </Link>{" "}
                    font by Florian Karsten.
                </span>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://fonts.google.com/specimen/Space+Mono"
                    >
                        Space Mono
                    </Link>{" "}
                    font by Colophon Foundry.
                </span>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://fonts.google.com/specimen/Poppins"
                    >
                        Poppins
                    </Link>{" "}
                    font by Indian Type Foundry.
                </span>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://fonts.google.com/specimen/Flow+Circular"
                    >
                        Flow Circular
                    </Link>{" "}
                    font by Dan Ross.
                </span>
                <span className={globals.blockText}>
                    <Link
                        className={globals.link}
                        href="https://www.creativefabrica.com/product/renogare/"
                    >
                        Renogare
                    </Link>{" "}
                    font by Deepak Dogra.
                </span>
            </p>
            <p className={globals.text}>
                Homestuck and HIVESWAP © Homestuck Inc.
            </p>
        </>
    );
}
