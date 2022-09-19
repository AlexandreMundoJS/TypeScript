import { JsonDB, Config } from "node-json-db";
import { Request, Response } from "express";
import { Serialize } from "../utils/serialize/serialize";
import { Appointment } from "../entities/Appointment";
import { DateConversor } from "../utils/DateConversor";

export class AppointmentBusiness {
  private db: any;

  public constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  async showAll() {
    try {
      return await this.db.getData("/appointments");
    } catch (error) {
      return error;
    }
  }

  async show(query: any) {
    const appointmentsArray = await this.db.getData("/appointments");
    let showAppointment = false;
    let appointmentData;
    appointmentsArray.forEach(async (appointment: { code: any }) => {
      if (appointment.code == query) {
        showAppointment = true;
        appointmentData = appointment;
      }
    });
    if (appointmentData) {
      return appointmentData;
    }
  }

  async add(appointment: any, req: Request, res: Response) {
    try {
      let serializedAppointment = new Serialize().serializeAppointment(
        appointment
      );
      if (serializedAppointment.length == 0) {
        const { code, patient, doctor, date } = appointment;
        const newAppointment: Appointment = new Appointment(
          code,
          patient,
          doctor,
          new DateConversor().dateConverter(date)
        );
        let allAppointments = await this.db.getData("/appointments");
        let canAdd = true;
        allAppointments.forEach(async (appointment: { code: any }) => {
          if (appointment.code == newAppointment.getCode()) {
            canAdd = false;
          }
        });
        if (canAdd) {
          await this.db.push("/appointments[]", newAppointment, true);
          res.status(200).json({
            message: "Appointment Added",
            appointment: newAppointment,
          });
        } else {
          res.status(400).json({
            message: "Existing appointment",
          });
        }
      } else {
        res.status(400).json({
          message: "Missing required fields",
          fields: serializedAppointment,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Unexpected Error",
      });
    }
  }
}
