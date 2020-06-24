// import { InvalidParameterError } from "../errors/InvalidParameterError";

export class Genre {
    constructor(
        private id: string,
        private name: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}

// export enum GenreOption {
//     AXE = "AXÉ",
//     BLUES = "BLUES",
//     COUNTRY = "COUNTRY",
//     ELETRO = "ELETRÔNICA",
//     FORRO = "FORRÓ",
//     FUNK = "FUNK",
//     GOSPEL = "GOSPEL",
//     HIPHOP = "HIP HOP",
//     JAZZ = "JAZZ",
//     MPB = "MPB",
//     CLASSIC = "MÚSICA CLÁSSICA",
//     PAGODE = "PAGODE",
//     POP = "POP",
//     RAP = "RAP",
//     REGGAE = "REGGAE",
//     ROCK = "ROCK",
//     SAMBA = "SAMBA",
//     SERTANEJO = "SERTANEJO"
// }

// export const stringToGenreOption = (input: string): GenreOption => {
//     switch (input) {
//         case "AXÉ":
//             return GenreOption.AXE;
//         case "BLUES":
//             return GenreOption.BLUES;
//         case "COUNTRY":
//             return GenreOption.COUNTRY;
//         case "ELETRÔNICA":
//             return GenreOption.ELETRO;
//         case "FORRÓ":
//             return GenreOption.FORRO;
//         case "FUNK":
//             return GenreOption.FUNK;
//         case "GOSPEL":
//             return GenreOption.GOSPEL;
//         case "HIP HOP":
//             return GenreOption.HIPHOP;
//         case "JAZZ":
//             return GenreOption.JAZZ;
//         case "MPB":
//             return GenreOption.MPB;
//         case "MÚSICA CLÁSSICA":
//             return GenreOption.CLASSIC;
//         case "PAGODE":
//             return GenreOption.PAGODE;
//         case "POP":
//             return GenreOption.POP;
//         case "RAP":
//             return GenreOption.RAP;
//         case "REGGAE":
//             return GenreOption.REGGAE;
//         case "ROCK":
//             return GenreOption.ROCK;
//         case "SAMBA":
//             return GenreOption.SAMBA;
//         case "SERTANEJO":
//             return GenreOption.SERTANEJO;
//         default:
//             throw new InvalidParameterError("Invalid music genre");
//     }
// };