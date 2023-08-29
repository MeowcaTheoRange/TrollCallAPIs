import { Color3 } from "@/types/assist/color";

export type BoxConfig = {
  title?: {
    text: string;
    link?: string;
    small?: boolean;
  };
  theme?: Color3;
  nfw?: boolean;
  class?: string;
};
