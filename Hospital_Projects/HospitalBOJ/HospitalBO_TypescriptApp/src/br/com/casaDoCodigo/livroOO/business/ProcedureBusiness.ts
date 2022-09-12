import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { Procedure } from "../entities/Procedure";
import { DataBaseProcedure } from "../persist/DataBaseProcedure";

export abstract class ProcedureBusiness {
  private dataBase!: DataBaseProcedure;

  public ProcedureBusiness() {
    this.dataBase = new DataBaseProcedure();
  }

  public getDataBase(): DataBaseProcedure {
    return this.dataBase;
  }

  public cancel(procedure: Procedure): void {
    this.dataBase.delete(procedure);
  }

  public abstract register(
    doctor: Array<Doctor>,
    patient: Patient,
    date: Date
  ): void;

  public abstract calculateTotal(procedure: Procedure): number;
}
