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

export const counterspell: Card = {
  id: 3,
  name: "Counterspell",
  mana: 2,
  color: Colors.Blue,
  typeLine: TypeLines.Instant,
  oddity: Oddities.Common,
  rules: "Counter target spell.",
  marketValue: 5 // Solo un valor de mercado imaginario
};

export const llanowarElves: Card = {
  id: 3,
  name: "Llanowar Elves",
  mana: 1,
  color: Colors.Green,
  typeLine: TypeLines.Creature,
  oddity: Oddities.Common,
  rules: "Tap: Add {G}.",
  strength: 1,
  endurance: 1,
  marketValue: 2 // Solo un valor de mercado imaginario
};