"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorDataBase = void 0;
class DoctorDataBase {
    DoctorDataBase() {
        this.doctors = new Array();
    }
    add(doctor) {
        if (!this.doctors.includes(doctor)) {
            this.doctors.push(doctor);
        }
    }
    change(doctor) {
        let position = this.doctors.indexOf(doctor);
        for (let i = 0; i < this.doctors.length; i++) {
            if (i == position) {
                this.doctors[i] = doctor;
            }
        }
    }
    delete(doctor) {
        let position = this.doctors.indexOf(doctor);
        if (position > -1) {
            this.doctors.splice(position, 1);
        }
    }
    showAll() {
        return this.doctors;
    }
}
exports.DoctorDataBase = DoctorDataBase;
