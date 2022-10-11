import { IPatient } from "../interfaces/entities/IPatient";
import { Appointment } from "./Appointment";
import { Person } from "./Person";
import { Plan } from "./Plan";

export class Patient extends Person implements IPatient {
  private plan: Plan;
  private code: string;
  // private appointments : Appointment[] = []

  constructor(private readonly cpf: string){
    super();
  }

  public getCpf(): string {
    return this.cpf;
  }

  public getPlan(): Plan {
    return this.plan;
  }

  public setPlan(plan: Plan): void {
    this.plan = plan;
  }

  public getCode(): string {
    return this.code;
  }

  public setCode(code: string): void{
    this.code = code;
  }
}
