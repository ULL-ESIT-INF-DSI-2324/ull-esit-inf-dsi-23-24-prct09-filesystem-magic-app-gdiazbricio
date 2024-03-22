import { CardCollection } from "./CardCollection.js";
import { Card, llanowarElves } from "./Card.js";
import { DeleteCard } from "./DeleteCard.js";
export class AddCard {
  constructor(private Cards: CardCollection){}

  add(newCard: Card): void {
    const found = this.Cards.collection.find((card) => {
      card.id === newCard.id;
    });
    if (found) console.log("Ya está añadida"); // Poner colores.
    else this.Cards.collection.push(newCard); 
  }
}

const myCollection = new CardCollection;
const myAdder = new AddCard(myCollection);
myAdder.add(llanowarElves);
console.log(myCollection.collection);

const myDeleter = new DeleteCard(myCollection);
myDeleter.delete(llanowarElves);
console.log(myCollection.collection)


