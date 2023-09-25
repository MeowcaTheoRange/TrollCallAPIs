import { SubmitMessage } from "@/types/client/message";
import { ClientMessage, ServerMessage } from "@/types/message";

export function ServerMessageToClientMessage(
    serverMessage: ServerMessage
): Omit<ClientMessage, "from"> {
    let clientMessage: Omit<ClientMessage, "from"> = {
        _id: serverMessage._id.toString(),
        date: serverMessage.date,
        subject: serverMessage.subject,
        body: serverMessage.body
    };

    return clientMessage;
}

export function SubmitMessageToServerMessage(
    submitMessage: SubmitMessage
): Omit<Omit<Omit<ServerMessage, "_id">, "from">, "to"> {
    let serverMessage: Omit<Omit<Omit<ServerMessage, "_id">, "from">, "to"> = {
        date: new Date(Date.now()),
        subject: submitMessage.subject,
        body: submitMessage.body
    };
    return serverMessage;
}
