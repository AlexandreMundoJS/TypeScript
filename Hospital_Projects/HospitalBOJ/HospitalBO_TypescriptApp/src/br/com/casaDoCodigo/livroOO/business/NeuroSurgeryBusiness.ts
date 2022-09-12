import { Doctor } from "../entities/Doctor";
import { Neurosurgery } from "../entities/Neurosurgery";
import { Patient } from "../entities/Patient";
import { Procedure } from "../entities/Procedure";
import { ProcedureBusiness } from "./ProcedureBusiness";

export class NeuroSurgeryBusiness extends ProcedureBusiness {
    public register(doctors: Array<Doctor>, patient: Patient, date: Date): void{
        let neuroSurgery: Neurosurgery = new Neurosurgery();
        neuroSurgery.setPatient(patient);
        neuroSurgery.setDoctors(doctors);
        neuroSurgery.setDate(date);

        this.getDataBase().add(neuroSurgery);
    }

    public verifyData(code: number): Neurosurgery{
        let procedures: Array<Procedure> = this.getDataBase().showAll();
        procedures.forEach((procedure: Procedure)=>{
            if(procedure.getCode() == code){
                return procedure;
            }
        })
        return null as any;
    }

    public doctorSearch(doctor: Doctor): Array<Neurosurgery>{
        let procedures = this.getDataBase().showAll();
        let doctorProcedures: Array<Neurosurgery> = new Array();

        procedures.forEach((procedure: Procedure)=>{
            if (procedure.getDoctors().includes(doctor) && procedure instanceof Neurosurgery){
                doctorProcedures.push(procedure)
            }
        })
        return doctorProcedures;
    }

    public showAll():Array<Neurosurgery>{
        let procedures: Array<Procedure> = this.getDataBase().showAll();
        let neurosurgeries = new Array();

        procedures.forEach((procedure: Procedure)=>{
            if (procedure instanceof Neurosurgery){
                neurosurgeries.push(procedure);
            }
        })

        return neurosurgeries;
    }

    public calculateTotal(procedure: Procedure):number{
        let totalDoctors: number = 0.0;

        procedure.getDoctors().forEach((doctor: Doctor)=>{
            totalDoctors += doctor.getHourValue();
        })

        return procedure.getValue() + totalDoctors;
    }
}