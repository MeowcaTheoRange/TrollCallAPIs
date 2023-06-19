import { ServerTrollToClientTroll } from "@/lib/trollcall/convert/troll";
import { getSingleTroll } from "@/lib/trollcall/troll";
import { getSingleUser } from "@/lib/trollcall/user";
import { Router } from "express";

export const trollRouter = Router();

trollRouter.get("/user/:user/troll/:troll", async (req, res, next) => {
    const { params } = req;
    const user = await getSingleUser({
        name: params.user
    });
    if (user == null) return res.sendStatus(404);
    const troll = await getSingleTroll({
        "name.0": params.troll,
        "owners.0": user._id
    });
    if (troll == null) return res.sendStatus(404);
    const serverTroll = await ServerTrollToClientTroll(troll);
    res.json(serverTroll);
});
