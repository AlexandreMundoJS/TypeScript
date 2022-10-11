import { Request, Response, Router } from "express";
import { ProcedureBusiness } from "../../business/ProcedureBusiness";

export class ProcedureRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
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
      new ProcedureBusiness().add(req.body.procedure, req, res);
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
      new ProcedureBusiness().update(req.body, req.params.id);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `${err}`,
          },
        ],
      });
    }
  }

  private async showProcedure(req: Request, res: Response) {
    try {
      res.status(200).json({
        procedure: await new ProcedureBusiness().show(req.params.id),
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: error
          },
        ],
      });
    }
  }

  private async showProcedures(req: Request, res: Response) {
    try {
      const procedures = await new ProcedureBusiness().showAll();
      res.status(200).json({ procedures: procedures });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error:err,
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
    this.router.get("/getProcedure/:id", this.showProcedure);
    this.router.get("/getProcedures", this.showProcedures);
    this.router.post("/createProcedure", this.createProcedure);
    this.router.put("/updateProcedure/:id", this.updateProcedure);
  }
}

const procedureRouter = new ProcedureRouter();
procedureRouter.init();

export default procedureRouter.router;
