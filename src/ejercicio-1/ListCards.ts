import { Colors, Correspondencies } from "./Card.js";
import { CardCollection } from "./CardCollection.js";
import chalk from "chalk";

export class ListCards {
  constructor(private Cards: CardCollection){}
  // Para las pruebas seria mejor que devuelva un string.
  // Mejorar la presentacion de la informacion  .
  list(): void {
    this.Cards.collection.forEach((card) => {
        console.log(card.id, card.name, card.mana, chalk.hex(Correspondencies[card.color])(Colors[card.color]), card.typeLine, card.oddity, card.rules, card.strength ?? "", card.endurance ?? "", card.loyalty ?? "", card.marketValue); // Cuidado con mostrar undefined
    })
  }
}