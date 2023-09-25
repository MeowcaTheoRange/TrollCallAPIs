import { Color3 } from "./assist/color";

export type AnyObject = { [key: string]: any };

export type AnyObjectAnd<T> = T & { [key: string]: any };

// Color

export type ThemeGet = [Color3, Color3, number?, boolean?];
export type ThemeGetOpt = [Color3?, Color3?, number?, boolean?];
export type ThemeSet = (x: ThemeGetOpt) => void;

export type ThemerGetSet = [ThemeGet, ThemeSet];
