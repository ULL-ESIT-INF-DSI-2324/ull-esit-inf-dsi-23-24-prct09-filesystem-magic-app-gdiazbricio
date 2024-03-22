export enum colors {
  White,
  Blue,
  Black,
  Red,
  Green,
  Acolor,
  Multicolor
}

export enum typeLines {
  Ground,
  Creature,
  Enchanting,
  Conjure,
  Instant,
  Artefact,
  Planeswalker
}

export enum oddities {
  Common,
  Unfrecuent,
  Mithic
}

export interface Card {
  id: number,
  name: string,
  mana: number,
  color: colors,
  typeLine: typeLines,
  oddity: oddities,
  rules: string,
  strength?: number,
  endurance?: number,
  loyalty?: number,
  marketValue: number
}

export const counterspell: Card = {
  id: 2,
  name: "Counterspell",
  mana: 2,
  color: colors.Blue,
  typeLine: typeLines.Instant,
  oddity: oddities.Common,
  rules: "Counter target spell.",
  marketValue: 5 // Solo un valor de mercado imaginario
};

export const llanowarElves: Card = {
  id: 3,
  name: "Llanowar Elves",
  mana: 1,
  color: colors.Green,
  typeLine: typeLines.Creature,
  oddity: oddities.Common,
  rules: "Tap: Add {G}.",
  strength: 1,
  endurance: 1,
  marketValue: 2 // Solo un valor de mercado imaginario
};