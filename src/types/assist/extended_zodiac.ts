import * as yup from "yup";
import { ColorSchema, ColorTypes } from "./color";

export enum ClassGender {
    Male,
    Unisex,
    Female
}

export enum ClassDisposition {
    Active,
    Passive
}

export const ClassShelfSchema = yup.object({
    name: yup.string().required(),
    pair: yup.string().required(),
    keyword: yup.string().required()
});

export type ClassShelfType = {
    name: string;
    pair: string;
    keyword: string;
};

export const ClassShelf: { [key: string]: ClassShelfType } = {
    Magician: {
        name: "Magician",
        pair: "Prophet",
        keyword: "Manipulate"
    },
    Prophet: {
        name: "Prophet",
        pair: "Magician",
        keyword: "Understand"
    },
    Destroyer: {
        name: "Destroyer",
        pair: "Healer",
        keyword: "Destroy" // fucking duh
    },
    Healer: {
        name: "Healer",
        pair: "Destroyer",
        keyword: "Create"
    },
    Stealer: {
        name: "Stealer",
        pair: "Warrior",
        keyword: "Redistribute"
    },
    Warrior: {
        name: "Warrior",
        pair: "Stealer",
        keyword: "Apply"
    }
};

export const ClassSchema = yup.object({
    name: yup.string().required(),
    gender: yup.string().required(),
    disposition: yup.string().required(),
    pair: yup.string().required(),
    inverse: yup.string().required(),
    keyword: yup.string().required(),
    shelf: ClassShelfSchema.required()
});

export type ClassType = {
    name: string;
    gender: string; // just for "canon check"; this is not actually enforced
    disposition: string;
    pair: string;
    inverse: string;
    keyword: string;
    shelf: ClassShelfType;
};

export const Class: { [key: string]: ClassType } = {
    Witch: {
        name: "Witch",
        gender: "Female",
        disposition: "Active",
        keyword: "Control",
        pair: "Heir",
        inverse: "Seer",
        shelf: ClassShelf.Magician
    },
    Heir: {
        name: "Heir",
        gender: "Male",
        disposition: "Passive",
        keyword: "Influence",
        pair: "Witch",
        inverse: "Mage",
        shelf: ClassShelf.Magician
    },
    Mage: {
        name: "Mage",
        gender: "Unisex",
        disposition: "Active",
        keyword: "Experience",
        pair: "Seer",
        inverse: "Heir",
        shelf: ClassShelf.Prophet
    },
    Seer: {
        name: "Seer",
        gender: "Unisex",
        disposition: "Passive",
        keyword: "Study",
        pair: "Mage",
        inverse: "Witch",
        shelf: ClassShelf.Prophet
    },
    Prince: {
        name: "Prince",
        gender: "Male",
        disposition: "Active",
        keyword: "Demolish",
        pair: "Bard",
        inverse: "Sylph",
        shelf: ClassShelf.Destroyer
    },
    Bard: {
        name: "Bard",
        gender: "Male",
        disposition: "Passive",
        keyword: "Deconstruct",
        pair: "Prince",
        inverse: "Maid",
        shelf: ClassShelf.Destroyer
    },
    Maid: {
        name: "Maid",
        gender: "Female",
        disposition: "Active",
        keyword: "Generate",
        pair: "Sylph",
        inverse: "Bard",
        shelf: ClassShelf.Healer
    },
    Sylph: {
        name: "Sylph",
        gender: "Female",
        disposition: "Passive",
        keyword: "Mend",
        pair: "Maid",
        inverse: "Prince",
        shelf: ClassShelf.Healer
    },
    Thief: {
        name: "Thief",
        gender: "Unisex",
        disposition: "Active",
        keyword: "Take",
        pair: "Rogue",
        inverse: "Page",
        shelf: ClassShelf.Stealer
    },
    Rogue: {
        name: "Rogue",
        gender: "Unisex",
        disposition: "Passive",
        keyword: "Share",
        pair: "Thief",
        inverse: "Knight",
        shelf: ClassShelf.Stealer
    },
    Knight: {
        name: "Knight",
        gender: "Unisex",
        disposition: "Active",
        keyword: "Exploit",
        pair: "Page",
        inverse: "Rogue",
        shelf: ClassShelf.Warrior
    },
    Page: {
        name: "Page",
        gender: "Unisex",
        disposition: "Passive",
        keyword: "Empower",
        pair: "Knight",
        inverse: "Thief",
        shelf: ClassShelf.Warrior
    },
    Lord: {
        name: "Lord",
        gender: "Male",
        disposition: "Active",
        keyword: "Dominate",
        pair: "Muse",
        inverse: "Muse",
        shelf: ClassShelf.Master
    },
    Muse: {
        name: "Muse",
        gender: "Female",
        disposition: "Passive",
        keyword: "Inspire",
        pair: "Lord",
        inverse: "Lord",
        shelf: ClassShelf.Master
    }
};

