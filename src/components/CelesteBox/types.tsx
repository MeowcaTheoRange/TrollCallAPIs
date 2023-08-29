export type DialogList = {
    name: string;
    list: DialogIndex[];
};

export type DialogIndex = {
    character: string;
    dialog: ElementArray;
};

type DialogElement = {
    effects?: { className?: string; style?: React.CSSProperties };
    text: ElementArray;
};

export type ElementArray = string | DialogElement | EAA;
type EAA = ElementArray[];

export const clamp = (n: number, mi: number, ma: number) =>
    Math.max(mi, Math.min(n, ma));

export const wait = (time: number): Promise<void> =>
    new Promise(res => setTimeout(() => res(), time * 1000));
