import { Levels, Permissions } from "@/permissions";
import { ServerClan } from "@/types/clan";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";
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

export function compareCredentials(
    clan: ServerClan,
    cookies: Partial<{
        [key: string]: string;
    }>
) {
    const decryptCode = AES.decrypt(
        clan.code,
        process.env.ENCRYPT_CODE ?? "HACKTHIS"
    ).toString(CryptoJS.enc.Utf8);
    return (
        decryptCode === cookies.TROLLCALL_CODE &&
        clan.name === cookies.TROLLCALL_NAME
    );
}
