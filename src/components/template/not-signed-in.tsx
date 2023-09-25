import globals from "@/styles/global.module.css";
import Box from "../Box/Box";

export default function NotSignedIn() {
    return (
        <Box properties={{ title: { text: "Not Signed In" } }}>
            <p className={globals.text}>
                You need to part a clan to perform this action!
            </p>
            <a
                className={globals.link}
                href="/manage"
            >
                Join a clan
            </a>
            <a
                className={globals.link}
                href="/add/clan"
            >
                Create a clan
            </a>
        </Box>
    );
}
