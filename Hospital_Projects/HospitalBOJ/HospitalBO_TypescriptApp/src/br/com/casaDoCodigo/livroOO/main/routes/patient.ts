import { Request, Response, Router } from "express";
import { PatientBusiness } from "../../business/PatientBusiness";
import { Patient } from "../../entities/Patient";
import { Plan } from "../../entities/Plan";
import { AddressConversor } from "../../utils/AddressConversor";
import { DataShow } from "../../utils/DataShow";
import { DateConversor } from "../../utils/DateConversor";
import { JsonDB, Config } from "node-json-db";
import fs from "fs";
export class PatientRouter {
  public router: Router;
  public patientBusiness: PatientBusiness = new PatientBusiness();
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
        let newPatient: Patient = new Patient();
        newPatient.setCpf(patient.cpf);
        newPatient.setName(patient.name);
        newPatient.setAddress(
          new AddressConversor().convertAddress(patient.address)
        );
        newPatient.setDateOfBirth(
          new DateConversor().dateConverter(patient.dateOfBirth)
        );

        let plan: Plan = new Plan();
        plan.setName(patient.plan.planName);
        plan.setMonthlyPayment(patient.plan.monthlyPayment);
        newPatient.setPlan(plan);
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
        }
      });
      res.status(200).json({
        message: "Patients added",
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
      let patient: Patient = new Patient();
      patient.setCpf(req.body.patient.cpf);
      patient.setName(req.body.patient.name);
      patient.setAddress(
        new AddressConversor().convertAddress(req.body.patient.address)
      );
      patient.setAddress(
        new AddressConversor().convertAddress(req.body.patient.address)
      );
      patient.setDateOfBirth(
        new DateConversor().dateConverter(req.body.patient.dateOfBirth)
      );

      let plan: Plan = new Plan();
      plan.setName(req.body.patient.plan.planName);
      plan.setMonthlyPayment(req.body.patient.plan.monthlyPayment);
      patient.setPlan(plan);

      let content = JSON.parse(fs.readFileSync('hospitalDataBase.json', 'utf-8'));
      console.log(content);
      content.patients.forEach((oldPatient: any) => {
        if (oldPatient.id == patient.getCpf()){
          oldPatient.patient = patient;
        }
      });
      fs.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
      await this.db.reload();
      res.status(200).json({
        message: "Patient address updated",
        patient: patient,
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
      let patients = await this.db.getData("/patients");
      res.status(200).json({ patients: patients });
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
