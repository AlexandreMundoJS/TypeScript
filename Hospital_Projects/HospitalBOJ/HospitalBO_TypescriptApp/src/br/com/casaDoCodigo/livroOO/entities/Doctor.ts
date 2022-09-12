import { Person } from "./Person";
import { Specialties } from "./Specialties";

export class Doctor extends Person {
  private crm!: number;
  private specialties!: Array<Specialties>;
  private hourValue!: number;

  public Doctor() {}

  public getCrm(): number {
    return this.crm;
  }

  public setCrm(crm: number): void {
    this.crm = crm;
  }

  public getSpecialties(): Array<Specialties> {
    return this.specialties;
  }

  public setSpecialties(specialties: Array<Specialties>): void {
    this.specialties = specialties;
  }

  public getHourValue(): number {
    return this.hourValue;
  }

  public setHourValue(hourValue: number): void {
    this.hourValue = hourValue;
  }
}
