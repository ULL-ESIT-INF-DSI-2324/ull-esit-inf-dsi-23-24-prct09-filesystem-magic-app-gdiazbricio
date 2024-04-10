import { Card } from "./Card.js";
// import { writeFileSync, mkdirSync, existsSync } from "fs"
import { access, writeFile, readFile, constants } from "node:fs"

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
    this.read((error, data) => {
      if (error) console.log(error);
      else if (data) console.log(data);
    });
    // If the directory for the user does not exist, create it and initialize the collection file.
    // Cambiar eso, que lea el fichero e inicialice la colección entonces.
  }

  read(callback: (error: string | undefined, data: string | undefined) => void): void {
    access(this.user, constants.F_OK, (err) => {
      if (err) {
        callback("El usuario no existe", undefined);
      }
      // If folder exists and is not a new user, we get the information.
      else {
        readFile(`${this.user}/collection.json`, (error, data) => {
          if (error) callback("Error al leer el archivo", undefined);
          if (data) {
            callback(undefined, "Archivo leído correctamente");
            this.collection = JSON.parse(data.toString());
          }
        })
      }
    });
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
  write(callback: (error: string | undefined, data: string | undefined) => void): void {
    const toWrite = JSON.stringify(this.collection, null, 2);
    writeFile(`${this.user}/collection.json`, toWrite, { flag: 'w' }, (err) => {
      if (err) callback("Error al escribir en el fichero", undefined);
      else callback(undefined, "Se escribió en el fichero");
    });
  }
}
