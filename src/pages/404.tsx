import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import "@/styles/index.module.css";
import { ThemerGetSet } from "@/types/generics";

export default function Error({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    return (
        <>
            <Box
                properties={{
                    title: {
                        text: "Error 404 - Not Found"
                    }
                }}
            >
                <p className={globals.text}>
                    Your resource could not be found.
                </p>
                <p className={globals.text}>
                    <i>&quot;IT KEEPS HAPPENING&quot;</i>
                </p>
                <img src="/assets/404/stairs.webp" />
            </Box>
        </>
    );
}
