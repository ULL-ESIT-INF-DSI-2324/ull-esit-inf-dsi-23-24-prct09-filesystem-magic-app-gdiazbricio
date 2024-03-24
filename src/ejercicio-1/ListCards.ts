import { Colors, TypeLines, Oddities, Correspondencies } from "./Card.js";
import { CardCollection } from "./CardCollection.js";
import chalk from "chalk";

/**
 * Represents an operation to list cards in a collection.
 */
export class ListCards {
  /**
   * Creates an instance of ListCards.
   * @param Cards The collection of cards to be listed.
   */
  constructor(private Cards: CardCollection) {}

  /**
   * Lists all the cards in the collection with their details.
   */
  list(): void {
    this.Cards.collection.forEach((card) => {
      console.log(
        `ID: ${card.id}, Nombre: ${card.name}, Mana: ${card.mana}, Color: ${chalk.hex(Correspondencies[card.color])(Colors[card.color])}, TypeLine: ${TypeLines[card.typeLine]}, Rareza: ${Oddities[card.oddity]}, Reglas: ${card.rules}, Fuerza: ${card.strength ?? ""}, Resistencia: ${card.endurance ?? ""}, Lealtad: ${card.loyalty ?? ""}, Valor de mercado: ${card.marketValue}`,
      );
    });
  }
}
