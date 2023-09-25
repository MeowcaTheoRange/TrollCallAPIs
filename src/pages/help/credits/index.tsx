import Box from "@/components/Box/Box";
import Credits from "@/components/template/credits";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ThemerGetSet } from "@/types/generics";
import { defaultTheme } from "@/utility/react/Themer";
import Link from "next/link";
import { useEffect } from "react";

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    useEffect(() => setTheme(defaultTheme), []);
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
                        GNU Affero General Public License
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
                <p
                    className={globals.text}
                    style={{ margin: "0 8px" }}
                >
                    TrollCall - A cool place to store characters.
                    <br />
                    Copyright (C) 2023 MeowcaTheoRange
                    <br />
                    <br />
                    This program is free software: you can redistribute it
                    and/or modify it under the terms of the GNU Affero General
                    Public License as published by the Free Software Foundation,
                    either version 3 of the License, or (at your option) any
                    later version.
                    <br />
                    <br />
                    This program is distributed in the hope that it will be
                    useful, but WITHOUT ANY WARRANTY; without even the implied
                    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
                    PURPOSE. See the GNU Affero General Public License for more
                    details.
                    <br />
                    <br />
                    You should have received a copy of the GNU Affero General
                    Public License along with this program. If not, see{" "}
                    <Link
                        className={globals.link}
                        href="https://www.gnu.org/licenses/"
                    >
                        https://www.gnu.org/licenses/
                    </Link>
                    .
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
                            href="https://www.npmjs.com/package/argon2"
                            target="_blank"
                        >
                            argon2
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
                        text: "Asset credits"
                    }
                }}
            >
                <p className={globals.text}>
                    Extended Zodiac sign SVGs created by{" "}
                    <Link
                        className={globals.link}
                        href={
                            "https://www.deviantart.com/ylimegirl/art/Extended-Zodiac-Vectors-All-signs-721467417"
                        }
                    >
                        Ylimegirl on DeviantArt
                    </Link>
                    .
                </p>
                <p className={globals.text}>
                    Aspect symbol SVGs created by{" "}
                    <Link
                        className={globals.link}
                        href={
                            "https://meggies-effort.myshopify.com/products/aspect-symbols-homestuck"
                        }
                    >
                        Meggie's Effort
                    </Link>{" "}
                    (beware popups).
                </p>
                <hr className={globals.sep} />
                <p className={globals.titleSmall}>
                    <span
                        className={globals.headerPG}
                        id="adblock"
                    ></span>
                    Advertisements
                </p>
                <p className={globals.text}>
                    Mothvertisements served by{" "}
                    <Link
                        className={globals.link}
                        href={"https://mothvertising.moth.monster/"}
                    >
                        moth.monster
                    </Link>
                </p>
                <p className={globals.text}>
                    NavLink Ads served by{" "}
                    <Link
                        className={globals.link}
                        href={"https://dimden.dev/navlinkads/"}
                    >
                        dimden.dev
                    </Link>
                </p>
                <p className={globals.text}>
                    NeoLink Ads served by{" "}
                    <Link
                        className={globals.link}
                        href={"https://googol.neocities.org/neolink/"}
                    >
                        googol.neocities.org
                    </Link>
                </p>
                <p className={globals.text}>
                    johnvertisements served by{" "}
                    <Link
                        className={globals.link}
                        href={"https://john.citrons.xyz/"}
                    >
                        john.citrons.xyz
                    </Link>
                </p>
                <p className={globals.text}>
                    BannerLink Ads served by{" "}
                    <Link
                        className={globals.link}
                        href={"https://wsmz.gay/#misc-bannerlink"}
                    >
                        wsmz.gay
                    </Link>
                </p>
                <p className={globals.text}>
                    ~&gt;{" "}
                    <button
                        onClick={() => {
                            window.localStorage.setItem("hideAds", "true");
                            window.location.reload();
                        }}
                        className={globals.buttonLink}
                    >
                        Hide ads forever
                    </button>
                </p>
                <p className={globals.text}>
                    ~&gt;{" "}
                    <button
                        onClick={() => {
                            window.localStorage.setItem("hideAds", "false");
                            window.location.reload();
                        }}
                        className={globals.buttonLink}
                    >
                        Give me back my ads!
                    </button>
                </p>
                <p className={globals.small}>
                    Consider whitelisting us on your ad-blocker - these ad
                    services <b>do not track</b> and are run by{" "}
                    <b>local webmasters</b>!
                </p>
            </Box>
            <Box
                properties={{
                    title: {
                        text: "General credits"
                    }
                }}
            >
                <Credits />
            </Box>
            <Box properties={{ title: { text: "Contact Me" } }}>
                <p className={globals.text}>
                    Please{" "}
                    <Link
                        className={globals.link}
                        href={"https://abtmtr.link/"}
                    >
                        let MeowcaTheoRange know
                    </Link>{" "}
                    if you have any questions about these credits!
                </p>
            </Box>
            <Box properties={{ title: { text: "Helper Credits" } }}>
                <p className={globals.text}>
                    A list of people who are on the TrollCall team.
                </p>
            </Box>
        </>
    );
}
