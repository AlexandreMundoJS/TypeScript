import { Address } from "./Address";
export class Person {
  private name!: string;
  private dateOfBitrh!: Date;
  private address!: Address;

  public Person() {}

  public getName() {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDateOfBirth() {
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
