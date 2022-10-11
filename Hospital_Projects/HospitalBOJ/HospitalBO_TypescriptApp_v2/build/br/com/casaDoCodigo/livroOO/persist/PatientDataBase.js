"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDataBase = void 0;
class PatientDataBase {
    constructor() {
        this.PatientDataBase();
    }
    PatientDataBase() {
        this.patients = new Array();
    }
    add(patient) {
        console.log("CHAMOU O ADD", patient);
        if (!this.patients.includes(patient)) {
            console.log("Entrou no if");
            this.patients.push(patient);
        }
        else {
            console.log("Entrou no else");
        }
        console.log("THIS.PATIENTS", this.patients);
    }
    change(patient) {
        let position = this.patients.indexOf(patient);
        for (let i = 0; i < this.patients.length; i++) {
            if (i == position) {
                this.patients[i] = patient;
            }
        }
    }
    delete(patient) {
        let position = this.patients.indexOf(patient);
        if (position > -1) {
            this.patients.splice(position, 1);
        }
    }
    showAll() {
        return this.patients;
    }
}
exports.PatientDataBase = PatientDataBase;
