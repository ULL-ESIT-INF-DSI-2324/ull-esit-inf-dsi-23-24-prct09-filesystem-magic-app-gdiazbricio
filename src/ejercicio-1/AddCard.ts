import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";
import chalk from "chalk";
export class AddCard {
  constructor(private Cards: CardCollection){}

  add(newCard: Card): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === newCard.id;
    });
    if (found) console.log(chalk.red("Ya está añadida en la colección de", this.Cards.getUser()));
    else this.Cards.collection.push(newCard); 
  }
}