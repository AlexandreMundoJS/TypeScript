import { Config, JsonDB } from "node-json-db";
import { Patient } from "../entities/Patient";

export class PatientDataBase {
  db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  public async add(patients: Patient[]): Promise<Patient[]> {
    const allOldPatients = await this.db.getData("/patients");
    const newPatientsArray = [];
    let counter = allOldPatients.length;
    for await (const patient of patients) {
      patient.setCode((counter += 1));
      if (
        !allOldPatients.some(
          (patientElement: any) => patientElement.code === patient.getCode()
        )
      ) {
        newPatientsArray.push(patient);
        await this.db.push("/patients[]", patient, true);
      } else {
        throw new Error("Not possible to add Patient to database");
      }
    }
    return newPatientsArray;
  }

  public async showAll(): Promise<Patient[]> {
    return this.db.getData("/patients");
  }

  public async show(patient: string): Promise<Patient[]> {
    const patientsArray = await this.db.getData("/patients");
    return patientsArray.filter(
      (element: { code: string }) => element.code == patient
    );
  }
}
