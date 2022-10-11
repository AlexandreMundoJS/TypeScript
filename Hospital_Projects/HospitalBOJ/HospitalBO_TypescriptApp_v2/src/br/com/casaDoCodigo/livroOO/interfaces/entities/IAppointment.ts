import { Doctor } from "../../entities/Doctor";
import { Patient } from "../../entities/Patient";

export interface IAppointment {
    getCode(): number;
    setCode(code:number): void;
    getPatient(): Patient;
    setPatient(patient: Patient): void;
    getDoctor(): Doctor;
    setDoctor(doctor: Doctor): void;
    getDate(): Date;
    setDate(date: Date): void;
}