import { TrueSign } from "@/types/assist/extended_zodiac";
import { SubmitUser } from "@/types/client/user";
import { ClientUser, ServerUser } from "@/types/user";
import { nanoid } from "nanoid";
import { getManyFlairs } from "../flair";
import { cutArray, cutObject, removeCode, sanitize } from "../utility/merge";
import { ServerFlairToClientFlair } from "./flair";

export async function ServerUserToClientUser(serverUser: ServerUser): Promise<ClientUser> {
    const sanitizedUser = removeCode(sanitize(serverUser));
    const flairs = await getManyFlairs({ _id: { $in: serverUser.flairs } }, ServerFlairToClientFlair);
    let clientUser: ClientUser = {
        ...sanitizedUser,
        trueSign: TrueSign[serverUser.trueSign],
        flairs: cutArray(flairs),
        updatedDate: serverUser.updatedDate?.getTime()
    };
    return clientUser;
}

export function SubmitUserToServerUser(submitUser: Partial<SubmitUser>): Omit<Partial<ServerUser>, "_id"> {
    let serverUser: Omit<Partial<ServerUser>, "_id"> = {
        ...submitUser,
        flairs: [],
        code: submitUser.code || nanoid(16),
        updatedDate: new Date()
    };
    return serverUser;
}

export function MergeServerUsers(submitUser: ServerUser, merge: Partial<Omit<ServerUser, "_id">>): ServerUser {
    let serverUser: ServerUser = {
        ...submitUser,
        ...cutObject(merge),
        updatedDate: new Date()
    };
    return serverUser;
}
