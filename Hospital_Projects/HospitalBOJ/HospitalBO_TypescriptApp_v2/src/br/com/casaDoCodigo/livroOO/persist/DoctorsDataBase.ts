import { Config, JsonDB } from "node-json-db";
import { Doctor } from "../entities/Doctor";

export class DoctorDataBase {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  public async add(doctors: Doctor[]): Promise<Doctor[]> {
    const allOldDoctors = await this.db.getData("/doctors");
    const newDoctorsArray = [];
    let counter = allOldDoctors.length;
    for await (const doctor of doctors) {
      doctor.setCode((counter += 1));
      if (
        !allOldDoctors.some(
          (doctorElement: any) => doctorElement.code === doctor.getCode()
        )
      ) {
        newDoctorsArray.push(doctor);
        await this.db.push("/doctors[]", doctor, true);
      } else {
        throw new Error("Not possible to add Doctor to database");
      }
    }
    return newDoctorsArray;
  }

  public showAll(): Promise<Doctor[]> {
    return this.db.getData("/doctors");
  }

  public async show(code: string): Promise<Doctor[]> {
    const doctorsArray = await this.db.getData("/doctors");
    return doctorsArray.filter(
      (element: { code: string }) => element.code == code
    );
  }
}
