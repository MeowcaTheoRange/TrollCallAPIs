// import globals from "@/styles/global.module.css";
import { useRef, useState } from "react";
import styles from "./CelesteBox.module.css";
import TextHandler from "./TextHandler/TextHandler";
import { DialogList } from "./types";

export default function CelesteBox({ dialogList }: { dialogList: DialogList }) {
    const [open, setOpen] = useState(false);
    const [currentDialog, setCurrentDialog] = useState(dialogList.list[0]);
    const [textboxDone, setTextboxDone] = useState(false);
    const [wantTextboxDone, setWantTextboxDone] = useState(false);
    const currentIndex = useRef(0);
    function openDialog() {
        console.log("Opening", currentIndex);
        setOpen(true);
        currentIndex.current = 0;
        console.log("Opened", currentIndex);
        setCurrentDialog(dialogList.list[currentIndex.current]);
    }
    function nextDialog() {
        if (textboxDone) {
            console.log("Next", currentIndex, currentIndex.current);
            currentIndex.current += 1;
            console.log("Next-ed", currentIndex);
            if (currentIndex.current >= dialogList.list.length) {
                setOpen(false);
                return;
            }
            setCurrentDialog(dialogList.list[currentIndex.current]);
        } else {
            setWantTextboxDone(true);
        }
    }
    return [
        openDialog,
        <div
            className={styles.CelesteBoxScrim + (open ? " " + styles.open : "")}
            onClick={nextDialog}
        >
            <div
                className={styles.CelesteBox + (open ? " " + styles.open : "")}
            >
                <div className={styles.PortraitHolder}></div>
                <div className={styles.TextHolder}>
                    <TextHandler
                        dialogIndex={currentDialog}
                        dialogIsOpen={open}
                        textboxDoneStuff={[textboxDone, setTextboxDone]}
                        wantTextboxDoneStuff={[
                            wantTextboxDone,
                            setWantTextboxDone
                        ]}
                    />
                </div>
            </div>
        </div>
    ] as [() => void, React.ReactNode];
}
