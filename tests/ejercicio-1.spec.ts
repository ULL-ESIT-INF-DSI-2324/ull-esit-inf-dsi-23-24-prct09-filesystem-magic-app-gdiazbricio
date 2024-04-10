import "mocha";
import { expect } from "chai";
import { CardCollection } from "../src/ejercicio-1/CardCollection.js"
import { Card, Colors, TypeLines, Oddities } from "../src/ejercicio-1/Card.js";
import { AddCard } from "../src/ejercicio-1/AddCard.js"
import { ModifyCard } from "../src/ejercicio-1/ModifyCard.js"
import { ListCards } from "../src/ejercicio-1/ListCards.js"
import { ShowCard } from "../src/ejercicio-1/ShowCard.js"
import { DeleteCard } from "../src/ejercicio-1/DeleteCard.js"


const counterspell: Card = {
  id: 3,
  name: "Counterspell",
  mana: 2,
  color: Colors.Blue,
  typeLine: TypeLines.Instant,
  oddity: Oddities.Common,
  rules: "Counter target spell.",
  marketValue: 5 // Solo un valor de mercado imaginario
};

const llanowarElves: Card = {
  id: 3,
  name: "Llanowar Elves",
  mana: 1,
  color: Colors.Green,
  typeLine: TypeLines.Creature,
  oddity: Oddities.Common,
  rules: "Tap: Add {G}.",
  strength: 1,
  endurance: 1,
  marketValue: 2 // Solo un valor de mercado imaginario
};


describe("exercise 1 tests", () => {
  const myCollection = new CardCollection("Guille");
  it("must add a card", () => {
    const myAdder = new AddCard(myCollection);
    myAdder.add(counterspell);
    myCollection.write((error, data) => {});
    expect(myCollection.collection).to.be.deep.equal([counterspell]);
  });

  it("must modify a card", () => {
    const myModifier = new ModifyCard(myCollection);
    myModifier.modify(llanowarElves);
    myCollection.write((error, data) => {});
    expect(myCollection.collection).to.be.deep.equal([llanowarElves]);
  });

  it("must list all cards", () => {
    const myLister = new ListCards(myCollection);
    myLister.list();
    expect(myCollection.collection).to.be.deep.equal([llanowarElves]);
  });

  it("must show a card", () => {
    const myShower = new ShowCard(myCollection);
    myShower.showCard(3);
    expect(myCollection.collection).to.be.deep.equal([llanowarElves]);
  });

  it("must delete a card", () => {
    const myDeleter = new DeleteCard(myCollection);
    myDeleter.delete(3);
    myCollection.write((error, data) => {});
    expect(myCollection.collection).to.be.deep.equal([]);
  });

  it("read must initialize collection from a file", (done) => {
    const myCollection = new CardCollection("Guille");
    myCollection.read((_, data) => {
      if (data) {
        expect(data).to.be.equal("Archivo leído correctamente");
        done();
      }
    });
  });

  it("read mustn't initialize collection from a file", (done) => {
    const myCollection = new CardCollection("Yo");
    myCollection.read((error, _) => {
      if (error) {
        expect(error).to.be.equal("El usuario no existe");
      }
      done();
    });
  });

  it("write must write in a file", (done) => {
    const myCollection = new CardCollection("Guille");
    myCollection.write((_, data) => {
      if (data) {
        expect(data).to.be.equal("Se escribió en el fichero");
        done();
      }
    });
  });

  it("write mustn't write in a file", (done) => {
    const myCollection = new CardCollection("Yo");
    myCollection.write((error, _) => {
      if (error) {
        expect(error).to.be.equal("Error al escribir en el fichero");
      }
      done();
    });
  });

});