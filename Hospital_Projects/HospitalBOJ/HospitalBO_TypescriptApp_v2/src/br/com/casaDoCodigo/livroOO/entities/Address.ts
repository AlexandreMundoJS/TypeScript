import { IAddress } from "../interfaces/entities/IAddress";

export class Address implements IAddress{
  private street!: string;
  private number!: number;
  private neighborhood!: string;
  private postalCode!: string;

  public Address() {}

  public getStreet(): string {
    return this.street;
  }

  public setStreet(street: string): void {
    this.street = street;
  }

  public getNumber(): number {
    return this.number;
  }

  public setNumber(number: number): void {
    this.number = number;
  }

  public getNeighborhood(): string {
    return this.neighborhood;
  }

  public setNeighborhood(neighborhood: string): void {
    this.neighborhood = neighborhood;
  }

  public getPostalCode(): string {
    return this.postalCode;
  }

  public setPostalCode(postalCode: string): void {
    this.postalCode = postalCode;
  }
}
