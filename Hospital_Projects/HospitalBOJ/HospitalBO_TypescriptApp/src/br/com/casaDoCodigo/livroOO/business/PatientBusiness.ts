import { Patient } from "../entities/Patient";
import { Plan } from "../entities/Plan";
import { AddressConversor } from "../utils/AddressConversor";
import { DateConversor } from "../utils/DateConversor";
import { JsonDB, Config } from "node-json-db";

export class PatientBusiness {
  private db: any;

  public constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  async add(patient: any) {
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
    await this.db.push(
      "/patients[]",
      { id: `${newPatient.getCpf()}`, patient: newPatient },
      true
    );
  }
  show() {}
  async showAll() {
    try {
      return await this.db.getData("/patients");
    } catch (error) {
      return error;
    }
  }
  update() {}
}
