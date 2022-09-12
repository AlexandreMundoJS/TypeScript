import { Appointment } from "../entities/Appointment";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { SearchDataBase } from "../persist/SearchDataBase";

export class SearchBusiness {
  private database!: SearchDataBase;

  public SearchBusiness() {
    this.database = new SearchDataBase();
  }

  public addAppointment(patient: Patient, doctor: Doctor, date: Date): void {
    let appointment: Appointment = new Appointment();
    appointment.setPatient(patient);
    appointment.setDoctor(doctor);
    appointment.setDate(date);
    this.database.add(appointment);
  }

  public cancelAppointment(appointment: Appointment) {
    this.database.delete(appointment);
  }

  public search(code: number): Appointment {
    let searches: Array<Appointment> = this.database.showAll();
    searches.forEach((appointment: Appointment) => {
      if (appointment.getCode() == code) {
        return appointment;
      }
    });
    return null as any;
  }

  public patientSearch(patient: Patient): Array<Appointment> {
    let appointments: Array<Appointment> = this.database.showAll();
    let patientAppointments: Array<Appointment> = new Array();

    appointments.forEach((appointment: Appointment) => {
      if (appointment.getPatient() === patient) {
        patientAppointments.push(appointment);
      }
    });
    return patientAppointments;
  }

  public showAll(): Array<Appointment> {
      return this.database.showAll();
  }
}
