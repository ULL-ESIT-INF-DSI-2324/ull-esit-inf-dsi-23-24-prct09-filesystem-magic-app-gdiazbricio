import "mocha";
import { expect } from "chai";
import { Solution } from "../src/ejercicio-modi/ExtractInfo.js";
import { ExtractInfo } from "../src/ejercicio-modi/ExtractInfo.js";
import { ExtractInfoInCSV } from "../src/ejercicio-modi/ExtractInfoInCSV.js"
import { ExtractInfoInJSON } from "../src/ejercicio-modi/ExtractInfoInJSON.js";


describe("exercise 1 tests", () => {
  it("must return a tuple containing weights and profits reading from CSV", () => {
    const myExtraction = new ExtractInfoInCSV("instances/bag.csv");
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1', '2', '2' ], [ '4', '2', '2', '5' ] ]);
  });

  it("must return a tuple containing weights and profits reading from CSV", () => {
    const myExtraction = new ExtractInfoInCSV("instances/bag2.csv");
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1' ], [ '4', '2' ] ]);
  });

  it("must return a tuple containing weights and profits reading from JSON", () => {
    const myExtraction = new ExtractInfoInJSON("instances/bag.json");
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1', '2', '2' ], [ '4', '2', '2', '5' ] ]);
  });

  it("must return a tuple containing weights and profits reading from JSON", () => {
    const myExtraction = new ExtractInfoInJSON("instances/bag2.json");
  myExtraction.run();
  const myInfo: Solution = myExtraction.solution_;
    expect(myInfo).to.be.deep.equal([ [ '3', '1' ], [ '4', '2' ] ]);
  })
});