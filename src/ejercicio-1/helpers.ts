import { Colors, Oddities, TypeLines } from "./Card.js"

export function getColorsByName(toSearch: string): Colors {
  toSearch.toLocaleLowerCase();
  switch (toSearch) {
    case "white": return Colors.White;
    case "blue": return Colors.Blue;
    case "black": return Colors.Black;
    case "red": return Colors.Red;
    case "green": return Colors.Green;
    case "acolor": return Colors.Acolor;
    case "multicolor": return Colors.Multicolor;
    default:
      return Colors.Acolor;
  }
}

export function getTypeLineByName(toSearch: string): TypeLines {
  toSearch.toLocaleLowerCase();
  switch (toSearch) {
    case "ground": return TypeLines.Ground;
    case "creature": return TypeLines.Creature;
    case "enchanting": return TypeLines.Enchanting;
    case "conjure": return TypeLines.Conjure;
    case "instant": return TypeLines.Instant;
    case "artefact": return TypeLines.Artefact;
    case "planeswalker": return TypeLines.Planeswalker;
    default:
      return TypeLines.Ground;
  }
}

export function getOddityByName(toSearch: string): Oddities {
  toSearch.toLocaleLowerCase();
  switch (toSearch) {
    case "common": return Oddities.Common;
    case "unfrecuent": return Oddities.Unfrecuent;
    case "mithic": return Oddities.Mithic;
    default:
      return Oddities.Common;
  }
}