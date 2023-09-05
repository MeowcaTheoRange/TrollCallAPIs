import { Levels, Permissions } from "@/permissions";
import { ServerClan } from "@/types/clan";
import { verify } from "argon2";
import { ObjectId } from "mongodb";

export function getLevel(clan: Partial<ServerClan> & { flairs: ObjectId[] }) {
    let highestLevel = "CLAN";
    for (let level of Permissions) {
        if (clan.flairs.some(oid => level.values.includes(oid.toString())))
            highestLevel = level.name;
    }
    return highestLevel;
}

export function compareLevels(level: string, compareLevel: string) {
    return Levels[level] > Levels[compareLevel];
}

export async function compareCredentials(
    clan: ServerClan,
    cookies: Partial<{
        [key: string]: string;
    }>
) {
    if (cookies.TROLLCALL_CODE == null) return null;
    return (
        (await verify(clan.code, cookies.TROLLCALL_CODE)) &&
        clan.name === cookies.TROLLCALL_NAME
    );
}
