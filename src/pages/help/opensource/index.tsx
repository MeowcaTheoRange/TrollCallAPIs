import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ThemerGetSet } from "@/types/generics";
import Link from "next/link";

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: "Open-source licenses & credits"
                    }
                }}
            >
                <p className={globals.text}>
                    TrollCall is software licensed under the{" "}
                    <Link
                        className={globals.link}
                        href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                    >
                        GNU General Public License
                    </Link>
                    . You can find the source code on Github in the{" "}
                    <Link
                        className={globals.link}
                        href="https://github.com/MeowcaTheoRange/TrollCallAPIs"
                    >
                        MeowcaTheoRange/TrollCallAPIs
                    </Link>{" "}
                    repository.
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "Included packages"
                    }
                }}
            >
                <p className={globals.text}>
                    You may find the following packages are required when using
                    the source code:
                </p>
                <ul>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/cookie"
                            target="_blank"
                        >
                            @types/cookie
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/express"
                            target="_blank"
                        >
                            @types/express
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/lodash"
                            target="_blank"
                        >
                            @types/lodash
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/node"
                            target="_blank"
                        >
                            @types/node
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/concurrently"
                            target="_blank"
                        >
                            concurrently
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/nodemon"
                            target="_blank"
                        >
                            nodemon
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/tsc-alias"
                            target="_blank"
                        >
                            tsc-alias
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/typescript"
                            target="_blank"
                        >
                            typescript
                        </Link>
                    </li>
                    {/* End dev dependencies */}
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/cookie-parser"
                            target="_blank"
                        >
                            @types/cookie-parser
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/crypto-js"
                            target="_blank"
                        >
                            @types/crypto-js
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/@types/react"
                            target="_blank"
                        >
                            @types/react
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/body-parser"
                            target="_blank"
                        >
                            body-parser
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/cookie"
                            target="_blank"
                        >
                            cookie
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/cookie-parser"
                            target="_blank"
                        >
                            cookie-parser
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/cookies-next"
                            target="_blank"
                        >
                            cookies-next
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/crypto-js"
                            target="_blank"
                        >
                            crypto-js
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/dotenv"
                            target="_blank"
                        >
                            dotenv
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/express"
                            target="_blank"
                        >
                            express
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/lodash"
                            target="_blank"
                        >
                            lodash
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/mongodb"
                            target="_blank"
                        >
                            mongodb
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/nanoid"
                            target="_blank"
                        >
                            nanoid
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/next"
                            target="_blank"
                        >
                            next
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/react"
                            target="_blank"
                        >
                            react
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/react-dom"
                            target="_blank"
                        >
                            react-dom
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/tsconfig-paths"
                            target="_blank"
                        >
                            tsconfig-paths
                        </Link>
                    </li>
                    <li className={globals.text}>
                        <Link
                            className={globals.link}
                            href="https://www.npmjs.com/package/yup"
                            target="_blank"
                        >
                            yup
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "General credits"
                    }
                }}
            >
                <p className={globals.text}>
                    TrollCall rev. 4 created by MeowcaTheoRange.
                </p>
                <p className={globals.text}>
                    <b>trollcall.xyz</b> domain owned by Redact.
                </p>
                <p className={globals.text}>
                    The TrollCall name is derived from the original Hiveswap
                    Troll Call. The name may be used in an entity context or a
                    project context.
                </p>
                <p className={globals.text}>
                    The textboxes found in the [INSERT PAGE HERE] are inspired
                    by those from the game <b>Celeste</b>.
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
            </Box>
        </>
    );
}
