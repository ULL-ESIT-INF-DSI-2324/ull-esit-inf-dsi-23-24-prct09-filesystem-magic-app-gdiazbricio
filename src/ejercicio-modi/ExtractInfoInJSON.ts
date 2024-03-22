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
  constructor(protected filepath: string){super(filepath)}
    /**
   * Process a JSON file.
   * @returns a tuple containing information about weights and profits.
   */
  protected process(filepath: string): Solution {
    const myData = readFileSync(filepath);
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