export const ClassKeys = Object.keys(Class);
export const ClassValues = Object.values(Class);

export const SwaySchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    color: ColorSchema.required()
});

export type SwayType = {
    name: string;
    description: string;
    color: ColorTypes;
};

export const Sway: { [key: string]: SwayType } = {
    Prospit: {
        name: "Prospit",
        description: "",
        color: [1, 1, 0]
    },
    Derse: {
        name: "Derse",
        description: "",
        color: [1, 0, 1]
    }
};

export const SwayKeys = Object.keys(Sway);
export const SwayValues = Object.values(Sway);

export const AspectSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    color: ColorSchema.required()
});

export type AspectType = {
    name: string;
    description: string;
    color: ColorTypes;
};

export const Aspect: { [key: string]: AspectType } = {
    Time: {
        name: "Time",
        description: "",
        color: [1, 0.125, 0]
    },
    Space: {
        name: "Space",
        description: "",
        color: [0, 0, 0]
    },
    Heart: {
        name: "Heart",
        description: "",
        color: [0.75, 0, 0.25]
    },
    Mind: {
        name: "Mind",
        description: "",
        color: [0, 1, 0.75]
    },
    Hope: {
        name: "Hope",
        description: "",
        color: [1, 0.75, 0.25]
    },
    Rage: {
        name: "Rage",
        description: "",
        color: [0.5, 0.25, 0.75]
    },
    Light: {
        name: "Light",
        description: "",
        color: [1, 1, 0.25]
    },
    Void: {
        name: "Void",
        description: "",
        color: [0, 0.125, 0.25]
    },
    Breath: {
        name: "Breath",
        description: "",
        color: [0.25, 0.75, 1]
    },
    Blood: {
        name: "Blood",
        description: "",
        color: [0.75, 0.125, 0.125]
    },
    Life: {
        name: "Life",
        description: "",
        color: [0.5, 0.75, 0.25]
    },
    Doom: {
        name: "Doom",
        description: "",
        color: [0.5, 0.66, 0]
    }
};

export const AspectKeys = Object.keys(Aspect);
export const AspectValues = Object.values(Aspect);

export const SignColorSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    sign: yup.string().required(),
    color: ColorSchema.required(),
    dates: yup
        .tuple([yup.string().required(), yup.string().required()])
        .required()
});

export type SignColorType = {
    name: string;
    description: string;
    sign: string;
    color: ColorTypes;
    dates: [string, string];
};

export const SignColor: {
    [key: string]: SignColorType;
} = {
    Rust: {
        name: "Rust",
        description: "",
        sign: "Aries",
        color: [1, 0, 0],
        dates: ["March 21", "April 19"]
    },
    Bronze: {
        name: "Bronze",
        description: "",
        sign: "Taurus",
        color: [1, 0.5, 0],
        dates: ["April 20", "May 20"]
    },
    Gold: {
        name: "Gold",
        description: "",
        sign: "Gemini",
        color: [1, 1, 0],
        dates: ["May 21", "June 21"]
    },
    Lime: {
        name: "Lime",
        description: "",
        sign: "Cancer",
        color: [0.5, 1, 0],
        dates: ["June 22", "July 22"]
    },
    Olive: {
        name: "Olive",
        description: "",
        sign: "Leo",
        color: [0, 1, 0],
        dates: ["July 23", "August 22"]
    },
    Jade: {
        name: "Jade",
        description: "",
        sign: "Virgo",
        color: [0, 1, 0.5],
        dates: ["August 23", "September 22"]
    },
    Teal: {
        name: "Teal",
        description: "",
        sign: "Libra",
        color: [0, 1, 1],
        dates: ["September 23", "October 23"]
    },
    Blue: {
        name: "Blue",
        description: "",
        sign: "Scorpio",
        color: [0, 0.5, 1],
        dates: ["October 24", "November 21"]
    },
    Indigo: {
        name: "Indigo",
        description: "",
        sign: "Sagittarius",
        color: [0, 0, 1],
        dates: ["November 22", "December 21"]
    },
    Purple: {
        name: "Purple",
        description: "",
        sign: "Capricorn",
        color: [0.5, 0, 1],
        dates: ["December 22", "January 19"]
    },
    Violet: {
        name: "Violet",
        description: "",
        sign: "Aquarius",
        color: [1, 0, 1],
        dates: ["January 20", "February 18"]
    },
    Fuchsia: {
        name: "Fuchsia",
        description: "",
        sign: "Pisces",
        color: [1, 0, 0.5],
        dates: ["February 19", "March 20"]
    }
};

