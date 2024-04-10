import yargs from "yargs";
import { hideBin } from "yargs/helpers"
import { Card } from "./Card.js";
import { CardCollection } from "./CardCollection.js";
import { AddCard } from "./AddCard.js";
import { ModifyCard } from "./ModifyCard.js";
import { ShowCard } from "./ShowCard.js";
import { DeleteCard } from "./DeleteCard.js";
import { getColorsByName, getTypeLineByName, getOddityByName } from "./helpers.js";
import { ListCards } from "./ListCards.js";
import { readFileSync, existsSync } from 'fs';

/**
 * Main functionality for proccessing the stantard input.
 */
yargs(hideBin(process.argv))
  .command("add", "Adds a card to the collection", {
    user: {
      description: "User of the collection to modify",
      type: "string",
      demandOption: true
    },

    id: {
      description: "Id of the card to add",
      type: "number",
      demandOption: true
    },

    name: {
      description: "Name of the card to add",
      type: "string",
      demandOption: true
    },

    mana: {
      description: "Mana of the card to add",
      type: "number",
      demandOption: true
    },

    color: {
      description: "Color of the card to add",
      type: "string",
      demandOption: true
    },

    typeLine: {
      description: "TypeLine of the card to add",
      type: "string",
      demandOption: true
    },

    oddity: {
      description: "Oddity of the card to add",
      type: "string",
      demandOption: true
    },

    rules: {
      description: "Rules of the card to add",
      type: "string",
      demandOption: true
    },

    strength: {
      description: "Strength of the card to add",
      type: "number",
      demandOption: false
    },

    endurance: {
      description: "Endutance of the card to add",
      type: "number",
      demandOption: false
    },

    loyalty: {
      description: "Loyalty of the card to add",
      type: "number",
      demandOption: false
    },

    marketValue: {
      description: "Market value of the card to add",
      type: "number",
      demandOption: true
    },
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    const myCard: Card = {
      id: argv.id,
      name: argv.name,
      mana: argv.mana,
      color: getColorsByName(argv.color),
      typeLine: getTypeLineByName(argv.typeLine),
      oddity: getOddityByName(argv.oddity),
      rules: argv.rules,
      strength: argv.strength,
      endurance: argv.endurance,
      marketValue: argv.marketValue
    }
    const myAdder = new AddCard(myCollection);
    myAdder.add(myCard);
    // myCollection.write((error) => {
    //   if (error) {
    //     throw(error);
    //   } 
    // });
  })
  .help()
  .argv;

yargs(hideBin(process.argv))
  .command("list", "List the cards of a collection", {
    user: {
      description: "User of the collection to list",
      type: "string",
      demandOption: true
    }
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    if (existsSync(argv.user)) {
      const data = readFileSync(`${argv.user}/collection.json`);
      myCollection.collection = JSON.parse(data.toString());
    }
    const myLister = new ListCards(myCollection);
    myLister.list();
  })
  .help()
  .argv;

  yargs(hideBin(process.argv))
  .command("update", "Updates a card of a collection", {
    user: {
      description: "User of the collection to modify",
      type: "string",
      demandOption: true
    },

    id: {
      description: "Id of the card to modify",
      type: "number",
      demandOption: true
    },

    name: {
      description: "Name of the card to modify",
      type: "string",
      demandOption: true
    },

    mana: {
      description: "Mana of the card to modify",
      type: "number",
      demandOption: true
    },

    color: {
      description: "Color of the card to modify",
      type: "string",
      demandOption: true
    },

    typeLine: {
      description: "TypeLine of the card to modify",
      type: "string",
      demandOption: true
    },

    oddity: {
      description: "Oddity of the card to modify",
      type: "string",
      demandOption: true
    },

    rules: {
      description: "Rules of the card to modify",
      type: "string",
      demandOption: true
    },

    strength: {
      description: "Strength of the card to modify",
      type: "number",
      demandOption: false
    },

    endurance: {
      description: "Endutance of the card to modify",
      type: "number",
      demandOption: false
    },

    loyalty: {
      description: "Loyalty of the card to modify",
      type: "number",
      demandOption: false
    },

    marketValue: {
      description: "Market value of the card to modify",
      type: "number",
      demandOption: true
    },
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    if (existsSync(argv.user)) {
      const data = readFileSync(`${argv.user}/collection.json`);
      myCollection.collection = JSON.parse(data.toString());
    }
    const myCard: Card = {
      id: argv.id,
      name: argv.name,
      mana: argv.mana,
      color: getColorsByName(argv.color),
      typeLine: getTypeLineByName(argv.typeLine),
      oddity: getOddityByName(argv.oddity),
      rules: argv.rules,
      strength: argv.strength,
      endurance: argv.endurance,
      marketValue: argv.marketValue
    }
    const myModifier = new ModifyCard(myCollection);
    myModifier.modify(myCard);
    // myCollection.write((error) => {
    //   if (error) throw(error);
    // });
  })
  .help()
  .argv;

yargs(hideBin(process.argv))
  .command("read", "List the cards of a collection", {
    user: {
      description: "User of the collection to show card",
      type: "string",
      demandOption: true
    },

    id : {
      description: "Id of the card to show",
      type: "number",
      demandOption: true
    }
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    if (existsSync(argv.user)) {
      const data = readFileSync(`${argv.user}/collection.json`);
      myCollection.collection = JSON.parse(data.toString());
    }
    const myReader = new ShowCard(myCollection);
    myReader.showCard(argv.id);
  })
  .help()
  .argv;

yargs(hideBin(process.argv))
  .command("remove", "Remove a card of a collection", {
    user: {
      description: "User of the collection to remove card",
      type: "string",
      demandOption: true
    },

    id : {
      description: "Id of the card to remove",
      type: "number",
      demandOption: true
    }
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    if (existsSync(argv.user)) {
      const data = readFileSync(`${argv.user}/collection.json`);
      myCollection.collection = JSON.parse(data.toString());
    }
    const myRemover = new DeleteCard(myCollection);
    myRemover.delete(argv.id);
    // myCollection.write((error, data) => {
    //   if (error) {
    //     throw(error);
    //   } 
    //   else if (data) console.log(data);
    // });
  })
  .help()
  .argv;