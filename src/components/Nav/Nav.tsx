import globals from "@/styles/global.module.css";
import { AnyObject } from "@/types/generics";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav(elementProps: AnyObject) {
  return (
    <div className={styles.Nav} {...elementProps}>
      <div className={styles.left}>
        <div className={styles.titlePath}>
          <span className={globals.title}>
            <Link className={globals.link} href="/">
              TrollCall
            </Link>
          </span>
        </div>
        <span className={globals.icon}>
          <Link className={globals.link} href="/add/troll/">
            add
          </Link>
        </span>
        <span className={globals.iconlike}>
          <Link className={globals.link} href="/hiveswap/">
            HS
          </Link>
        </span>
        <span className={globals.icon}>
          <Link className={globals.link} href="http://discord.trollcall.xyz/">
            groups
          </Link>
        </span>
      </div>
      <div className={styles.right}>
        <span className={globals.text}>
          Part of{" "}
          <a className={globals.link} href="https://www.google.com/">
            The Admin Clan
          </a>
        </span>
        <span className={globals.icon}>settings</span>
        <span className={globals.icon}>logout</span>
      </div>
    </div>
  );
}
