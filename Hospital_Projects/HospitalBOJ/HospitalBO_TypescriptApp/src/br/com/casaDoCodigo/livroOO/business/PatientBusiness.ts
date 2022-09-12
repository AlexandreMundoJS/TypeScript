import { Patient } from "../entities/Patient";
import { PatientDataBase } from "../persist/PatientDataBase";

export class PatientBusiness {
    private database: PatientDataBase = new PatientDataBase();
    // public constructor(){
    //     this.PatientBusiness();
    // }

    // public PatientBusiness(){
    //     this.database = new PatientDataBase();
    // }


    public add(patient: Patient): void{
        this.database.add(patient)
    }

    public change(patient: Patient): void{
        this.database.change(patient);
    }

    public delete(patient: Patient): void{
        this.database.delete(patient);
    }

    public search(CPF: string): Patient{
        let patient: Patient = new Patient();
        patient.setCpf(CPF);

        let patients: Array<Patient> = this.database.showAll();
        patients.forEach((pat: Patient)=>{
            if (pat == patient){
                return pat;
            }
        })

        return null as any;
    }

    public appointment(name: string, dateOfBirth: Date): Array<Patient>{
        let patients: Array<Patient> = this.database.showAll();
        let selectedPatients: Array<Patient> = new Array();

        patients.forEach((pat: Patient)=>{
            if (pat.getName().includes(name) && pat.getDateOfBirth() == dateOfBirth){
                selectedPatients.push(pat)
            }
        });

        return selectedPatients;
    }

    public showAll(): Array<Patient>{
        return this.database.showAll();
    }
}

// export default new PatientBusiness();
// module.exports = new PatientBusiness();