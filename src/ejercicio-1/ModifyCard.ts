import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";
import chalk from "chalk";

export class ModifyCard {
  constructor(private Cards: CardCollection){};

  modify(toModify: Card): void {
    const found = this.Cards.collection.findIndex((card) => {
      return card.id === toModify.id;
    });
    if (found >= 0) {
      this.Cards.collection[found] = toModify;
      console.log(chalk.green("se ha modificado la carta " + toModify.id));
    }
    else console.log(chalk.red("No se ha encontrado la carta a modificar"));
  }
}