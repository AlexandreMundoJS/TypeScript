"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuroSurgeryBusiness = void 0;
const Neurosurgery_1 = require("../entities/Neurosurgery");
const ProcedureBusiness_1 = require("./ProcedureBusiness");
class NeuroSurgeryBusiness extends ProcedureBusiness_1.ProcedureBusiness {
    register(doctors, patient, date) {
        let neuroSurgery = new Neurosurgery_1.Neurosurgery();
        neuroSurgery.setPatient(patient);
        neuroSurgery.setDoctors(doctors);
        neuroSurgery.setDate(date);
        this.getDataBase().add(neuroSurgery);
    }
    verifyData(code) {
        let procedures = this.getDataBase().showAll();
        procedures.forEach((procedure) => {
            if (procedure.getCode() == code) {
                return procedure;
            }
        });
        return null;
    }
    doctorSearch(doctor) {
        let procedures = this.getDataBase().showAll();
        let doctorProcedures = new Array();
        procedures.forEach((procedure) => {
            if (procedure.getDoctors().includes(doctor) && procedure instanceof Neurosurgery_1.Neurosurgery) {
                doctorProcedures.push(procedure);
            }
        });
        return doctorProcedures;
    }
    showAll() {
        let procedures = this.getDataBase().showAll();
        let neurosurgeries = new Array();
        procedures.forEach((procedure) => {
            if (procedure instanceof Neurosurgery_1.Neurosurgery) {
                neurosurgeries.push(procedure);
            }
        });
        return neurosurgeries;
    }
    calculateTotal(procedure) {
        let totalDoctors = 0.0;
        procedure.getDoctors().forEach((doctor) => {
            totalDoctors += doctor.getHourValue();
        });
        return procedure.getValue() + totalDoctors;
    }
}
exports.NeuroSurgeryBusiness = NeuroSurgeryBusiness;
