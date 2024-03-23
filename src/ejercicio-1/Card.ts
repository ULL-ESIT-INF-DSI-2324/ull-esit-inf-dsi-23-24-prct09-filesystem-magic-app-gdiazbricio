export enum Colors {
  White,
  Blue,
  Black,
  Red,
  Green,
  Acolor,
  Multicolor
}

export const Correspondencies = ["#ffffff", "0000ff", "000000", "ff00000", "00ff00", "ffffff", "ffffff"];

export enum TypeLines {
  Ground,
  Creature,
  Enchanting,
  Conjure,
  Instant,
  Artefact,
  Planeswalker
}

export enum Oddities {
  Common,
  Unfrecuent,
  Mithic
}

export interface Card {
  id: number,
  name: string,
  mana: number,
  color: Colors,
  typeLine: TypeLines,
  oddity: Oddities,
  rules: string,
  strength?: number,
  endurance?: number,
  loyalty?: number,
  marketValue: number
}