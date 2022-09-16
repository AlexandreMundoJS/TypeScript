import { Request, Response, Router } from "express";
import { Patient } from "../../entities/Patient";
import { Plan } from "../../entities/Plan";
import { AddressConversor } from "../../utils/AddressConversor";
import { DateConversor } from "../../utils/DateConversor";
import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import { PatientBusiness } from "../../business/PatientBusiness";
export class PatientRouter {
  public router: Router;
  private db: any;

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

  public async createPatient(req: Request, res: Response): Promise<void> {
    try {
      let patientArray = req.body.patients;
      let patientsArray: Array<Patient> = new Array();
      patientArray.forEach(async (patient: any) => {
        const {
          cpf,
          name,
          address,
          dateOfBirth,
          plan: { planName, monthlyPayment },
        } = patient;
        const newPatient: Patient = new Patient(
          cpf,
          new Plan(planName, monthlyPayment),
          name,
          new DateConversor().dateConverter(dateOfBirth),
          new AddressConversor().convertAddress(address)
        );

        let allPatients = await this.db.getData("/patients");
        let canAdd = true;
        allPatients.forEach((patient: { id: any }) => {
          if (patient.id == newPatient.getCpf()) {
            canAdd = false;
          }
        });
        if (canAdd) {
          patientsArray.push(newPatient);
          await this.db.push(
            "/patients[]",
            { id: `${newPatient.getCpf()}`, patient: newPatient },
            true
          );
          res.status(200).json({
            message: "Patients added",
          });
        } else {
          res.status(400).json({
            message: "Patients not added",
          });
        }
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

  private async updatePatient(req: Request, res: Response) {
    try {
      const {
        cpf,
        name,
        address,
        dateOfBirth,
        plan: { planName, monthlyPayment },
      } = req.body.patient;
      const newPatient: Patient = new Patient(
        cpf,
        new Plan(planName, monthlyPayment),
        name,
        new DateConversor().dateConverter(dateOfBirth),
        new AddressConversor().convertAddress(address)
      );
      let content = JSON.parse(
        fs.readFileSync("hospitalDataBase.json", "utf-8")
      );
      content.patients.forEach(async (oldPatient: any, key: any) => {
        if (oldPatient.id == newPatient.getCpf()) {
          content.patients[key].patient = newPatient;
        }
      });
      fs.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
      await this.db.reload();
      res.status(200).json({
        message: "Patient updated",
        patient: newPatient,
      });
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

  private async showPatient(req: Request, res: Response) {
    let query: any = req.query.id;
    let showPatient = false;
    let patientData;
    const patientsArray = await this.db.getData("/patients");
    patientsArray.forEach(async (patient: { id: any }) => {
      if (patient.id === query) {
        showPatient = true;
        patientData = patient;
      }
    });

    if (showPatient) {
      res.status(200).json(patientData);
    } else {
      res.status(500).json("Error: Patient not found");
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
    this.router.get("/getPatient", this.showPatient);
    this.router.get("/getPatients", this.showPatients);
    this.router.post("/createPatient", this.createPatient);
    this.router.put("/updatePatient", this.updatePatient);
  }
}

const patientRouter = new PatientRouter();
patientRouter.init();

export default patientRouter.router;
