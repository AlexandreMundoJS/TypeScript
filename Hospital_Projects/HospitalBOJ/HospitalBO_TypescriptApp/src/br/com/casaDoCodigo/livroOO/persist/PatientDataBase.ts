import { Patient } from "../entities/Patient";

export class PatientDataBase{
    public patients : Array<Patient>;
    
    public constructor(){
        this.PatientDataBase();
    }
    public PatientDataBase(){
        this.patients = new Array();
    }

    public add(patient: Patient): void{
        console.log("CHAMOU O ADD", patient)
        if (!this.patients.includes(patient)){
            console.log("Entrou no if")
            this.patients.push(patient);
        } else {
            console.log("Entrou no else")
        }
        console.log("THIS.PATIENTS", this.patients)
    }

    public change(patient: Patient): void{
        let position = this.patients.indexOf(patient);
        for (let i = 0; i < this.patients.length; i++){
            if (i == position){
                this.patients[i] = patient;
            }
        }
    }
    
    public delete(patient: Patient): void{
        let position = this.patients.indexOf(patient);
        if (position > -1){
            this.patients.splice(position, 1);
        }
    }

    public showAll(): Array<Patient>{
        return this.patients;
    }
}