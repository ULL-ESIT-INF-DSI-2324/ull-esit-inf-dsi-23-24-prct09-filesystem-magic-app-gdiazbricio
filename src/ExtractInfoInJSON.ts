import { ExtractInfo, Solution } from "./ExtractInfo.js";
import { readFileSync } from 'fs'

/**
 * Interface that defines the structure of the JSOn file to be read in order to parse it correctly.
 */
interface myJSONStructure {
  capacidad: string,
  numElementos: string,
  elementos: {
    numElemento: string,
    peso: string,
    beneficio: string
  }[]
}

/**
 * Child class from ExtractInfo, implements the process method in a JSON context.
 */
export class ExtractInfoInJSON extends ExtractInfo {
  constructor(){super()}
    /**
   * Process a JSON file.
   * @returns a tuple containing information about weights and profits.
   */
  protected process(): Solution {
    const myData = readFileSync("bag.json");
    const myDataInJSON: myJSONStructure = JSON.parse(myData.toString());
    const myWeights: string[] = [];
    const myProfits: string[] = [];
    myDataInJSON.elementos.forEach((element) => {
      myWeights.push(element.peso);
      myProfits.push(element.beneficio);
    });
    return [myWeights, myProfits];
  }
}