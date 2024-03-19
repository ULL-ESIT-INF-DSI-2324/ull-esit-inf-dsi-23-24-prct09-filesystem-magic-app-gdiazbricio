import "mocha";
import { expect } from "chai";
import { add } from "../src/ejercicio-1-modi.js";

describe("exercise 1 tests", () => {
  it("must add two numbers", () => {
    expect(add(1, 2)).to.be.equal(3)
  })
});