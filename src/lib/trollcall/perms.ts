import { Levels, Permissions } from "@/permissions";
import { ServerUser } from "@/types/user";

export function getLevel(user: ServerUser) {
    let highestLevel = "USER";
    for (let level of Permissions) {
        if (user.flairs.some(oid => level.values.includes(oid.toString())))
            highestLevel = level.name;
    }
    return highestLevel;
}

export function compareLevels(level: string, compareLevel: string) {
    return Levels[level] > Levels[compareLevel];
}

export function compareCredentials(
    user: ServerUser,
    cookies: Partial<{
        [key: string]: string;
    }>
) {
    return (
        user.code === cookies.TROLLCALL_CODE &&
        user.name === cookies.TROLLCALL_NAME
    );
}
