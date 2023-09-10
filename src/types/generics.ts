import { Color3 } from "./assist/color";

export type AnyObject = { [key: string]: any };

export type AnyObjectAnd<T> = T & { [key: string]: any };

// Color

export type ThemerGetSet = [
    [Color3, Color3, boolean?],
    (x: [Color3, Color3, boolean?]) => void
];

export type WidthGetSet = [number, (x: number) => void];
