import globals from "@/styles/global.module.css";
import Box from "../Box/Box";

export default function NotSignedInClan({ clan }: { clan: string }) {
    return (
        <Box properties={{ title: { text: "Not Signed In" } }}>
            <p className={globals.text}>
                You need to part of the {clan} clan to perform this action!
            </p>
            <a
                className={globals.link}
                href="/manage"
            >
                Join the {clan} clan
            </a>
        </Box>
    );
}
