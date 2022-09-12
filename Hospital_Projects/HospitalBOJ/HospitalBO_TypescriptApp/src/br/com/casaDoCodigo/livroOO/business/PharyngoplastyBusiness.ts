import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { Pharyngoplasty } from "../entities/Pharyngoplasty";
import { Procedure } from "../entities/Procedure";
import { ProcedureBusiness } from "./ProcedureBusiness";

export class PharyngoplastyBusiness extends ProcedureBusiness {
    public register(doctors: Array<Doctor>, patient:Patient, date: Date): void{
        let pharyngoplasty: Pharyngoplasty = new Pharyngoplasty();
        pharyngoplasty.setPatient(patient);
        pharyngoplasty.setDoctors(doctors);
        pharyngoplasty.setDate(date);

        this.getDataBase().add(pharyngoplasty);
    }

    public search(code: number):Pharyngoplasty{
        let procedures: Array<Procedure> = this.getDataBase().showAll();
        procedures.forEach((procedure: Procedure)=>{
            if (procedure.getCode() == code){
                return procedure;
            }
        })
        return null as any;
    }

    public searchDoctor(doctor:Doctor): Array<Pharyngoplasty>{
        let procedures: Array<Procedure> = this.getDataBase().showAll();
        let doctorProcedures: Array<Pharyngoplasty> = new Array();
        procedures.forEach((procedure: Procedure)=>{
            if (procedure.getDoctors().includes(doctor) && procedure instanceof Pharyngoplasty){
                doctorProcedures.push(procedure)
            }
        })
        return doctorProcedures;
    }

    public showAll():Array<Pharyngoplasty>{
        let procedures: Array<Procedure> = this.getDataBase().showAll();
        let pharyngoplasties: Array<Pharyngoplasty> = new Array();

        procedures.forEach((procedure: Procedure)=>{
            if (procedure instanceof Pharyngoplasty){
                pharyngoplasties.push(procedure);
            }
        })

        return pharyngoplasties;
    }

    public calculateTotal(procedure:Procedure):number{
        let customerValue: number = procedure.getPatient().getPlan().getMonthlyPayment() * 0.25;
        let totalDoctors: number = 0.0;

        procedure.getDoctors().forEach((doctor: Doctor)=>{
            totalDoctors += doctor.getHourValue();
        })

        return customerValue + procedure.getValue() + totalDoctors;
    }
}