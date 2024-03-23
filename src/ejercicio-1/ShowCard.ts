import { CardCollection } from "./CardCollection.js";
import {Correspondencies, Colors } from "./Card.js";
import chalk from "chalk";

export class ShowCard {
  constructor(private Cards: CardCollection){}
  showCard(toShowId: number): void {
    const found = this.Cards.collection.find((card) => {
      card.id === toShowId;
    });
    if (found) {
      console.log(found.id, found.name, found.mana, chalk.hex(Correspondencies[found.color])(Colors[found.color]), found.typeLine, found.oddity, found.rules, found.strength ?? "", found.endurance ?? "", found.loyalty ?? "", found.marketValue);
    }
    else console.log(chalk.red("No se ha encontrado la carta a mostrar"));
  }
}