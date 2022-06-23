"use strict";
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
    constructor(name, color, mushroomQuantity, height, fisicalType, hasMustache) {
        this.name = name;
        this.color = color;
        this.mushroomQuantity = mushroomQuantity;
        this.height = height;
        this.fisicaltype = fisicalType;
        this.hasMustache = hasMustache;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    skip() { }
    getMushroom(mushroom) { }
    throwFireball() { }
    /**
     * There's no concept of
     * @Destructor method in TypeScript,
     * because JavaScript uses garbage collection to
     * automatically delete objects when they are
     * no longer referenced.
     */
    /**
     * TypeScript have
     */
    equals(obj) {
        if (obj instanceof Character) {
            return this.getName() === obj.getName();
        }
        else {
            return false;
        }
    }
}
let character = new Character("Knight", "Blue", 12, 180, "Muscular", true);
let character2 = new Character("Mage", "White", 40, 172, "Skinny", false);
console.log(character.equals(character2));
