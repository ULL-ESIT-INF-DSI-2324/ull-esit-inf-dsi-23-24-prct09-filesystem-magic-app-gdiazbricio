import { CardCollection } from "./CardCollection.js";
import { Correspondencies, Colors, TypeLines, Oddities } from "./Card.js";
import chalk from "chalk";

/**
 * Represents an operation to show details of a specific card.
 */
export class ShowCard {
  /**
   * Creates an instance of ShowCard.
   * @param Cards The collection of cards from which the card details will be shown.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Shows the details of a specific card.
   * @param toShowId The id of the card to show.
   */
  showCard(toShowId: number): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toShowId;
    });
    if (found) {
      console.log(`ID: ${found.id}, Nombre: ${found.name}, Mana: ${found.mana}, Color: ${chalk.hex(Correspondencies[found.color])(Colors[found.color])}, TypeLine: ${TypeLines[found.typeLine]}, Rareza: ${Oddities[found.oddity]}, Reglas: ${found.rules}, Fuerza: ${found.strength ?? ""}, Resistencia: ${found.endurance ?? ""}, Lealtad: ${found.loyalty ?? ""}, Valor de mercado: ${found.marketValue}`);
    } else {
      console.log(chalk.red("The card to show was not found"));
    }
  }
}
