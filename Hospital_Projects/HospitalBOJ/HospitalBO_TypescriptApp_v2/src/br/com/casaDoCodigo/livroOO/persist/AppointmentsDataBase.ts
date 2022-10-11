import { Config, JsonDB } from "node-json-db";
import { Appointment } from "../entities/Appointment";

export class AppointmentDataBase {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config("hospitalDataBase", true, false, "/"));
  }

  public async add(appointments: Appointment[]): Promise<Appointment[]> {
    const allOldAppointments = await this.db.getData("/appointments");
    const newAppointmentsArray = [];
    let counter = allOldAppointments.length;
    for await (const appointment of appointments) {
      appointment.setCode((counter += 1));
      if (
        !allOldAppointments.some(
          (appointmentElement: any) =>
            appointmentElement.code === appointment.getCode()
        )
      ) {
        newAppointmentsArray.push(appointment);
        await this.db.push("/appointments[]", appointment, true);
      } else {
        throw new Error("Not possible to add Appointment to database");
      }
    }
    return newAppointmentsArray;
  }

  public showAll(): Promise<Appointment[]> {
    return this.db.getData("/appointments");
  }

  public async show(id: string): Promise<Appointment[]> {
    const appointmentsArray = await this.db.getData("/appointments");
    return appointmentsArray.filter(
      (element: { code: string }) => element.code == id
    );
  }
}
