import globals from "@/styles/global.module.css";
import Box from "../Box/Box";

export default function TooSignedIn() {
    return (
        <Box properties={{ title: { text: "Signed In" } }}>
            <p className={globals.text}>
                You can't be part a clan to perform this action!
            </p>
            <a
                className={globals.link}
                href="/manage"
            >
                Log out
            </a>
        </Box>
    );
}
