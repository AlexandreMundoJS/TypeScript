import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import Attendances from "./controllers/attendance";
export default new (class App {
  public express: Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  routes(): void {
    console.log("OLA MUNDO")
    this.express.use("/testRoute", (req, res) => {
      res.status(200).send("MS FUNCIONAL");
    });
    this.express.use("/v1/", Attendances);
  }

  middleware(): void {
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }
})();
