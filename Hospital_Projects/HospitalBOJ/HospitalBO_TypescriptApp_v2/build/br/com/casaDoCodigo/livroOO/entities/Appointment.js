"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
class Appointment {
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    getPatient() {
        return this.patient;
    }
    setPatient(patient) {
        this.patient = patient;
    }
    getDoctor() {
        return this.doctor;
    }
    setDoctor(doctor) {
        this.doctor = doctor;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
}
exports.Appointment = Appointment;
