"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBusiness = void 0;
const Appointment_1 = require("../entities/Appointment");
const SearchDataBase_1 = require("../persist/SearchDataBase");
class SearchBusiness {
    SearchBusiness() {
        this.database = new SearchDataBase_1.SearchDataBase();
    }
    addAppointment(patient, doctor, date) {
        let appointment = new Appointment_1.Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setDate(date);
        this.database.add(appointment);
    }
    cancelAppointment(appointment) {
        this.database.delete(appointment);
    }
    search(code) {
        let searches = this.database.showAll();
        searches.forEach((appointment) => {
            if (appointment.getCode() == code) {
                return appointment;
            }
        });
        return null;
    }
    patientSearch(patient) {
        let appointments = this.database.showAll();
        let patientAppointments = new Array();
        appointments.forEach((appointment) => {
            if (appointment.getPatient() === patient) {
                patientAppointments.push(appointment);
            }
        });
        return patientAppointments;
    }
    showAll() {
        return this.database.showAll();
    }
}
exports.SearchBusiness = SearchBusiness;
