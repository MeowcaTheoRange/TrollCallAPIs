import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { ThemerGetSet } from "@/types/generics";

export default function Index({
    themerVars: [theme, setTheme]
}: {
    themerVars: ThemerGetSet;
}) {
    return (
        <Box properties={{ title: { text: "Work in progress" } }}>
            <span className={globals.text}>Sorry :[</span>
        </Box>
    );
}
