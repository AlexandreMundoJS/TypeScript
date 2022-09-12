import { Doctor } from "../entities/Doctor";

export class DoctorDataBase{
    private doctors!: Array<Doctor>;

    public DoctorDataBase(){
        this.doctors = new Array();
    }

    public add(doctor: Doctor):void{
        if (!this.doctors.includes(doctor)){
            this.doctors.push(doctor);
        }
    }

    public change(doctor: Doctor):void{
        let position: number = this.doctors.indexOf(doctor);
        for (let i = 0; i < this.doctors.length; i++){
            if (i == position){
                this.doctors[i] = doctor;
            }
        }
    }

    public delete(doctor: Doctor): void{
        let position: number = this.doctors.indexOf(doctor);
        if (position > -1){
            this.doctors.splice(position, 1);
        }
    }

    public showAll(): Array<Doctor>{
        return this.doctors;
    }
}