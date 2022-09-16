import { Patient } from "../entities/Patient";
import { Plan } from "../entities/Plan";
import { AddressConversor } from "../utils/AddressConversor";
import { DateConversor } from "../utils/DateConversor";
import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import { Serialize } from "../utils/serialize/serialize";
import { Request, Response } from "express";
export class PatientBusiness {
  private db: any;

  public constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  async add(patient: any, req: Request, res: Response) {
    try {
      let serializedPatient = new Serialize().serializePatient(patient);
      if (serializedPatient.length == 0) {
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
        allPatients.forEach(async (patient: { id: any }) => {
          if (patient.id == newPatient.getCpf()) {
            canAdd = false;
          }
        });
        if (canAdd) {
          await this.db.push(
            "/patients[]",
            { id: `${newPatient.getCpf()}`, patient: newPatient },
            true
          );
          res.status(200).json({
            message: "Patient Added",
            patient: newPatient,
          });
        } else {
          res.status(400).json({
            message: "Existing patient",
          });
        }
      } else {
        res.status(400).json({
          message: "Missing required fields",
          fields: serializedPatient,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Unexpected Error",
      });
    }
  }

  async show(query: any) {
    const patientsArray = await this.db.getData("/patients");
    let showData = false;
    let patientData;
    patientsArray.forEach(async (patient: { id: any }) => {
      if (patient.id === query) {
        showData = true;
        patientData = patient;
      }
    });
    return patientData;
  }

  async showAll() {
    try {
      return await this.db.getData("/patients");
    } catch (error) {
      return error;
    }
  }

  async update(patient: any) {
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

    let content = JSON.parse(fs.readFileSync("hospitalDataBase.json", "utf-8"));
    content.patients.forEach(async (oldPatient: any, key: any) => {
      if (oldPatient.id == newPatient.getCpf()) {
        content.patients[key].patient = newPatient;
      }
    });
    fs.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
    await this.db.reload();
  }
}
