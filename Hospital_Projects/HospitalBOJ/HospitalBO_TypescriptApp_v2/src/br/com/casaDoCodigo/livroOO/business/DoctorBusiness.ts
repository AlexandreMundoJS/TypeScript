import { Doctor } from "../entities/Doctor";
import { DateConversor } from "../utils/DateConversor";
import { AddressConversor } from "../utils/AddressConversor";
import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
import { IApiClient } from "../interfaces/business/PersistMethods";
import { DoctorDataBase } from "../persist/DoctorsDataBase";
import { ErrorHandler } from "../utils/handlerError";
export class DoctorBusiness implements IApiClient {
  private database: DoctorDataBase;

  public constructor() {
    this.database = new DoctorDataBase();
  }

  async add(doctor: any, req: Request, res: Response) {
    const serializedDoctor: any[] = [];
    doctor.forEach((element: Doctor) => {
      serializedDoctor.push(new Serialize().serializeDoctor(element));
    });
    let canPush = true;
    serializedDoctor.forEach((element) => {
      element.length !== 0 ? (canPush = false) : (canPush = true);
    });

    const arrayOfDoctors = [];
    if (canPush) {
      for await (const element of doctor) {
        const { crm, specialties, hourValue, name, dateOfBirth, address } =
          element;
        const newDoctor: Doctor = new Doctor();
        newDoctor.setCrm(crm);
        newDoctor.setSpecialties(specialties);
        newDoctor.setHourValue(hourValue);
        newDoctor.setName(name);
        newDoctor.setDateOfBirth(
          new DateConversor().dateConverter(dateOfBirth)
        );
        newDoctor.setAddress(new AddressConversor().convertAddress(address));
        arrayOfDoctors.push(newDoctor);
      }
      return await this.database.add(arrayOfDoctors);
    } else {
      throw new Error("Missing required fields");
    }
  }

  async update(data: any, req: any, res: any): Promise<void>{
    throw new Error("Method not implemented");
  }

  async show(query: any) {
    const totalDoctors: Doctor[] = await this.database.show(query);
    if (totalDoctors.length){
      return totalDoctors;
    } else {
      throw new ErrorHandler().doctorNotFinded();
    }
    
  }

  async showAll() {
    const totalDoctors: Doctor[] = await this.database.showAll();
    if (totalDoctors.length){
      return totalDoctors;
    } else {
      throw new ErrorHandler().doctorsError();
    }
  }
}
