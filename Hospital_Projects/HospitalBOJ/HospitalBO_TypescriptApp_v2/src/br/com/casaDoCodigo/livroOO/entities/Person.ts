import { IPerson } from "../interfaces/entities/IPerson";
import { Address } from "./Address";
export class Person implements IPerson {
  private name!: string;
  private dateOfBitrh!: Date;
  private address!: Address;

  // public constructor(name: string, dateOfBirth: Date, address: Address){
  //   this.name = name;
  //   this.dateOfBitrh = dateOfBirth;
  //   this.address = address
  // }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDateOfBirth(): Date {
    return this.dateOfBitrh;
  }

  public setDateOfBirth(dateOfBitrh: Date): void {
    this.dateOfBitrh = dateOfBitrh;
  }

  public getAddress(): Address {
    return this.address;
  }

  public setAddress(address: Address): void {
    this.address = address;
  }
}
