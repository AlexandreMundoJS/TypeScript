import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export class Appointment {
  private code!: number;
  private patient!: Patient;
  private doctor!: Doctor;
  private date!: Date;

  public constructor(code: number, patient: Patient, doctor: Doctor, date: Date){
    this.code = code;
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
  }

  public getCode(): number {
    return this.code;
  }

  public setCode(code: number): void {
    this.code = code;
  }

  public getPatient(): Patient {
    return this.patient;
  }

  public setPatient(patient: Patient): void {
    this.patient = patient;
  }

  public getDoctor(): Doctor {
    return this.doctor;
  }

  public setDoctor(doctor: Doctor): void {
    this.doctor = doctor;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }
}
