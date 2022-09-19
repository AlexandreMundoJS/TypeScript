import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
import { Procedure } from "../entities/Procedure";
import { DateConversor } from "../utils/DateConversor";

export class ProcedureBusiness {
  private db: any;

  public constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  async showAll() {
    try {
      return await this.db.getData("/procedures");
    } catch (error) {
      return error;
    }
  }
  async show(query: any) {
    const proceduresArray = await this.db.getData("/procedures");
    let showProcedure = false;
    let procedureData;
    proceduresArray.forEach(async (procedure: { code: any }) => {
      if (procedure.code == query) {
        showProcedure = true;
        procedureData = procedure;
      }
    });
    if (procedureData) {
      return procedureData;
    }
  }
  async update(procedure: any, code: any) {
    let content = JSON.parse(fs.readFileSync("hospitalDataBase.json", "utf-8"));
    content.procedures.forEach(async (oldProcedure: any) => {
      if (oldProcedure.code == code) {
        for (let procedureProp in procedure) {
          if (Object.keys(procedure).includes(procedureProp)) {
            if (procedureProp == "date"){
              oldProcedure.procedure[procedureProp] = new DateConversor().dateConverter(procedure[procedureProp]);
            } else {
              oldProcedure.procedure[procedureProp] = procedure[procedureProp];
            }
          }
        }
      }
    });
    fs.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
    await this.db.reload();
  }
  async add(procedure: any, req: Request, res: Response) {
    try {
      let serializedProcedure = new Serialize().serializeProcedure(procedure);
      if (serializedProcedure.length == 0) {
        const { code, patient, doctors, date, room, value, durationTime } =
          procedure;
        const newProcedure: Procedure = new Procedure(
          code,
          patient,
          doctors,
          new DateConversor().dateConverter(date),
          room,
          value,
          durationTime
        );
        let allProcedures = await this.db.getData("/procedures");
        let canAdd = true;
        allProcedures.forEach(async (procedure: { code: any }) => {
          if (procedure.code == newProcedure.getCode()) {
            canAdd = false;
          }
        });
        if (canAdd) {
          await this.db.push("/procedures[]", newProcedure, true);
          res.status(200).json({
            message: "Procedure Added",
            procedure: newProcedure,
          });
        } else {
          res.status(400).json({
            message: "Existing procedure",
          });
        }
      } else {
        res.status(400).json({
          message: "Missing required fields",
          fields: serializedProcedure,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Unexpected Error",
      });
    }
  }
}
