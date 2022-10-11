import { Patient } from "../entities/Patient";
import { Plan } from "../entities/Plan";
import { AddressConversor } from "../utils/AddressConversor";
import { DateConversor } from "../utils/DateConversor";
import { Serialize } from "../utils/serialize/serialize";
import { Request, Response } from "express";
import { IApiClient } from "../interfaces/business/PersistMethods";
import { PatientDataBase } from "../persist/PatientsDataBase";
import { ErrorHandler } from "../utils/handlerError";
export class PatientBusiness implements IApiClient {
  private database: PatientDataBase;

  public constructor() {
    this.database = new PatientDataBase();
  }
  async show(user: any): Promise<any> {
    const totalPatients = await this.database.show(user);
    if (totalPatients.length) {
      return totalPatients;
    } else {
      throw new ErrorHandler().patientNotFinded();
    }
  }
  async showAll() {
    const totalPatients = await this.database.showAll();
    if (totalPatients.length) {
      return totalPatients;
    } else {
      throw new ErrorHandler().patientsError();
    }
  }

  update(data: any, req: any, res: any, ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async add(patient: [], req: Request, res: Response) {
    const serializedPatients: any[] = [];
    patient.forEach((element: Patient) => {
      serializedPatients.push(new Serialize().serializePatient(element));
    });
    let canPush = true;
    serializedPatients.forEach((element) => {
      element.length !== 0 ? (canPush = false) : (canPush = true);
    });
    const arrayOfPatients = [];
    if (canPush) {
      for await (const element of patient) {
        const {
          cpf,
          name,
          address,
          dateOfBirth,
          plan: { planName, monthlyPayment },
        } = element;
        const newPatient: Patient = new Patient(cpf);
        newPatient.setName(name);
        newPatient.setPlan(new Plan(planName, monthlyPayment));
        newPatient.setDateOfBirth(
          new DateConversor().dateConverter(dateOfBirth)
        );
        newPatient.setAddress(new AddressConversor().convertAddress(address));
        arrayOfPatients.push(newPatient);
      }
      return await this.database.add(arrayOfPatients);
    } else {
      throw new Error("Missing required fields");
    }
  }

  // async show(query: any) {
  //   const patientsArray = await this.db.getData("/patients");
  //   let showData = false;
  //   let patientData;
  //   patientsArray.forEach(async (patient: { id: any }) => {
  //     if (patient.id == query) {
  //       showData = true;
  //       patientData = patient;
  //     }
  //   });
  //   return patientData;
  // }

  // async showAll() {
  //   try {
  //     return await this.db.getData("/patients");
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async update(patient: any, id: any) {
  //   let content = JSON.parse(fs.readFileSync("hospitalDataBase.json", "utf-8"));
  //   content.patients.forEach(async (oldPatient: any) => {
  //     if (oldPatient.id == id) {
  //       for (let patientProp in patient) {
  //         if (Object.keys(oldPatient.patient).includes(patientProp)) {
  //           if (patientProp == "address") {
  //             oldPatient.patient[patientProp] =
  //               new AddressConversor().convertAddress(patient[patientProp]);
  //           } else if (patientProp == "plan") {
  //             oldPatient.patient[patientProp] = new Plan(
  //               patient[patientProp][0],
  //               patient[patientProp][1]
  //             );
  //           } else {
  //             oldPatient.patient[patientProp] = patient[patientProp];
  //           }
  //         }
  //       }
  //     }
  //   });
  //   fs.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
  //   await this.db.reload();
}
