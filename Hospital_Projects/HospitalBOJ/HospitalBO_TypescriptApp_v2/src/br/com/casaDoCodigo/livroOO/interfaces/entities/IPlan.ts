export interface IPlan {
    getName(): string;
    setName(name: string): void;
    getMonthlyPayment(): number;
    setMonthlyPayment(monthelyPayment: number): void;
}