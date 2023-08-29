import { useEffect, useRef, useState } from "react";
import { DialogIndex, ElementArray, wait } from "../types";
import styles from "./TextHandler.module.css";

export default function TextHandler({
    dialogIndex,
    dialogIsOpen,
    textboxDoneStuff: [textboxDone, setTextboxDone],
    wantTextboxDoneStuff: [wantTextboxDone, setWantTextboxDone]
}: {
    dialogIndex: DialogIndex;
    dialogIsOpen: boolean;
    textboxDoneStuff: [boolean, (textboxDone: boolean) => void];
    wantTextboxDoneStuff: [boolean, (wantTextboxDone: boolean) => void];
}) {
    const textSpan = useRef<HTMLSpanElement>(null);
    const [content, setContent] = useState(Runner(dialogIndex.dialog));
    const animationFrame = useRef(0);
    let clickSound: AudioBuffer;
    let inSound: AudioBuffer;
    let outSound: AudioBuffer;
    let context: AudioContext;
    let gain: GainNode;
    let contextGot = false;
    async function getContext() {
        context = new AudioContext();
        gain = context.createGain();
        gain.gain.value = 0.2;
        gain.connect(context.destination);
        await fetch("assets/celeste/click.wav")
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => (clickSound = audioBuffer));
        await fetch("assets/celeste/in.wav")
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => (inSound = audioBuffer));
        await fetch("assets/celeste/out.wav")
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => (outSound = audioBuffer));
    }
    useEffect(generateContent, [dialogIndex, dialogIsOpen]);
    function generateContent() {
        console.log("generating");
        if (!dialogIsOpen) return;
        if (textSpan.current == null) return;
        cancelAnimationFrame(animationFrame.current);
        setContent(Runner(dialogIndex.dialog));
    }
    (async () => {
        await getContext();
        contextGot = true;
    })();
    useEffect(formatContent, [content]);
    function formatContent() {
        console.log("formatting", content);
        if (textSpan.current == null) return;
        cancelAnimationFrame(animationFrame.current);
        const innerSpan = textSpan.current
            .children[0] as HTMLSpanElement | null;
        if (innerSpan == null) return;
        textSpan.current.style.width = "100%";
        textSpan.current.style.width = innerSpan.offsetWidth + 2 + "px";

        // Wave stuff
        const allWavy = textSpan.current.querySelectorAll("* .wavy");
        allWavy.forEach(wavyElement => {
            const children = wavyElement.querySelectorAll("span.letter");
            let index = 1;
            for (let child of children) {
                const currentLetter = child as HTMLSpanElement;
                currentLetter.style.animationName = styles.wavy;
                currentLetter.style.animationDelay =
                    (0.5 / children.length) * index + "s";
                index++;
            }
        });
        writeContent();
    }
    useEffect(() => {
        if (textSpan.current == null) return;
        const allLetters = textSpan.current.querySelectorAll("span.letter");
        if (wantTextboxDone) {
            for (let i = 0; i < allLetters.length; i++) {
                const currentLetter = allLetters[i] as HTMLSpanElement;
                currentLetter.classList.add(styles.visible);
            }
            cancelAnimationFrame(animationFrame.current);
            setTextboxDone(true);
            setWantTextboxDone(false);
            return;
        }
    }, [wantTextboxDone]);
    function writeContent() {
        if (textSpan.current == null) return;
        if (!dialogIsOpen) return;
        cancelAnimationFrame(animationFrame.current);
        setTextboxDone(false);
        const allLetters = textSpan.current.querySelectorAll("span.letter");
        for (let i = 0; i < allLetters.length; i++) {
            const currentLetter = allLetters[i] as HTMLSpanElement;
            currentLetter.classList.remove(styles.visible);
        }
        var letterProgress = 0;
        async function showLetters() {
            if (letterProgress >= allLetters.length) {
                setTextboxDone(true);
                cancelAnimationFrame(animationFrame.current);
                return;
            }
            const currentLetter = allLetters[letterProgress] as HTMLSpanElement;
            currentLetter.classList.add(styles.visible);
            letterProgress++;
            let waitLength = 0;
            let makeSound = true;
            switch (currentLetter.innerHTML) {
                case " ":
                    makeSound = false;
                    waitLength = 0.01;
                    break;
                case ".":
                    waitLength = 0.5;
                    break;
                case ",":
                    waitLength = 0.125;
                    break;
                case "!":
                    waitLength = 0.5;
                    break;
                case "?":
                    waitLength = 0.5;
                    break;
                default:
                    waitLength = 0.025;
            }
            // if (makeSound && contextGot) {
            //     let source = context.createBufferSource();
            //     source.buffer = clickSound;
            //     source.connect(gain);
            //     source.start();
            // }
            await wait(waitLength).then(() => {
                animationFrame.current = requestAnimationFrame(showLetters);
            });
        }
        wait(0.25).then(
            () => (animationFrame.current = requestAnimationFrame(showLetters))
        );
    }
    return (
        <span
            className={styles.TextHandler}
            ref={textSpan}
        >
            {content}
        </span>
    );
}

function Runner(text: ElementArray) {
    if (typeof text === "string") return StringRunner(text);
    else if (Array.isArray(text)) return <span>{text.map(Runner)}</span>;
    else if (typeof text === "object") {
        return (
            <span
                className={
                    text.effects?.className
                        ? text.effects.className +
                          " " +
                          styles[text.effects.className]
                        : ""
                }
                style={text.effects?.style ?? {}}
            >
                {Runner(text.text)}
            </span>
        );
    }
}

function StringRunner(string: string) {
    return (
        <>
            {string.split("").map((letter, i) => (
                <span
                    className={`letter ${styles.letter}`}
                    key={i + Math.random()}
                >
                    {letter}
                </span>
            ))}
        </>
    );
}
