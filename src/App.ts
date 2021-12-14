import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

export default new class App {

    public express: Application

    public constructor(){
        this.express = express();
        this.routes();
        this.middleware();
    }

    routes(): void{
        this.express.use('/testRoute', (req, res)=>{
            res.status(200).send("MS FUNCIONAL")
        })
    }

    middleware(): void{
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use((req: Request, res: Response, next: NextFunction)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
    }
}