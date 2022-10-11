import { Address } from "../../entities/Address";

export interface IPerson {
    getName(): string;
    setName(name: string): void;
    getDateOfBirth(): Date;
    setDateOfBirth(dateOfBirth: Date): void;
    getAddress(): Address;
    setAddress(address: Address): void;
}