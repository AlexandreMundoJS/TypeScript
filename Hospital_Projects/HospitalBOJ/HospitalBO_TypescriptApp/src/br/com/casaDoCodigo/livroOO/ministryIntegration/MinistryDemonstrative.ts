import { NeuroSurgeryBusiness } from "../business/NeuroSurgeryBusiness";
import { Procedure } from "../entities/Procedure";
import { IHealthMinistryIntegration } from "./IHealthMinistryIntegration";

export class MinistryDemonstrative implements IHealthMinistryIntegration {
    generateData(procedures: Array<Procedure>): void{
        let neuroSurgeryBusiness = new NeuroSurgeryBusiness()
    }
}