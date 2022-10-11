import { Doctor } from "../../entities/Doctor";
import { Patient } from "../../entities/Patient";
import { Room } from "../../entities/Room";

export interface IProcedure {
  getCode(): number;
  setCode(code: number): void;
  getPatient(): Patient;
  setPatient(patient: Patient): void;
  getDoctors(): Array<Doctor>;
  setDoctors(doctors: Array<Doctor>): void;
  getDate(): Date;
  setDate(date: Date): void;
  getRoom(): Room;
  setRoom(room: Room): void;
  getValue(): number;
  setValue(value: number): void;
  getDurationTime(): number;
  setDurationTime(durationTime: number): void;
}
