import { CardCollection } from "./CardCollection.js";
import { Card } from "./Card.js";

export class ShowCard {
  constructor(private Cards: CardCollection){}
  // Para las pruebas seria mejor que devuelva un string.
  showCard(toShow: Card): void {
    const found = this.Cards.collection.find((card) => {
      card.id === toShow.id;
    });
    if (found) {
      // Poner colores como es debido
      console.log(found.id, found.name, found.mana, found.color, found.typeLine, found.oddity, found.rules, found.strength, found.endurance, found.loyalty, found.marketValue);
    }
    else console.log("No se ha encontrado la carta a mostrar"); //Poner los colores bien
  }
}