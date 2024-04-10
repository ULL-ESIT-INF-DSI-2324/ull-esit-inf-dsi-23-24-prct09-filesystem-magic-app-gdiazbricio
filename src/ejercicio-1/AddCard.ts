import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";
import { access, writeFile } from "node:fs"
import chalk from "chalk";

/**
 * Represents an operation to add a card to a collection.
 */
export class AddCard {
  /**
   * Creates an instance of AddCard.
   * @param Cards The collection of cards to which the card will be added.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Adds a new card to the collection.
   * @param newCard The card to be added.
   */
  add(newCard: Card): void {
    // const found = this.Cards.collection.find((card) => {
    //   return card.id === newCard.id;
    // });
    // if (found) {
    //   console.log(chalk.red("Card is already added in the collection of", this.Cards.getUser()));
    // } else {
    //   this.Cards.collection.push(newCard);
    //   console.log(chalk.green(`Added card ${newCard.name} to ${this.Cards.getUser()} collection`))
    // }
    const urlPath = `${this.Cards.getUser()}/${newCard.name}.json`;
    const toWrite = JSON.stringify(newCard, null, 2);
    access(urlPath, (error) => {
      if (!error){
        console.log(chalk.red("Card is already added in the collection of", this.Cards.getUser()));
      } 
      else {
        writeFile(urlPath, toWrite, {flag: "w"}, (error) => {
          if (error) throw(error);
          else console.log(chalk.green(`Added card ${newCard.name} to ${this.Cards.getUser()} collection`))
        });
      }
    });
  }
}
