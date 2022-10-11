import { Plan } from "../../entities/Plan";
import { IPerson } from "./IPerson";

export interface IPatient extends IPerson {
    getCpf(): string;
    getPlan(): Plan;
    setPlan(plan: Plan): void;
}