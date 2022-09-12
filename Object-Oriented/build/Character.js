"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    calculateSquareArea(side) {
        return side * side;
    }
    // rectangle area
    calculateRectangleArea(largerBase, smallerBase) {
        return largerBase * smallerBase;
    }
    // trapeze area
    calculateTrapezeArea(largerBase, smallerBase, height) {
        return ((largerBase + smallerBase) * height) / 2;
    }
    // diamond area
    calculateDiamondArea(largerDiagonal, smallerDiagonal) {
        return largerDiagonal * smallerDiagonal;
    }
}
class Character {
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
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getMushroomQuantity() {
        return this.mushroomQuantity;
    }
    setMushroomQuantity(mushroomQuantity) {
        this.mushroomQuantity = mushroomQuantity;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    getFisicalType() {
        return this.fisicaltype;
    }
    setFisicalType(fisicalType) {
        this.fisicaltype = fisicalType;
    }
    getMustache() {
        return this.hasMustache;
    }
    setMustache(mustache) {
        this.hasMustache = mustache;
    }
    Speak() {
        return "Hello!";
    }
    static walk() {
        console.log("Character is walking");
    }
    nameToString() {
        console.log(`Character name: ${this.name}`);
        return `Character name: ${this.name}`;
    }
    skip() { }
    getMushroom(character) {
        console.log(`${character} catches one Mushroom!`);
        this.mushroomQuantity++;
    }
    throwFireball(character) {
        console.log(`${character} throws a fireball!`);
    }
    jump(character) {
        console.log(`${character} has jump!`);
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
    equals(obj) {
        if (obj instanceof Character) {
            console.log(this.getName() === obj.getName());
            return this.getName() === obj.getName();
        }
        else {
            console.log(false);
            return false;
        }
    }
}
Character.eyeQuantity = 2;
// let character = new Character("Knight", "Blue", 12, 180, "Muscular", true);
// let character2 = new Character("Mage", "White", 40, 172, "Skinny", false);
// console.log(character.equals(character2));
// console.log(character2.Speak());
// Character.walk();
class Customer {
    hashCode() {
        let result = 17;
        result = 37 * result + this.nfNumber;
        return result;
    }
}
let client = new Customer();
class PJCustomer extends Customer {
    hashCode() {
        let result = 11;
        result = 43 * result + this.nfNumber;
        result = 43 * result + (client == null ? 0 : client.hashCode());
        return result;
    }
}
exports.default = Character;
