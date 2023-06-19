import { MergeServerUsers, ServerUserToClientUser, SubmitUserToServerUser } from "@/lib/trollcall/convert/user";
import { changeUser, createUser, getSingleUser } from "@/lib/trollcall/user";
import { PartialUserSchema, SubmitUser, SubmitUserSchema } from "@/types/client/user";
import { ServerUser } from "@/types/user";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/user/:user/", async (req, res, next) => {
    const { params } = req;
    const user = await getSingleUser({
        name: params.user
    });
    if (user == null) return res.sendStatus(404);
    const serverUser = await ServerUserToClientUser(user);
    res.json(serverUser);
});

userRouter.post("/user/", async (req, res, next) => {
    const { body } = req;
    let validatedUser: SubmitUser;
    try {
        validatedUser = await SubmitUserSchema.validate(body);
    } catch (err) {
        return res.status(400).send(err);
    }
    const checkExistingUser = await getSingleUser({
        name: validatedUser.name
    });
    if (checkExistingUser != null) return res.sendStatus(409);
    // we are sure this object is full, so cast partial
    const serverUser = SubmitUserToServerUser(validatedUser) as Omit<ServerUser, "_id">;
    const newUser = await createUser(serverUser);
    if (newUser == null) return res.sendStatus(503);
    // Give cookies
    res.cookie("TROLLCALL_NAME", newUser.name, { maxAge: 31540000 })
        .cookie("TROLLCALL_CODE", newUser.code, { maxAge: 31540000 })
        .json(newUser);
});

userRouter.put("/user/:user/", async (req, res, next) => {
    const { body, params, cookies } = req;
    let validatedUser: Partial<SubmitUser>;
    try {
        validatedUser = (await PartialUserSchema.validate(body)) as Partial<SubmitUser>;
    } catch (err) {
        return res.status(400).send(err);
    }
    const checkExistingUser = await getSingleUser({
        name: params.user
    });
    if (checkExistingUser == null) return res.sendStatus(404);
    if (checkExistingUser.code !== cookies.TROLLCALL_CODE || checkExistingUser.name !== cookies.TROLLCALL_NAME)
        return res.sendStatus(403);
    const serverUser = SubmitUserToServerUser(validatedUser);
    const bothUsers = MergeServerUsers(checkExistingUser, serverUser);
    const newUser = await changeUser(bothUsers);
    if (newUser == null) return res.sendStatus(503);
    // Give cookies, redundant style
    res.cookie("TROLLCALL_NAME", newUser.name, { maxAge: 31540000 })
        .cookie("TROLLCALL_CODE", newUser.code, { maxAge: 31540000 })
        .json(newUser);
});
