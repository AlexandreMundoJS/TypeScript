"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Procedure = void 0;
class Procedure {
    constructor(code, patient, doctors, date, room, value, durationTime) {
        this.code = code;
        this.patient = patient;
        this.doctors = doctors;
        this.date = date;
        this.room = room;
        this.value = value;
        this.durationTime = durationTime;
    }
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
    getDoctors() {
        return this.doctors;
    }
    setDoctors(doctors) {
        this.doctors = doctors;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    getRoom() {
        return this.room;
    }
    setRoom(room) {
        this.room = room;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getDurationTime() {
        return this.durationTime;
    }
    setDurationTime(durationTime) {
        this.durationTime = durationTime;
    }
}
exports.Procedure = Procedure;
