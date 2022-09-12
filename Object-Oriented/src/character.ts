class Quadrilater {
  // calculateArea(
  //   side?: number,
  //   largerBase?: number,
  //   smallerBase?: number,
  //   height?: number,
  //   largerDiagonal?: number,
  //   smallerDiagonal?: number
  // ): number {
  //   if (side) {
  //     return side * side;
  //   } else if (largerBase && smallerBase) {
  //     return largerBase * smallerBase;
  //   } else if (largerBase && smallerBase && height) {
  //     return ((largerBase + smallerBase) * height) / 2;
  //   } else if (largerDiagonal && smallerDiagonal) {
  //     return largerDiagonal * smallerDiagonal;
  //   } else {
  //     return 0;
  //   }
  // }

  /**
   * In TypeScript, there's no possibility to create
   * methods with the same name to create method overload,
   * so we create each method with properly name
   */

  // square area
  calculateSquareArea(side: number) {
    return side * side;
  }

  // rectangle area
  calculateRectangleArea(largerBase: number, smallerBase: number) {
    return largerBase * smallerBase;
  }

  // trapeze area
  calculateTrapezeArea(
    largerBase: number,
    smallerBase: number,
    height: number
  ) {
    return ((largerBase + smallerBase) * height) / 2;
  }

  // diamond area
  calculateDiamondArea(largerDiagonal: number, smallerDiagonal: number) {
    return largerDiagonal * smallerDiagonal;
  }
}

class Character<T> {
  name!: string;
  color!: string;
  mushroomQuantity!: number;
  height!: number;
  fisicaltype!: string;
  hasMustache!: boolean;
  static eyeQuantity: number = 2;
  // constructor(
  //   name: string,
  //   color: string,
  //   mushroomQuantity: number,
  //   height: number,
  //   fisicalType: string,
  //   hasMustache: boolean
  // ) {
  //   this.name = name;
  //   this.color = color;
  //   this.mushroomQuantity = mushroomQuantity;
  //   this.height = height;
  //   this.fisicaltype = fisicalType;
  //   this.hasMustache = hasMustache;
  // }

  public getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  
  public getColor() : string {
    return this.color;
  }

  public setColor(color: string): void{
    this.color = color
  }
  
  public getMushroomQuantity() : number {
    return this.mushroomQuantity;
  }
  
  public setMushroomQuantity(mushroomQuantity: number): void{
    this.mushroomQuantity = mushroomQuantity;
  }
  
  
  public getHeight() : number {
    return this.height;
  }

  public setHeight(height: number): void{
    this.height = height;
  }
  public getFisicalType() : string {
    return this.fisicaltype;
  }

  public setFisicalType(fisicalType: string): void{
    this.fisicaltype = fisicalType;
  }
  public getMustache() : boolean {
    return this.hasMustache;
  }

  public setMustache(mustache: boolean): void{
    this.hasMustache = mustache;
  }

  Speak(): string {
    return "Hello!";
  }

  static walk(): void {
    console.log("Character is walking");
  }

  nameToString(): string {
    console.log(`Character name: ${this.name}`);
    return `Character name: ${this.name}`;
  }

  skip(): void {}

  getMushroom(character: string): void {
    console.log(`${character} catches one Mushroom!`);
    this.mushroomQuantity++;
  }

  throwFireball(character: string): void {
    console.log(`${character} throws a fireball!`)
  }

  jump(character: string): void {
    console.log(`${character} has jump!`)
  }
  /**
   * There's no concept of
   * @Destructor method in TypeScript,
   * because JavaScript uses garbage collection to
   * automatically delete objects when they are
   * no longer referenced.
   */

  /**
   * TypeScript equals
   */

  equals(obj: T): boolean {
    if (obj instanceof Character) {
      console.log(this.getName() === obj.getName());
      return this.getName() === obj.getName();
    } else {
      console.log(false);
      return false;
    }
  }
}
// let character = new Character("Knight", "Blue", 12, 180, "Muscular", true);
// let character2 = new Character("Mage", "White", 40, 172, "Skinny", false);
// console.log(character.equals(character2));
// console.log(character2.Speak());
// Character.walk();
class Customer {
  nfNumber!: number;
  hashCode(): number {
    let result: number = 17;
    result = 37 * result + this.nfNumber;
    return result;
  }
}
let client = new Customer();

class PJCustomer extends Customer {
  hashCode(): number {
    let result: number = 11;
    result = 43 * result + this.nfNumber;
    result = 43 * result + (client == null ? 0 : client.hashCode());
    return result;
  }
}

export default Character;
