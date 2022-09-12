import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Room } from "./Room";

export class Procedure {
  private code!: number;
  private patient!: Patient;
  private doctors!: Array<Doctor>;
  private date!: Date;
  private room!: Room;
  private value!: number;
  private durationTime!: number;

  public Procedure() {}

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

  public getDoctors(): Array<Doctor> {
    return this.doctors;
  }

  public setDoctors(doctors: Array<Doctor>): void {
    this.doctors = doctors;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getRoom(): Room {
    return this.room;
  }

  public setRoom(room: Room): void {
    this.room = room;
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public getDurationTime(): number {
    return this.durationTime;
  }

  public setDurationTime(durationTime: number): void{
    this.durationTime = durationTime;
  }
}
