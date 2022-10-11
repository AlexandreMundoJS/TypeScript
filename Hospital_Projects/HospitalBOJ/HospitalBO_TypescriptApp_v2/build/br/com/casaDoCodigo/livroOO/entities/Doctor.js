"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const Person_1 = require("./Person");
class Doctor extends Person_1.Person {
    getCrm() {
        return this.crm;
    }
    setCrm(crm) {
        this.crm = crm;
    }
    getSpecialties() {
        return this.specialties;
    }
    setSpecialties(specialties) {
        this.specialties = specialties;
    }
    getHourValue() {
        return this.hourValue;
    }
    setHourValue(hourValue) {
        this.hourValue = hourValue;
    }
}
exports.Doctor = Doctor;