export const SignColorKeys = Object.keys(SignColor);
export const SignColorValues = Object.values(SignColor);

export const TrueSignSchema = yup.object({
    name: yup.string().required(),
    aspect: AspectSchema.required(),
    sway: SwaySchema.required(),
    color: SignColorSchema.required()
});

export type TrueSignType = {
    name: string;
    aspect: AspectType;
    sway: SwayType;
    color: SignColorType;
};

export const TrueSign: {
    [key: string]: TrueSignType;
} = {
    Aries: {
        name: "Aries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arsces: {
        name: "Arsces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arrius: {
        name: "Arrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Ariborn: {
        name: "Ariborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arittarius: {
        name: "Arittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arpia: {
        name: "Arpia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arza: {
        name: "Arza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arga: {
        name: "Arga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Aro: {
        name: "Aro",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arcen: {
        name: "Arcen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Armini: {
        name: "Armini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arun: {
        name: "Arun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Rust
    },
    Arist: {
        name: "Arist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arsci: {
        name: "Arsci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arnius: {
        name: "Arnius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Aricorn: {
        name: "Aricorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arittanius: {
        name: "Arittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arpio: {
        name: "Arpio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arra: {
        name: "Arra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Argo: {
        name: "Argo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arlo: {
        name: "Arlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arcer: {
        name: "Arcer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Armino: {
        name: "Armino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Arus: {
        name: "Arus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Rust
    },
    Taurus: {
        name: "Taurus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurist: {
        name: "Taurist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taursci: {
        name: "Taursci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurnius: {
        name: "Taurnius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Tauricorn: {
        name: "Tauricorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurittanius: {
        name: "Taurittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurpio: {
        name: "Taurpio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurra: {
        name: "Taurra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurgo: {
        name: "Taurgo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurlo: {
        name: "Taurlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurcer: {
        name: "Taurcer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurmino: {
        name: "Taurmino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Bronze
    },
    Taurun: {
        name: "Taurun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Tauries: {
        name: "Tauries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taursces: {
        name: "Taursces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurrius: {
        name: "Taurrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Tauriborn: {
        name: "Tauriborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurittarius: {
        name: "Taurittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurpia: {
        name: "Taurpia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurza: {
        name: "Taurza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurga: {
        name: "Taurga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Tauro: {
        name: "Tauro",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurcen: {
        name: "Taurcen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Taurmini: {
        name: "Taurmini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Bronze
    },
    Gemini: {
        name: "Gemini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemun: {
        name: "Gemun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemries: {
        name: "Gemries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemsces: {
        name: "Gemsces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemrius: {
        name: "Gemrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemiborn: {
        name: "Gemiborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemittarius: {
        name: "Gemittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gempia: {
        name: "Gempia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemza: {
        name: "Gemza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemga: {
        name: "Gemga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemo: {
        name: "Gemo",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemcen: {
        name: "Gemcen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Gold
    },
    Gemino: {
        name: "Gemino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemus: {
        name: "Gemus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemrist: {
        name: "Gemrist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemsci: {
        name: "Gemsci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemnius: {
        name: "Gemnius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemicorn: {
        name: "Gemicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemittanius: {
        name: "Gemittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gempio: {
        name: "Gempio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemra: {
        name: "Gemra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemgo: {
        name: "Gemgo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemlo: {
        name: "Gemlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Gemcer: {
        name: "Gemcer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Gold
    },
    Cancer: {
        name: "Cancer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Camino: {
        name: "Camino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canus: {
        name: "Canus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canrist: {
        name: "Canrist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Cansci: {
        name: "Cansci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Cannius: {
        name: "Cannius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canicorn: {
        name: "Canicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canittanius: {
        name: "Canittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canpio: {
        name: "Canpio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canra: {
        name: "Canra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Cango: {
        name: "Cango",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Canlo: {
        name: "Canlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Lime
    },
    Cancen: {
        name: "Cancen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Camini: {
        name: "Camini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canun: {
        name: "Canun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canries: {
        name: "Canries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Cansces: {
        name: "Cansces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canrius: {
        name: "Canrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Caniborn: {
        name: "Caniborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canittarius: {
        name: "Canittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canpia: {
        name: "Canpia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canza: {
        name: "Canza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Canga: {
        name: "Canga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Cano: {
        name: "Cano",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Lime
    },
    Leo: {
        name: "Leo",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lecen: {
        name: "Lecen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lemini: {
        name: "Lemini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Leun: {
        name: "Leun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Leries: {
        name: "Leries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lesces: {
        name: "Lesces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lerius: {
        name: "Lerius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Leiborn: {
        name: "Leiborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Leittarius: {
        name: "Leittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lepia: {
        name: "Lepia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Leza: {
        name: "Leza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lega: {
        name: "Lega",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Olive
    },
    Lelo: {
        name: "Lelo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lecer: {
        name: "Lecer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lemino: {
        name: "Lemino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Leus: {
        name: "Leus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lerist: {
        name: "Lerist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lesci: {
        name: "Lesci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lenius: {
        name: "Lenius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Leicorn: {
        name: "Leicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Leittanius: {
        name: "Leittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lepio: {
        name: "Lepio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lera: {
        name: "Lera",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Lego: {
        name: "Lego",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Olive
    },
    Virgo: {
        name: "Virgo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virlo: {
        name: "Virlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Vircer: {
        name: "Vircer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virmino: {
        name: "Virmino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virus: {
        name: "Virus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virist: {
        name: "Virist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virsci: {
        name: "Virsci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virnius: {
        name: "Virnius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Viricorn: {
        name: "Viricorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virittanius: {
        name: "Virittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virpio: {
        name: "Virpio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virra: {
        name: "Virra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Jade
    },
    Virga: {
        name: "Virga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Viro: {
        name: "Viro",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Vircen: {
        name: "Vircen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virmini: {
        name: "Virmini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virun: {
        name: "Virun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Viries: {
        name: "Viries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virsces: {
        name: "Virsces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virrius: {
        name: "Virrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Viriborn: {
        name: "Viriborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virittarius: {
        name: "Virittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virpia: {
        name: "Virpia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Virza: {
        name: "Virza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Jade
    },
    Libra: {
        name: "Libra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Ligo: {
        name: "Ligo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Liblo: {
        name: "Liblo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Licer: {
        name: "Licer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Limino: {
        name: "Limino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libus: {
        name: "Libus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Librist: {
        name: "Librist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libsci: {
        name: "Libsci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libnius: {
        name: "Libnius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libicorn: {
        name: "Libicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libittanius: {
        name: "Libittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Lipio: {
        name: "Lipio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Teal
    },
    Libza: {
        name: "Libza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Liga: {
        name: "Liga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libo: {
        name: "Libo",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Licen: {
        name: "Licen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Limini: {
        name: "Limini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libun: {
        name: "Libun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libries: {
        name: "Libries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libsces: {
        name: "Libsces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Librius: {
        name: "Librius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libiborn: {
        name: "Libiborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Libittarius: {
        name: "Libittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Lipia: {
        name: "Lipia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Teal
    },
    Scorpio: {
        name: "Scorpio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorra: {
        name: "Scorra",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorgo: {
        name: "Scorgo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorlo: {
        name: "Scorlo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorcer: {
        name: "Scorcer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scormino: {
        name: "Scormino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorus: {
        name: "Scorus",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorist: {
        name: "Scorist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorsci: {
        name: "Scorsci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scornius: {
        name: "Scornius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scoricorn: {
        name: "Scoricorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorittanius: {
        name: "Scorittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Blue
    },
    Scorpia: {
        name: "Scorpia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorza: {
        name: "Scorza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorga: {
        name: "Scorga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scoro: {
        name: "Scoro",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorcen: {
        name: "Scorcen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scormini: {
        name: "Scormini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorun: {
        name: "Scorun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scories: {
        name: "Scories",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorsces: {
        name: "Scorsces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorrius: {
        name: "Scorrius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scoriborn: {
        name: "Scoriborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Scorittarius: {
        name: "Scorittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Blue
    },
    Sagittarius: {
        name: "Sagittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagipia: {
        name: "Sagipia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagiza: {
        name: "Sagiza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagiga: {
        name: "Sagiga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagio: {
        name: "Sagio",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagicen: {
        name: "Sagicen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagimini: {
        name: "Sagimini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagiun: {
        name: "Sagiun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagiries: {
        name: "Sagiries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagisces: {
        name: "Sagisces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagirius: {
        name: "Sagirius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagiborn: {
        name: "Sagiborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Indigo
    },
    Sagittanius: {
        name: "Sagittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagipio: {
        name: "Sagipio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagira: {
        name: "Sagira",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagigo: {
        name: "Sagigo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagilo: {
        name: "Sagilo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagicer: {
        name: "Sagicer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagimino: {
        name: "Sagimino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagius: {
        name: "Sagius",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagirist: {
        name: "Sagirist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagisci: {
        name: "Sagisci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Saginius: {
        name: "Saginius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Sagicorn: {
        name: "Sagicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Indigo
    },
    Capricorn: {
        name: "Capricorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprittanius: {
        name: "Caprittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Capripio: {
        name: "Capripio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprira: {
        name: "Caprira",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprigo: {
        name: "Caprigo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprilo: {
        name: "Caprilo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Capricer: {
        name: "Capricer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprimino: {
        name: "Caprimino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprius: {
        name: "Caprius",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprist: {
        name: "Caprist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprisci: {
        name: "Caprisci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Caprinius: {
        name: "Caprinius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Purple
    },
    Capriborn: {
        name: "Capriborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Caprittarius: {
        name: "Caprittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capripia: {
        name: "Capripia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capriza: {
        name: "Capriza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capriga: {
        name: "Capriga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Caprio: {
        name: "Caprio",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capricen: {
        name: "Capricen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Caprimini: {
        name: "Caprimini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capriun: {
        name: "Capriun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capries: {
        name: "Capries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Caprisces: {
        name: "Caprisces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Capririus: {
        name: "Capririus",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Purple
    },
    Aquarius: {
        name: "Aquarius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquiborn: {
        name: "Aquiborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquittarius: {
        name: "Aquittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquapia: {
        name: "Aquapia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquaza: {
        name: "Aquaza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquaga: {
        name: "Aquaga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquo: {
        name: "Aquo",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquacen: {
        name: "Aquacen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquamini: {
        name: "Aquamini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquiun: {
        name: "Aquiun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquaries: {
        name: "Aquaries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquasces: {
        name: "Aquasces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Violet
    },
    Aquanius: {
        name: "Aquanius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquicorn: {
        name: "Aquicorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquittanius: {
        name: "Aquittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquapio: {
        name: "Aquapio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquara: {
        name: "Aquara",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquago: {
        name: "Aquago",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aqualo: {
        name: "Aqualo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquacer: {
        name: "Aquacer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquamino: {
        name: "Aquamino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquius: {
        name: "Aquius",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquarist: {
        name: "Aquarist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Aquasci: {
        name: "Aquasci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Violet
    },
    Pisces: {
        name: "Pisces",
        aspect: Aspect.Life,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pirius: {
        name: "Pirius",
        aspect: Aspect.Hope,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Piborn: {
        name: "Piborn",
        aspect: Aspect.Rage,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pittarius: {
        name: "Pittarius",
        aspect: Aspect.Void,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pipia: {
        name: "Pipia",
        aspect: Aspect.Light,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Piza: {
        name: "Piza",
        aspect: Aspect.Mind,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Piga: {
        name: "Piga",
        aspect: Aspect.Space,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pio: {
        name: "Pio",
        aspect: Aspect.Heart,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Picen: {
        name: "Picen",
        aspect: Aspect.Blood,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pimini: {
        name: "Pimini",
        aspect: Aspect.Doom,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Piun: {
        name: "Piun",
        aspect: Aspect.Breath,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Piries: {
        name: "Piries",
        aspect: Aspect.Time,
        sway: Sway.Derse,
        color: SignColor.Fuchsia
    },
    Pisci: {
        name: "Pisci",
        aspect: Aspect.Life,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pinius: {
        name: "Pinius",
        aspect: Aspect.Hope,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Picorn: {
        name: "Picorn",
        aspect: Aspect.Rage,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pittanius: {
        name: "Pittanius",
        aspect: Aspect.Void,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pipio: {
        name: "Pipio",
        aspect: Aspect.Light,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pira: {
        name: "Pira",
        aspect: Aspect.Mind,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pigo: {
        name: "Pigo",
        aspect: Aspect.Space,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pilo: {
        name: "Pilo",
        aspect: Aspect.Heart,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Picer: {
        name: "Picer",
        aspect: Aspect.Blood,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pimino: {
        name: "Pimino",
        aspect: Aspect.Doom,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pius: {
        name: "Pius",
        aspect: Aspect.Breath,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    },
    Pirist: {
        name: "Pirist",
        aspect: Aspect.Time,
        sway: Sway.Prospit,
        color: SignColor.Fuchsia
    }
};

export const TrueSignKeys = Object.keys(TrueSign);
export const TrueSignValues = Object.values(TrueSign);
