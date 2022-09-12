import { Procedure } from "../entities/Procedure";

export interface IHealthMinistryIntegration {
    generateData(procedures: Array<Procedure>): void
}