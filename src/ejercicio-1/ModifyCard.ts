import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";
import chalk from "chalk";
import { rename, writeFile } from "node:fs"


/**
 * Represents an operation to modify a card in a collection.
 */
export class ModifyCard {
  /**
   * Creates an instance of ModifyCard.
   * @param Cards The collection of cards to be modified.
   */
  constructor(private Cards: CardCollection){};

  /**
   * Modifies a card in the collection.
   * @param toModify The card to be modified.
   */
  modify(toModify: Card): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toModify.id;
    });
    if (found) {
      const urlPath = `${this.Cards.getUser()}/${found.name}.json`;
      const toWrite = JSON.stringify(toModify, null, 2);
      writeFile(urlPath, toWrite, {flag: "w"}, (err) => {
        if (err) throw(err);
      });
      
      rename(urlPath, `${this.Cards.getUser()}/${toModify.name}.json`, (err) => {
        if (err) throw(err);
        else console.log(chalk.green(`The card ${toModify.id} has been modified in the collection of ${this.Cards.getUser()}`));
      });
    }
    else {
      console.log(chalk.red("The card to modify was not found"));
    }
  }
}
