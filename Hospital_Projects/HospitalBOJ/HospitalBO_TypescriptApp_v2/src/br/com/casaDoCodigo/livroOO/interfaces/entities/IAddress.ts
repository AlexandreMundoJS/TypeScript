export interface IAddress {
    getStreet(): string;
    setStreet(street: string): void;
    getNumber(): number;
    setNumber(number: number): void;
    getNeighborhood(): string;
    setNeighborhood(neighborhood: string): void;
    getPostalCode(): string;
    setPostalCode(postalCode: string): void;
}