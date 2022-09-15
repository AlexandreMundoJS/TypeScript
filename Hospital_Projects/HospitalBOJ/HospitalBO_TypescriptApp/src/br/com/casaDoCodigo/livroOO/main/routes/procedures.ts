import { Procedure } from "../../entities/Procedure";
import { Request, Response, Router } from "express";
import { JsonDB, Config } from "node-json-db";
import { DateConversor } from "../../utils/DateConversor";
import fs from "fs";

export class ProcedureRouter {
  public router: Router;
  public db: any;

  public constructor() {
    this.router = Router();
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  private testRoute(req: Request, res: Response) {
    try {
      res.status(200).json("Test route working");
    } catch (err) {
      res.status(500).json(`Error on test route ${err}`);
    }
  }

  public async createProcedure(req: Request, res: Response): Promise<void> {
    try {
      let procedure: Procedure = new Procedure();
      let allProcedures = await this.db.getData("/procedures");
      let canAdd = true;
      procedure.setCode(allProcedures.length + 1);
      procedure.setPatient(req.body.procedure.patient);
      procedure.setDoctors(req.body.procedure.doctors);
      procedure.setDate(
        new DateConversor().dateConverter(req.body.procedure.date)
      );
      procedure.setRoom(req.body.procedure.room);
      procedure.setValue(req.body.procedure.value);
      procedure.setDurationTime(req.body.procedure.durationTime);
      
      allProcedures.forEach((procedureElement: { code: any }) => {
        if (procedureElement.code == procedure.getCode()) {
          canAdd = false;
        }
      });
      if (canAdd) {
        await this.db.push("/procedures[]", procedure, true);
        res.status(200).json({
          message: "Procedure added",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${err}`,
          },
        ],
      });
    }
  }
  
  private async updateProcedure(req: Request, res: Response) {
    try {
      let procedure: Procedure = new Procedure();
      procedure.setCode(req.body.procedure.code);
      procedure.setPatient(req.body.procedure.patient);
      procedure.setDoctors(req.body.procedure.doctors);
      procedure.setDate(
        new DateConversor().dateConverter(req.body.procedure.date)
      );
      procedure.setRoom(req.body.procedure.room);
      procedure.setValue(req.body.procedure.value);
      procedure.setDurationTime(req.body.procedure.durationTime);

      let content = JSON.parse(fs.readFileSync('hospitalDataBase.json', 'utf-8'));
      content.procedures.forEach(async (oldProcedure: any) => {
        if (oldProcedure.code == procedure.getCode()){
          content.procedures[oldProcedure.code - 1] = procedure;
        }
      });
      fs.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
      await this.db.reload();
      res.status(200).json({
        message: "Procedure updated",
        procedure: procedure,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${err}`,
          },
        ],
      });
    }
  }

  private async showProcedure(req: Request, res: Response) {
    let query: any = req.query.code;
    let showProcedure = false;
    let procedureData;
    const proceduresArray = await this.db.getData("/procedures");
    proceduresArray.forEach(async (procedure: { code: any }) => {
      if (procedure.code == query) {
        showProcedure = true;
        procedureData = procedure;
      }
    });

    if (showProcedure) {
      res.status(200).json(procedureData);
    } else {
      res.status(500).json("Error: Procedure not found");
    }
  }

  private async showProcedures(req: Request, res: Response) {
    try {
        let procedures = await this.db.getData("/procedures");
        res.status(200).json({ procedures: procedures });
      } catch (err) {
        res.status(500).json({
          status: 500,
          message: [
            {
              error: `Error in request ${err}`,
            },
          ],
        });
      }
  }

  private bindThis(): void {
    this.testRoute = this.testRoute.bind(this);
    this.showProcedure = this.showProcedure.bind(this);
    this.showProcedures = this.showProcedures.bind(this);
    this.createProcedure = this.createProcedure.bind(this);
    this.updateProcedure = this.updateProcedure.bind(this);
  }

  public init(): void {
    this.bindThis();
    this.router.get("/testProcedureRouter", this.testRoute);
    this.router.get("/getProcedure", this.showProcedure);
    this.router.get("/getProcedures", this.showProcedures);
    this.router.post("/createProcedure", this.createProcedure);
    this.router.put("/updateProcedure", this.updateProcedure);
  }
}

const procedureRouter = new ProcedureRouter();
procedureRouter.init();

export default procedureRouter.router;
