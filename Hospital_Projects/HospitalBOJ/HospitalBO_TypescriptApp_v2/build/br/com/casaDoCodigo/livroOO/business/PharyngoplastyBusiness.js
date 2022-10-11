"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharyngoplastyBusiness = void 0;
const Pharyngoplasty_1 = require("../entities/Pharyngoplasty");
const ProcedureBusiness_1 = require("./ProcedureBusiness");
class PharyngoplastyBusiness extends ProcedureBusiness_1.ProcedureBusiness {
    register(doctors, patient, date) {
        let pharyngoplasty = new Pharyngoplasty_1.Pharyngoplasty();
        pharyngoplasty.setPatient(patient);
        pharyngoplasty.setDoctors(doctors);
        pharyngoplasty.setDate(date);
        this.getDataBase().add(pharyngoplasty);
    }
    search(code) {
        let procedures = this.getDataBase().showAll();
        procedures.forEach((procedure) => {
            if (procedure.getCode() == code) {
                return procedure;
            }
        });
        return null;
    }
    searchDoctor(doctor) {
        let procedures = this.getDataBase().showAll();
        let doctorProcedures = new Array();
        procedures.forEach((procedure) => {
            if (procedure.getDoctors().includes(doctor) && procedure instanceof Pharyngoplasty_1.Pharyngoplasty) {
                doctorProcedures.push(procedure);
            }
        });
        return doctorProcedures;
    }
    showAll() {
        let procedures = this.getDataBase().showAll();
        let pharyngoplasties = new Array();
        procedures.forEach((procedure) => {
            if (procedure instanceof Pharyngoplasty_1.Pharyngoplasty) {
                pharyngoplasties.push(procedure);
            }
        });
        return pharyngoplasties;
    }
    calculateTotal(procedure) {
        let customerValue = procedure.getPatient().getPlan().getMonthlyPayment() * 0.25;
        let totalDoctors = 0.0;
        procedure.getDoctors().forEach((doctor) => {
            totalDoctors += doctor.getHourValue();
        });
        return customerValue + procedure.getValue() + totalDoctors;
    }
}
exports.PharyngoplastyBusiness = PharyngoplastyBusiness;
