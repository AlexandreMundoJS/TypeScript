import Character from "./character";

class Game {
    public static main(): void{
        let mario = new Character();
        mario.setName("Mario");
        mario.setColor("Red");
        mario.setMushroomQuantity(0);
        mario.setHeight(160);
        mario.setMustache(true);

        let luigi = new Character();
        luigi.setName("Luigi");
        luigi.setColor("Blue");
        luigi.setMushroomQuantity(2);
        luigi.setHeight(158);
        luigi.setMustache(true);

        mario.jump("Mario");
        mario.throwFireball("Mario");

        luigi.jump("Luigi");
        luigi.getMushroom("Luigi")

        mario.nameToString();

        mario.equals(luigi);
        luigi.nameToString();

        luigi.equals(luigi);

    }
}

Game.main();