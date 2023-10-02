import { WithId } from "@/lib/db/crud";
import _ from "lodash";

export function cutArray<T>(array: T[]) {
    const cut: any[] = [];
    array.forEach((value, i) => {
        if (value == null) return;
        if (Array.isArray(value)) cut[i] = cutArray(value);
        else if (typeof value == "object") cut[i] = cutObject(value);
        else cut[i] = value;
    });
    return cut as NonNullable<T>[];
}

export function cutObject<T extends { [key: string]: any }>(object: T) {
    const keys = Object.keys(object);
    let cut: { [key: string]: any } = {};
    keys.forEach(key => {
        var val = object[key];
        if (val == null) return;
        if (Array.isArray(val)) cut[key] = cutArray(val);
        else if (_.isObject(val)) cut[key] = cutObject(val);
        else cut[key] = val;
    });
    return cut as T;
}

export function cutArrayBlank<T>(array: T[]) {
    const cut: any[] = [];
    array.forEach((value, i) => {
        if (value == null) return;
        else if (
            (typeof value == "string" || Array.isArray(value)) &&
            value.length <= 0
        )
            cut[i] = undefined;
        else if (Array.isArray(value)) cut[i] = cutArrayBlank(value);
        else if (typeof value == "object") cut[i] = cutObjectBlank(value);
        else cut[i] = value;
    });
    return cut as T[];
}

export function cutObjectBlank<T extends { [key: string]: any }>(object: T) {
    const keys = Object.keys(object);
    let cut: { [key: string]: any } = {};
    keys.forEach(key => {
        var val = object[key];
        if (val == null) return;
        else if (
            (typeof val == "string" || Array.isArray(val)) &&
            val.length <= 0
        )
            cut[key] = undefined;
        else if (Array.isArray(val)) cut[key] = cutArrayBlank(val);
        else if (typeof val == "object") cut[key] = cutObjectBlank(val);
        else cut[key] = val;
    });
    return cut as T;
}

export function sanitize<Type extends WithId<{}>>(
    serverType: Type
): Omit<Type, "_id"> {
    const sanitized: Partial<Type> = serverType;
    delete sanitized._id;
    return sanitized as Omit<Type, "_id">;
}

export function removeCode<Type extends { code: string }>(
    serverType: Type
): Omit<Type, "code"> {
    const sanitized: Partial<Type> = serverType;
    delete sanitized.code;
    return sanitized as Omit<Type, "code">;
}
