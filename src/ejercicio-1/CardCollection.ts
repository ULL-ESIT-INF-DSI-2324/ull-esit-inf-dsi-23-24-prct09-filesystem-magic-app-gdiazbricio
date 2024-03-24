import { Card } from "./Card.js";
import { writeFileSync, mkdirSync, existsSync } from "fs"

/**
 * Represents a collection of cards.
 */
export class CardCollection {
  /**
   * The collection of cards.
   */
  public collection: Card[];

  /**
   * Creates an instance of CardCollection.
   * @param user The user associated with the collection.
   */
  constructor(private user: string) {
    this.collection = [];
    // If the directory for the user does not exist, create it and initialize the collection file.
    if (!existsSync(this.user)) {
      mkdirSync(`${this.user}`);
      writeFileSync(`${this.user}/collection.json`, "[]", { flag: "w" });
    }
  }

  /**
   * Gets the user associated with the collection.
   * @returns The user associated with the collection.
   */
  getUser(): string {
    return this.user;
  }

  /**
   * Writes the collection of cards to a JSON file.
   */
  write(): void {
    const toWrite = JSON.stringify(this.collection, null, 2);
    writeFileSync(`${this.user}/collection.json`, toWrite, { flag: 'w' });
  }
}
