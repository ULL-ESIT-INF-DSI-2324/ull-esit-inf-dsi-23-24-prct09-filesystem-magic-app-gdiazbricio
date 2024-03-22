import { CardCollection } from "./CardCollection.js";

export class ListCards {
  constructor(private Cards: CardCollection){}
  // Para las pruebas seria mejor que devuelva un string.
  list(): void {
    // Necesario el paquete chalk para poner cada carta del color que sea, el campo color debe ser del color que tenga asociado.
    this.Cards.collection.forEach((card) => {
      console.log(card.id, card.name, card.mana, card.color, card.typeLine, card.oddity, card.rules, card.strength, card.endurance, card.loyalty, card.marketValue);
    })
  }
}