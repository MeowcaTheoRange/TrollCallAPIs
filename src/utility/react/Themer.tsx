import { Color3 } from "@/types/assist/color";
import { createContext } from "react";

export default function Themer({
  pri,
  sec,
  inverted,
}: {
  pri: Color3;
  sec: Color3;
  inverted?: boolean;
}) {
  return inverted ? (
    <style>{`
      /* If you are seeing this, congratulations! You now have ligma. */
      :root {
        --pri-bg: #${pri.lighten(70).toHex()};
        --pri-fg: #${pri.darken(70).toHex()};

        --sec-bg: #${sec.lighten(70).toHex()};
        --sec-fg: #${sec.darken(70).toHex()};
      }
    `}</style>
  ) : (
    <style>{`
      /* If you are seeing this, congratulations! You now have ligma. */
      :root {
        --pri-bg: #${pri.darken(70).toHex()};
        --pri-fg: #${pri.lighten(70).toHex()};

        --sec-bg: #${sec.darken(70).toHex()};
        --sec-fg: #${sec.lighten(70).toHex()};
      }
    `}</style>
  );
}

export const ThemeModeContext = createContext(false as boolean | undefined);
