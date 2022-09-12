"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = __importDefault(require("./character"));
class Game {
    static main() {
        let mario = new character_1.default();
        mario.setName("Mario");
        mario.setColor("Red");
        mario.setMushroomQuantity(0);
        mario.setHeight(160);
        mario.setMustache(true);
        let luigi = new character_1.default();
        luigi.setName("Luigi");
        luigi.setColor("Blue");
        luigi.setMushroomQuantity(2);
        luigi.setHeight(158);
        luigi.setMustache(true);
        mario.jump("Mario");
        mario.throwFireball("Mario");
        luigi.jump("Luigi");
        luigi.getMushroom("Luigi");
        mario.nameToString();
        mario.equals(luigi);
        luigi.nameToString();
        luigi.equals(luigi);
    }
}
Game.main();
