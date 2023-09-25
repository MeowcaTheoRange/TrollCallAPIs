/* eslint-disable @next/next/no-img-element */
import Box from "@/components/Box/Box";
import globals from "@/styles/global.module.css";
import { ClientClan } from "@/types/clan";
import { ClientMessage } from "@/types/message";
import AuthContext from "@/utility/react/AuthContext";
import Conditional from "@/utility/react/Conditional";
import Link from "next/link";
import { useContext } from "react";
import styles from "./MessageCard.module.css";

export default function MessageCard({
    message,
    recipient
}: {
    message: ClientMessage;
    recipient: ClientClan;
}) {
    const userCredentials = useContext(AuthContext);
    return (
        <Box
            properties={{
                class: styles.MessageCard
            }}
        >
            <div className={styles.horizontal}>
                <Conditional condition={message.from.pfp != null}>
                    <div className={styles.horizontalLeft}>
                        <img
                            src={message.from.pfp as string}
                            width="96"
                            height="96"
                            alt=""
                        ></img>
                    </div>
                </Conditional>
                <div className={styles.horizontalRight}>
                    <Link
                        href={`/clan/${message.from.name}`}
                        className={globals.link}
                    >
                        <p className={globals.title}>
                            {message.from.displayName ?? message.from.name}
                        </p>
                    </Link>
                    {/* <p className={globals.text}>
                        to {recipient.displayName ?? recipient.name}
                    </p> */}
                    <hr className={globals.sep} />
                    <Conditional condition={message.subject != ""}>
                        <p className={globals.titleSmall}>{message.subject}</p>
                    </Conditional>
                    <Conditional condition={message.body != ""}>
                        <p className={globals.text}>{message.body}</p>
                    </Conditional>
                </div>
            </div>
            <div className={globals.horizontalListLeft}>
                <Conditional
                    condition={
                        message.from.name === userCredentials.TROLLCALL_NAME ||
                        recipient.name === userCredentials.TROLLCALL_NAME
                    }
                >
                    <button
                        className={globals.button}
                        onClick={() => {
                            fetch("/api/message/" + message._id, {
                                method: "DELETE"
                            }).then(() => window.location.reload());
                        }}
                    >
                        Delete
                    </button>
                </Conditional>
                <span className={globals.text}>{message._id}</span>
            </div>
        </Box>
    );
}
