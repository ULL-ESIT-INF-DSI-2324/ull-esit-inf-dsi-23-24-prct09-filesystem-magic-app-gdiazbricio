import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";

export class DeleteCard {
  constructor(private Cards: CardCollection){}

  // Igual en vez de una card seria mejor un identificador nada mas.
  delete(toDelete: Card): void {
    const found = this.Cards.collection.find((card) => {
      card.id === toDelete.id;
    });
    if (found) {
      this.Cards.collection = this.Cards.collection.filter((card) => {
        card.id !== toDelete.id;
      });
      console.log("Se ha eliminado la carta ..."); // Añadir colores y template string. 
    }
    else console.log("No se ha encontrado la carta a eliminar"); // Poner colores
  }
}