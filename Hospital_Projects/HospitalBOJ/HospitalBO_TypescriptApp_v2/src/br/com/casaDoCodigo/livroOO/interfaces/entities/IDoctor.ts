import { Specialties } from "../../entities/Specialties";
import { IPerson } from "./IPerson";

export interface IDoctor extends IPerson{
    getCrm(): number;
    setCrm(crm: number): void;
    getSpecialties(): Array<Specialties>;
    setSpecialties(specialties: Array<Specialties>): void;
    getHourValue(): number;
    setHourValue(hourValue: number): void;
}