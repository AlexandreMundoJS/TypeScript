import { Request, Response, Router } from "express";
import { PatientBusiness } from "../../business/PatientBusiness";
import { Patient } from "../../entities/Patient";
import { Plan } from "../../entities/Plan";
import { AddressConversor } from "../../utils/AddressConversor";
import { DataShow } from "../../utils/DataShow";
import { DateConversor } from "../../utils/DateConversor";

// let patientBusiness = new PatientBusiness();

export class PatientRouter {
  public router: Router;
  public patientBusiness: PatientBusiness = new PatientBusiness();

  public constructor() {
    this.router = Router();
    // this.patientBusiness = new PatientBusiness();
    // this.patientBusiness = patientBusiness;
  }

  private testRoute(req: Request, res: Response) {
    try {
      res.status(200).json("Test route working");
    } catch (err) {
      res.status(500).json(`Error on test route ${err}`);
    }
  }

  public createPatient(req: Request, res: Response): void {
    console.log("THIS -> ", this)  
    try {
      let patientArray = req.body.patients;
      let patientsArray: Array<Patient> = new Array();
      patientArray.forEach((patient: any) => {
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
        patientsArray.push(newPatient);
        // this.patientBusiness.add(newPatient);    
        // console.log(PatientBusiness.prototype)
        // PatientBusiness.(newPatient)
      });

      res.status(200).json({
        message: "Patient added",
        patients: patientsArray,
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

  private changePatientAddress(req: Request, res: Response) {
    try {
      let patient: Patient = new Patient();
      patient.setCpf(req.body.patient.cpf);
      patient.setAddress(
        new AddressConversor().convertAddress(req.body.patient.address)
      );

      res.status(200).json({
        message: "Patient address updated",
        patient: {
          name: patient.getName(),
          cpf: patient.getCpf(),
          address: patient.getAddress(),
          dateOfBirth: patient.getDateOfBirth(),
          plan: patient.getPlan(),
        },
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

  private showPatient(req: Request, res: Response) {
    try {
      let query: any = req.query.patient;
      if (query) {
        let patient = new DataShow().showPatient(query);
        res.status(200).json(patient);
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
  private showPatients(req: Request, res: Response) {
    try {
      let patients = this.patientBusiness.showAll();
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

  private bindThis(): void{
      this.testRoute = this.testRoute.bind(this);
      this.showPatient = this.showPatient.bind(this);
      this.showPatients = this.showPatients.bind(this);
      this.createPatient = this.createPatient.bind(this);
      this.changePatientAddress = this.changePatientAddress.bind(this);
  }

  public init(): void {
    this.bindThis();  
    this.router.get("/testPatientRouter", this.testRoute);
    this.router.get("/getPatient", this.showPatient);
    this.router.get("/getPatients", this.showPatients);
    this.router.post("/createPatient", this.createPatient);
    this.router.put("/changePatientAddress", this.changePatientAddress);
  }
}

const patientRouter = new PatientRouter();
patientRouter.init();

export default patientRouter.router;
