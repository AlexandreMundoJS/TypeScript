import { Address } from "./Address";
import { Person } from "./Person";
import { Plan } from "./Plan";

export class Patient extends Person {
  private cpf: string;
  private plan: Plan;
  
  public constructor(cpf: string, plan: Plan, name: string, dateOfBirth: Date, address: Address){
    super(name, dateOfBirth, address);
    this.cpf = cpf;
    this.plan = plan
  }
  // public Patient() {}

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getPlan(): Plan {
    return this.plan;
  }

  public setPlan(plan: Plan): void {
    this.plan = plan;
  }
}
