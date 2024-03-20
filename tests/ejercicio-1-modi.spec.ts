import "mocha";
import { expect } from "chai";
import { Solution } from "../src/ExtractInfo.js";
import { ExtractInfo } from "../src/ExtractInfo.js";
import { ExtractInfoInCSV } from "../src/ExtractInfoInCSV.js"
import { ExtractInfoInJSON } from "../src/ExtractInfoInJSON.js";


describe("exercise 1 tests", () => {
  it("must return a tuple containing weights and profits reading from CSV", () => {
    const myExtraction = new ExtractInfoInCSV();
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1', '2', '2' ], [ '4', '2', '2', '5' ] ]);
  });

  it("must return a tuple containing weights and profits reading from JSON", () => {
    const myExtraction = new ExtractInfoInCSV();
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1', '2', '2' ], [ '4', '2', '2', '5' ] ]);
  })
});