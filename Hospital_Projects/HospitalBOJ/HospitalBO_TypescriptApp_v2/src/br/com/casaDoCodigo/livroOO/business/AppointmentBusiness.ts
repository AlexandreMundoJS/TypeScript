import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
import { Appointment } from "../entities/Appointment";
import { DateConversor } from "../utils/DateConversor";
import { IApiClient } from "../interfaces/business/PersistMethods";
import { AppointmentDataBase } from "../persist/AppointmentsDataBase";
import { ErrorHandler } from "../utils/handlerError";

export class AppointmentBusiness implements IApiClient {
  private database: AppointmentDataBase;

  public constructor() {
    this.database = new AppointmentDataBase();
  }

  async showAll() {
    const totalAppointments = await this.database.showAll();
    if (totalAppointments.length) {
      return totalAppointments;
    } else {
      throw new ErrorHandler().appointmentsError();
    }
  }

  async show(query: string): Promise<any> {
    const totalAppointments: Appointment[] = await this.database.show(query);
    if (totalAppointments.length) {
      return totalAppointments;
    } else {
      throw new ErrorHandler().appointmentsError();
    }
  }

  async add(appointment: [], req: Request, res: Response) {
    const serializedAppointment: any[] = [];
    appointment.forEach((element: Appointment) => {
      serializedAppointment.push(new Serialize().serializeAppointment(element));
    });
    let canPush = true;
    serializedAppointment.forEach((element) => {
      element.length !== 0 ? (canPush = false) : (canPush = true);
    });
    const arrayOfAppointments = [];
    if (canPush) {
      for await (const element of appointment) {
        const { patient, doctor, date } = element;
        const newAppointment: Appointment = new Appointment();
        newAppointment.setPatient(patient);
        newAppointment.setDoctor(doctor);
        newAppointment.setDate(new DateConversor().dateConverter(date));
        arrayOfAppointments.push(newAppointment);
      }
      return await this.database.add(arrayOfAppointments);
    } else {
      throw new Error("Missing required fields");
    }
  }

  async update(data: any, req: any, res: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
