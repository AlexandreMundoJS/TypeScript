import { Config, JsonDB } from "node-json-db";
import { Procedure } from "../entities/Procedure";

export class ProcedureDataBase {
  db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  public async add(procedures: Procedure[]): Promise<Procedure[]> {
    const allOldProcedures = await this.db.getData("/procedures");
    const newProceduresArray = [];
    let counter = allOldProcedures.length;
    for await (const procedure of procedures) {
      procedure.setCode((counter += 1));
      if (
        !allOldProcedures.some(
          (procedureElement: any) =>
            procedureElement.code === procedure.getCode()
        )
      ) {
        newProceduresArray.push(procedure);
        await this.db.push("/procedures[]", procedure, true);
      } else {
        throw new Error("Not possible to add Procedure to dataBase");
      }
    }

    return newProceduresArray;
  }

  public showAll(): Promise<Procedure[]> {
    return this.db.getData("/procedures");
  }

  public async show(id: string): Promise<Procedure[]> {
    const proceduresArray = await this.db.getData("/procedures");
    return proceduresArray.filter(
      (element: { code: string }) => element.code == id
    );
  }
}
