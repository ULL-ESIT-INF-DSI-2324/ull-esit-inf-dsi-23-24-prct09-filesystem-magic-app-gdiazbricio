import { CardCollection } from "./CardCollection.js";
import chalk from "chalk";

/**
 * Represents an operation to delete a card from a collection.
 */
export class DeleteCard {
  /**
   * Creates an instance of DeleteCard.
   * @param Cards The collection of cards from which the card will be deleted.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Deletes a card from the collection based on its id.
   * @param toDeleteId The id of the card to be deleted.
   */
  delete(toDeleteId: number): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toDeleteId;
    });
    if (found) {
      this.Cards.collection = this.Cards.collection.filter((card) => {
        return card.id !== toDeleteId;
      });
      console.log(chalk.green("The card " + toDeleteId + " has been deleted from the collection of", this.Cards.getUser())); 
    } else {
      console.log(chalk.red("The card to delete was not found"));
    }
  }
}
