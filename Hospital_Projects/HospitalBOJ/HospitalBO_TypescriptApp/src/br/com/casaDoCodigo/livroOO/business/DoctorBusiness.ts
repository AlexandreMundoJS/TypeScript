import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import { Doctor } from "../entities/Doctor";
import { DateConversor } from "../utils/DateConversor";
import { AddressConversor } from "../utils/AddressConversor";
import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
export class DoctorBusiness {
  private db: any;

  public constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  async add(doctor: any, req: Request, res: Response) {
    try {
      let serializedDoctor = new Serialize().serializeDoctor(doctor);
      if (serializedDoctor.length == 0) {
        const { crm, specialties, hourValue, name, dateOfBirth, address } =
          doctor;
        const newDoctor: Doctor = new Doctor(
          crm,
          specialties,
          hourValue,
          name,
          new DateConversor().dateConverter(dateOfBirth),
          new AddressConversor().convertAddress(address)
        );
        let allDoctors = await this.db.getData("/doctors");
        let canAdd = true;
        allDoctors.forEach(async (doctor: { id: any }) => {
          if (doctor.id == newDoctor.getCrm()) {
            canAdd = false;
          }
        });
        if (canAdd) {
          await this.db.push(
            "/doctors[]",
            { id: `${newDoctor.getCrm()}`, doctor: newDoctor },
            true
          );
          res.status(200).json({
            message: "Doctor created",
            doctor: newDoctor,
          });
        } else {
          res.status(400).json({
            message: "Existing doctor",
          });
        }
      } else {
        res.status(400).json({
          message: "Missing required fields",
          fields: serializedDoctor,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Unexpected Error",
      });
    }
  }

  async show(query: any) {
    const doctorsArray = await this.db.getData("/doctors");
    let showDoctor = false;
    let doctorData;
    doctorsArray.forEach(async (doctor: { id: any }) => {
      if (doctor.id === query) {
        showDoctor = true;
        doctorData = doctor;
      }
    });
    if (showDoctor) {
      return doctorData;
    }
  }

  async showAll() {
    try {
      return await this.db.getData("/doctors");
    } catch (error) {
      return error;
    }
  }

  async update(doctor: any, id: any) {
    let content = JSON.parse(fs.readFileSync("hospitalDataBase.json", "utf-8"));
    content.doctors.forEach(async (oldDoctor: any, key: any) => {
      if (oldDoctor.id == id) {
        for(let docProp in doctor){
          if (Object.keys(oldDoctor.doctor).includes(docProp)){
            oldDoctor.doctor[docProp] = doctor[docProp]
          }
        }
      }
    });
    fs.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
    await this.db.reload();
  }
}
