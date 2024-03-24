import { Colors, TypeLines, Oddities, Correspondencies } from "./Card.js";
import { CardCollection } from "./CardCollection.js";
import chalk from "chalk";

export class ListCards {
  constructor(private Cards: CardCollection){}
  list(): void {
    this.Cards.collection.forEach((card) => {
      console.log(`ID: ${card.id}, Nombre: ${card.name}, Mana: ${card.mana}, Color: ${chalk.hex(Correspondencies[card.color])(Colors[card.color])}, TypeLine: ${TypeLines[card.typeLine]}, Rareza: ${Oddities[card.oddity]}, Reglas: ${card.rules}, Fuerza: ${card.strength ?? ""}, Resistencia: ${card.endurance ?? ""}, Lealtad: ${card.loyalty ?? ""}, Valor de mercado: ${card.marketValue}`);
    })
  }
}