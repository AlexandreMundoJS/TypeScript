import { Appointment } from "../entities/Appointment";
export class SearchDataBase {
  private appointments!: Array<Appointment>;

  public SearchDataBase() {
    this.appointments = new Array();
  }

  public add(appointment: Appointment): void {
    if (!this.appointments.includes(appointment)) {
      this.appointments.push(appointment);
      appointment.setCode(this.appointments.length);
    }
  }

  public delete(appointment: Appointment): void{
    this.appointments = this.appointments.filter((el)=>{
        return el.getCode() !== appointment.getCode();
    })
  }

  public showAll(): Array<Appointment> {
      return this.appointments;
  }
}
