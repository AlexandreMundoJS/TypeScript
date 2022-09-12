import { Doctor } from "../entities/Doctor";
import { DoctorDataBase } from "../persist/DoctorDataBase";

export class DoctorBusiness {
  private dataBase!: DoctorDataBase;

  public DoctorBusiness() {
    this.dataBase = new DoctorDataBase();
  }

  public add(doctor: Doctor): void {
    this.dataBase.add(doctor);
  }

  public change(doctor: Doctor): void {
    this.dataBase.change(doctor);
  }

  public delete(doctor: Doctor): void {
    this.dataBase.delete(doctor);
  }

  public search(CRM: number): Doctor {
    let doctor: Doctor = new Doctor();
    doctor.setCrm(CRM);
    let doctors: Array<Doctor> = this.dataBase.showAll();

    doctors.forEach((doc: Doctor) => {
      if (doc == doctor) {
        return doc;
      }
    });

    return null as any;
  }

  public appointment(name: string): Array<Doctor> {
    let doctors: Array<Doctor> = this.dataBase.showAll();
    let selectedDoctors: Array<Doctor> = new Array();

    doctors.forEach((doc: Doctor)=>{
        if (doc.getName().includes(name)){
            selectedDoctors.push(doc)
        }
    });

    return selectedDoctors;
  }

  public showAll(): Array<Doctor>{
      return this.dataBase.showAll();
  }
}
