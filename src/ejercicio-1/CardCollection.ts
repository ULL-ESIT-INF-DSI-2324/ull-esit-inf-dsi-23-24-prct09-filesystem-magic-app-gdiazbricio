import { Card } from "./Card.js";
import { writeFileSync, mkdirSync, existsSync } from "fs"

export class CardCollection {
  public collection: Card[];
  constructor(private user: string){
    this.collection = [];
    if (!existsSync(this.user)) mkdirSync(`${this.user}`, );
  }

  getUser(): string {
    return this.user;
  }

  write(): void {
    const toWrite = JSON.stringify(this.collection, null, 2);
    writeFileSync(`${this.user}/collection.json`, toWrite, {flag: 'w'});
  }
}