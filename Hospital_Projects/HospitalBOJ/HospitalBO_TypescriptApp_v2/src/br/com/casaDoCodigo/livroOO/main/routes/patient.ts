import { Request, Response, Router } from "express";
import { PatientBusiness } from "../../business/PatientBusiness";
export class PatientRouter {
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

  public async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await new PatientBusiness().add(req.body.patient, req, res);
      res.status(200).json({
        message: "Patient added with success",
        patient: patient,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: error,
          },
        ],
      });
    }
  }

  private async updatePatient(req: Request, res: Response) {
    try {
      const patient = await new PatientBusiness().update(req.body.patient, req, res);
      res.status(200).json({
        message: "patient update with success",
        patient: patient,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `${error}`,
          },
        ],
      });
    }
  }

  private async showPatient(req: Request, res: Response) {
    try {
      res.status(200).json(await new PatientBusiness().show(req.params.id));
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: [
          {
            error: `Error in request ${error}`,
          },
        ],
      });
    }
  }

  private async showPatients(req: Request, res: Response) {
    try {
      res.status(200).json(await new PatientBusiness().showAll());
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: [
          {
            error: `Error in request ${error}`,
          },
        ],
      });
    }
  }

  private bindThis(): void {
    this.testRoute = this.testRoute.bind(this);
    this.showPatient = this.showPatient.bind(this);
    this.showPatients = this.showPatients.bind(this);
    this.createPatient = this.createPatient.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
  }

  public init(): void {
    this.bindThis();
    this.router.get("/testPatientRouter", this.testRoute);
    this.router.get("/getPatient/:id", this.showPatient);
    this.router.get("/getPatients", this.showPatients);
    this.router.post("/createPatient", this.createPatient);
    this.router.put("/updatePatient/:id", this.updatePatient);
  }
}

const patientRouter = new PatientRouter();
patientRouter.init();

export default patientRouter.router;
