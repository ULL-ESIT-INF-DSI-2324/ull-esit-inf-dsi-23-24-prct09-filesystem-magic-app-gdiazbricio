import { CardCollection } from "./CardCollection.js";
import chalk from "chalk";

export class DeleteCard {
  constructor(private Cards: CardCollection){}

  // Igual en vez de una card seria mejor un identificador nada mas.
  delete(toDeleteId: number): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toDeleteId;
    });
    if (found) {
      this.Cards.collection = this.Cards.collection.filter((card) => {
        card.id !== toDeleteId;
      });
      console.log(chalk.green("Se ha eliminado la carta " + toDeleteId)); 
    }
    else console.log(chalk.red("No se ha encontrado la carta a eliminar"));
  }
}