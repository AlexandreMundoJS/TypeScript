import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
import { Procedure } from "../entities/Procedure";
import { DateConversor } from "../utils/DateConversor";
import { IApiClient } from "../interfaces/business/PersistMethods";
import { ProcedureDataBase } from "../persist/ProceduresDataBase";
import { ErrorHandler } from "../utils/handlerError";

export class ProcedureBusiness implements IApiClient {
  private database: ProcedureDataBase;

  public constructor() {
    this.database = new ProcedureDataBase();
  }

  async showAll() {
    const totalProcedures = await this.database.showAll();
    if (totalProcedures.length) {
      return totalProcedures;
    } else {
      throw new ErrorHandler().proceduresError();
    }
  }

  async show(query: any) {
    const totalProcedures: Procedure[] = await this.database.show(query);
    if (totalProcedures.length) {
      return totalProcedures;
    } else {
      throw new ErrorHandler().proceduresError();
    }
  }

  async add(procedure: [], req: Request, res: Response) {
    const serializedProcedure: any[] = [];
    procedure.forEach((element: Procedure) => {
      serializedProcedure.push(new Serialize().serializeProcedure(element));
    });
    let canPush = true;
    serializedProcedure.forEach((element) => {
      element.length !== 0 ? (canPush = false) : (canPush = true);
    });
    const arrayOfProcedures = [];
    if (canPush) {
      for await (const element of procedure) {
        const { patient, doctor, date, room, value, durationTime } = element;
        const newProcedure: Procedure = new Procedure();
        newProcedure.setDate(new DateConversor().dateConverter(date));
        newProcedure.setDoctors(doctor);
        newProcedure.setPatient(patient);
        newProcedure.setRoom(room);
        newProcedure.setValue(value);
        newProcedure.setDurationTime(durationTime);
        arrayOfProcedures.push(newProcedure);
      }
      return await this.database.add(arrayOfProcedures);
    } else {
      throw new Error("Missing required fields");
    }
  }

  update(req: any, res: any): any {
    throw new Error("Method not implemented.");
  }
}
