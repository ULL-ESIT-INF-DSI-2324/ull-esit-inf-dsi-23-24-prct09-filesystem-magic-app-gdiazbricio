import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";
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
    const found = this.Cards.collection.find((card) => {
      return card.id === newCard.id;
    });
    if (found) {
      console.log(chalk.red("Card is already added in the collection of", this.Cards.getUser()));
    } else {
      this.Cards.collection.push(newCard);
    }
  }
}
