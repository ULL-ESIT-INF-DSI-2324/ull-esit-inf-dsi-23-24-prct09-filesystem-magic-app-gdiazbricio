import { Card } from "./Card.js";
// import { writeFileSync, mkdirSync, existsSync } from "fs"
import { access, readFile, constants, readdir } from "node:fs"

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
    this.read((error) => {
      if (error) throw(error);
    });
  }

  read(callback: (error: string | undefined, data: string | undefined) => void): void {
    access(this.user, constants.F_OK, (err) => {
      if (err) {
        callback("El usuario no existe", undefined);
      }
      // If folder exists and is not a new user, we get the information.
      else {
        readdir(this.user, (err, files) => {
          if (err) callback("No se pudo leer la carpeta del usuario", undefined);
          else {
            files.forEach((file) => {
              readFile(`${this.user}/${file}`, (error, data) => {
                if (error) callback(`Error al leer archivo ${file}`, undefined);
                else {
                  this.collection.push(JSON.parse(data.toString()));
                }
              })
            })
          }
        })
        // readFile(`${this.user}/collection.json`, (error, data) => {
        //   if (error) callback("Error al leer el archivo", undefined);
        //   if (data) {
        //     callback(undefined, "Archivo leído correctamente");
        //     this.collection = JSON.parse(data.toString());
        //   }
        // })

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
  // write(callback: (error: string | undefined, data: string | undefined) => void): void {
  //   const toWrite = JSON.stringify(this.collection, null, 2);
  //   writeFile(`${this.user}/${toWrite}`, toWrite, { flag: 'w' }, (err) => {
  //     if (err) callback("Error al escribir en el fichero", undefined);
  //     else callback(undefined, "Se escribió en el fichero");
  //   });
  // }
}
