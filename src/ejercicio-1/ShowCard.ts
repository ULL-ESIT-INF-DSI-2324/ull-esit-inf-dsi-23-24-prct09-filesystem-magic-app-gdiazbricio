import { CardCollection } from "./CardCollection.js";
import {Correspondencies, Colors, TypeLines, Oddities } from "./Card.js";
import chalk from "chalk";

export class ShowCard {
  constructor(private Cards: CardCollection){}
  showCard(toShowId: number): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toShowId;
    });
    if (found) {
      console.log(`ID: ${found.id}, Nombre: ${found.name}, Mana: ${found.mana}, Color: ${chalk.hex(Correspondencies[found.color])(Colors[found.color])}, TypeLine: ${TypeLines[found.typeLine]}, Rareza: ${Oddities[found.oddity]}, Reglas: ${found.rules}, Fuerza: ${found.strength ?? ""}, Resistencia: ${found.endurance ?? ""}, Lealtad: ${found.loyalty ?? ""}, Valor de mercado: ${found.marketValue}`);
    }
    else console.log(chalk.red("No se ha encontrado la carta a mostrar"));
  }
}