"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientBusiness = void 0;
const Patient_1 = require("../entities/Patient");
const PatientDataBase_1 = require("../persist/PatientDataBase");
class PatientBusiness {
    constructor() {
        this.database = new PatientDataBase_1.PatientDataBase();
    }
    // public constructor(){
    //     this.PatientBusiness();
    // }
    // public PatientBusiness(){
    //     this.database = new PatientDataBase();
    // }
    add(patient) {
        this.database.add(patient);
    }
    change(patient) {
        this.database.change(patient);
    }
    delete(patient) {
        this.database.delete(patient);
    }
    search(CPF) {
        let patient = new Patient_1.Patient();
        patient.setCpf(CPF);
        let patients = this.database.showAll();
        patients.forEach((pat) => {
            if (pat == patient) {
                return pat;
            }
        });
        return null;
    }
    appointment(name, dateOfBirth) {
        let patients = this.database.showAll();
        let selectedPatients = new Array();
        patients.forEach((pat) => {
            if (pat.getName().includes(name) && pat.getDateOfBirth() == dateOfBirth) {
                selectedPatients.push(pat);
            }
        });
        return selectedPatients;
    }
    showAll() {
        return this.database.showAll();
    }
}
exports.PatientBusiness = PatientBusiness;
// export default new PatientBusiness();
// module.exports = new PatientBusiness();
