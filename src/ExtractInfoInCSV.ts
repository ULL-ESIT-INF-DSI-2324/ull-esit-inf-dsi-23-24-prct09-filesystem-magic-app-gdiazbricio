import { ExtractInfo, Solution } from "./ExtractInfo.js";
import { readFileSync } from 'fs'

/**
 * Child class from ExtractInfo, implements the process method in a CSV context.
 */
export class ExtractInfoInCSV extends ExtractInfo {
  constructor(){super()}
  /**
   * Process a CSV file.
   * @returns a tuple containing information about weights and profits.
   */
  protected process(): Solution {
    const myData = readFileSync("bag.csv");
    const myDataInString = myData.toString();
    const myDataInVector: string[] = myDataInString.split("\n");
    const myWeights = [];
    const myProfits = [];
    for (let i = 2; i < myDataInVector.length; i++) {
      myWeights.push(myDataInVector[i].split(",").at(1));
      myProfits.push(myDataInVector[i].split(",").at(2));
    }
    return [myWeights, myProfits];
  }
}
