[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/github-actions-sonar-cloud/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/github-actions-sonar-cloud/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/github-actions-sonar-cloud/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/github-actions-sonar-cloud?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gdiazbricio_p6-tercera-modi&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gdiazbricio_p6-tercera-modi)

### INFORME: https://ull-esit-inf-dsi-2324.github.io/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-gdiazbricio/
# PRÁCTICA 9: DISEÑO DE UNA APLICACIÓN PARA LA GESTIÓN DE CARTAS MAGIC.
### Guillermo Díaz Bricio - Desarrollo de Sistemas Informáticos, 3º Grado en Ingeniería Informática
## Contenidos:
  * [Contenidos.](#contenidos)
  * [Resumen.](#resumen)
  * [Objetivos.](#objetivos)
  * [Ejercicio propuesto en el guión:](#ejercicio-propuesto-en-el-guión)
  * [Ejercicio propuesto en el aula:](#ejericicio-propuesto-en-el-aula)
  * [Conclusiones.](#conclusiones)
  * [Bibliografía.](#bibliografía)

## Resumen:
En esta práctica se ha realizado una apliación multiusuario, de manera no concurrente para la gestión de colecciones de cartas Magic de diferentes usuarios. Cada usuario podrá realizar operaciones sobre su colección. Se deberá seguir trabajando con Objetos, Clases, Interfaces, etcétera. Además de introducir conceptos como la gestión del sistema de archivos.
## Objetivos:
Los objetivos son:
1. Manejar adecuadamente objetos.
1. Aplicar principios SOLID. 
1. Diseño de un código consistente y bien formateado (mediante el uso de herramintas como ESLint y Prettier).
1. Desarrollo integrado mediante pruebas, utilizando Mocha y Chai.
1. Creación de documentación automátizada mediante TypeDoc.
1. Cubrimiento de código mediante c8 y coveralls.
1. Calidad de código por SonarCloud.
1. Trabajar con la API del sistema de ficheros de Node.
1. Trabajar con paquetes de lectura de argumentos como yargs y de formateo de la terminal como chalk.

## Ejercicio propuesto en el guión:
En esta práctica se requería diseñar e implementar una aplicación que permitiera a diferentes usuarios manejar su colección de cartas Magic, de manera que cada uno de ellos pueda realizar operaciones sobre la misma.

En primer lugar, se define la interfaz `Card`, que define la forma que debe tener un objeto de tipo carta Magic
```typescript
export interface Card {
  id: number,
  name: string,
  mana: number,
  color: Colors,
  typeLine: TypeLines,
  oddity: Oddities,
  rules: string,
  strength?: number,
  endurance?: number,
  loyalty?: number,
  marketValue: number
}
```

Lo más importante a destacar son los campos opcionales, marcados con un `?` al lado de su identificador, nos permite definir campos que pueden estar presentes, o no.

Se definen también los siguientes enumerados:
* Colors: Define los colores que pueden tener las cartas.
* TypeLines: Define los tipos que puede tener la carta.
* Oddities: Define las diferentes rarezas que puede tener la carta.

Una vez podamos definir cartas, es necesaria la implementación de una clase que almacene todas esas cartas, es aquí donde entra en juego la clase `CardCollection`:
``` typescript
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
```
El constructor de la clase recibe un `user`, que será el usuario al que pertenece la colección, en el constructor, primero se crea el directorio del usuario, comprobando primero que no exista antes, además, también se crea un fichero `json` dentro del directorio.

Se define el método `getUser` que devuelve el usuario al que pertenece la colección, y tambien el método `write` que escribe en el archivo del directorio del usuario los datos de su colección.

Por modularidad y cumplimiento del principio SOLID Open-Close se han declarado las diferentes operaciones que se pueden realizar sobre las colecciones en diferentes clases. Veremos en primer lugar la clase `AddCard`:

```typescript
/**
 * Represents an operation to add a card to a collection.
 */
export class AddCard {
  /**
   * Creates an instance of AddCard.
   * @param Cards The collection of cards to which the card will be added.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Adds a new card to the collection.
   * @param newCard The card to be added.
   */
  add(newCard: Card): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === newCard.id;
    });
    if (found) {
      console.log(chalk.red("Card is already added in the collection of", this.Cards.getUser()));
    } else {
      this.Cards.collection.push(newCard);
    }
  }
}
```

Se le pasará por constructor la colección sobre la que queremos hacer la operación, esto se repetirá en todas las clases de operaciones. Más adelante se define el método `add`, que primero compruba que la carta no esté ya en la colección, si no lo está lal introduce.

También se define la clase `DeleteCard`:
```typescript
/**
 * Represents an operation to delete a card from a collection.
 */
export class DeleteCard {
  /**
   * Creates an instance of DeleteCard.
   * @param Cards The collection of cards from which the card will be deleted.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Deletes a card from the collection based on its id.
   * @param toDeleteId The id of the card to be deleted.
   */
  delete(toDeleteId: number): void {
    const found = this.Cards.collection.find((card) => {
      return card.id === toDeleteId;
    });
    if (found) {
      this.Cards.collection = this.Cards.collection.filter((card) => {
        return card.id !== toDeleteId;
      });
      console.log(chalk.green("The card " + toDeleteId + " has been deleted from the collection of", this.Cards.getUser())); 
    } else {
      console.log(chalk.red("The card to delete was not found"));
    }
  }
}
```

El método `delete` primero comprobará que la carta a eliminar existe, buscando su ID en la colección, si existe la elimina y se emite un mensaje informativo, si no existe emite un mensaje de error.

La clase `ListCards`:
```typescript
/**
 * Represents an operation to list cards in a collection.
 */
export class ListCards {
  /**
   * Creates an instance of ListCards.
   * @param Cards The collection of cards to be listed.
   */
  constructor(private Cards: CardCollection){}

  /**
   * Lists all the cards in the collection with their details.
   */
  list(): void {
    this.Cards.collection.forEach((card) => {
      console.log(`ID: ${card.id}, Nombre: ${card.name}, Mana: ${card.mana}, Color: ${chalk.hex(Correspondencies[card.color])(Colors[card.color])}, TypeLine: ${TypeLines[card.typeLine]}, Rareza: ${Oddities[card.oddity]}, Reglas: ${card.rules}, Fuerza: ${card.strength ?? ""}, Resistencia: ${card.endurance ?? ""}, Lealtad: ${card.loyalty ?? ""}, Valor de mercado: ${card.marketValue}`);
    })
  }
}
```
El método `list` se encarga de iterar sobre la colección de cartas y de mostrar la información de cada una, lo más interesante a comentar es que el campo color se muestra en el color que corresponda, gracias a la función `chalk.hex()`.

La clase `ModifyCard`:
```typescript
/**
 * Represents an operation to modify a card in a collection.
 */
export class ModifyCard {
  /**
   * Creates an instance of ModifyCard.
   * @param Cards The collection of cards to be modified.
   */
  constructor(private Cards: CardCollection){};

  /**
   * Modifies a card in the collection.
   * @param toModify The card to be modified.
   */
  modify(toModify: Card): void {
    const found = this.Cards.collection.findIndex((card) => {
      return card.id === toModify.id;
    });
    if (found >= 0) {
      this.Cards.collection[found] = toModify;
      console.log(chalk.green("The card " + toModify.id + " has been modified in the collection of", this.Cards.getUser()));
    } else {
      console.log(chalk.red("The card to modify was not found"));
    }
  }
}
```
Se accede a la carta a modificar, si se encuentra se modifica y se emite un mensaje informativo, si no la encuentra, simplemente emite un mensaje de error.

La clase `ShowCard`, no nos centraremos en su implementación, pues es muy similar a la clase `ListCards`, pero simplemente sobre una carta.


Del código cliente de la aplicación, usaremos de ejemplo el comando `list`, que nos permitirá ilustrar el funcionamiento de la lectura de argumentos y del propio código cliente:
```typescript
yargs(hideBin(process.argv))
  .command("list", "List the cards of a collection", {
    user: {
      description: "User of the collection to list",
      type: "string",
      demandOption: true
    }
  }, (argv) => {
    const myCollection = new CardCollection(argv.user);
    if (existsSync(argv.user)) {
      const data = readFileSync(`${argv.user}/collection.json`);
      myCollection.collection = JSON.parse(data.toString());
    }
    const myLister = new ListCards(myCollection);
    myLister.list();
  })
  .help()
  .argv;

```
Definimos el comando list, añadimos los campos que se deben introducir, en este caso user. Luego, se define el código que se debe ejecutar cuando se utilice dicho comando, lo que se hace es crear un objeto de tipo `CardCollection`, buscamos si ya tiene información almacenada, y si la tiene se le asigna, de manera que luego se puedan realizar todo tipo de operaciones, en este caso la operación `list`, en el caso de modificar los valores, tendremos que añadir al final la llamada al método `write`, para que almacene los cambios en el fichero.

## Ejercicio Propuesto en el aula:
Se pedía definir una clase plantilla, que definiera la estructura de un algoritmo de lectura de información acerca de una instancia del problema de la mochila en diferentes formatos:

Vemos por tanto la clase `ExtractInfo`:
```typescript
/**
 * Custom type consisting on the solution tuple.
 */

export type Solution = [(string | undefined)[], (string | undefined)[]];

/**
 * Abstract class representing template class for extracting information about a bagInstance.
 * @param solution_ Consist on the solution of the algorithm.
 */
export abstract class ExtractInfo {
  public solution_: Solution;
  constructor(protected filepath: string) {
    this.solution_ = [[],[]];
  }
  /**
   * Consists on the template method.
   * @returns void.
   */
  public run(): void {
    this.beforeProcessing();
    this.solution_ = this.process(this.filepath);
    this.afterProcessing();
  }

  /**
   * Abstract method that reads and returns a solution.
   */
  protected abstract process(filepath: string): Solution;

  /**
   * Hook methods (non mandatory) to be used before and after processing if needed.
   */
  protected afterProcessing(){}
  protected beforeProcessing(){}
}
```

Se debía crear también las clases `ExtractIfoInCSV` y `ExtractInfoInJSON` que implementaran las particularidades de cada caso.
```typescript
export class ExtractInfoInCSV extends ExtractInfo {
  constructor(protected filepath: string){super(filepath)}
  /**
   * Process a CSV file.
   * @returns a tuple containing information about weights and profits.
   */
  protected process(filepath: string): Solution {
    const myData = readFileSync(filepath);
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
```

```typescript
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
```

## Conclusiones:
La realización de la práctica proporcionó un conocimiento más profundo acerca de la API de gestión del sistema de ficheros de Node. Así como la consoludación de conceptos del lenguaje como Objetos, Clases e interfaces genéricas, principios SOLID y sus aplicaciones, y sobre patrones de diseño. Además de seguir mejorando la lógica de programación, no solamente aplicada a TypeScript si no a cualquier lenguaje y a continuar prosperando con elementos como el desarrollo basado en pruebas, la generación de documentación automática y el cubrimiento de código.

## Bibliografía
* [Documentación sobre objetos de Mozzilla](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects).
* [Documentación sobre clases de Mozzilla](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
* [Documentación de JavaScript de Mozzilla](https://developer.mozilla.org/es/docs/Web/JavaScript).
* [Documentación de Mocha](https://mochajs.org/).
* [Documentación de Chai](https://www.chaijs.com/).
* [Documentación de Chalk](https://github.com/chalk/chalk).
* [Documentación de Yargs](https://yargs.js.org/).
* [Documentación de TypeDoc](https://typedoc.org/).
* [Documentación de Node](https://nodejs.org/docs/latest/api/).
* [Web de Coveralls](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj3tsPGj9OEAxWVT6QEHcycA4AQFnoECAcQAQ&url=https%3A%2F%2Fcoveralls.io%2F&usg=AOvVaw2PjKrDGWUgtP9bnQyMWMrr&opi=89978449).
* [Web de SonarCloud](https://sonarcloud.io/).
