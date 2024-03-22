import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";

export class ModifyCard {
  constructor(private Cards: CardCollection){};

  modify(toModify: Card): void {
    const found = this.Cards.collection.findIndex((card) => {
      card.id === toModify.id;
    });
    if (found >= 0) {
      this.Cards.collection[0] = toModify;
      console.log("se ha modificado la carta ...") // Poner colores y template string.
    }
    else console.log("No se ha encontrado la carta a modificar"); // Poner colores.
  }
}