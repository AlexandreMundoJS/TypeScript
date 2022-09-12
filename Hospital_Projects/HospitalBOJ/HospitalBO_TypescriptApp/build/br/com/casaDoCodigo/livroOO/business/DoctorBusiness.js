"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorBusiness = void 0;
const Doctor_1 = require("../entities/Doctor");
const DoctorDataBase_1 = require("../persist/DoctorDataBase");
class DoctorBusiness {
    DoctorBusiness() {
        this.dataBase = new DoctorDataBase_1.DoctorDataBase();
    }
    add(doctor) {
        this.dataBase.add(doctor);
    }
    change(doctor) {
        this.dataBase.change(doctor);
    }
    delete(doctor) {
        this.dataBase.delete(doctor);
    }
    search(CRM) {
        let doctor = new Doctor_1.Doctor();
        doctor.setCrm(CRM);
        let doctors = this.dataBase.showAll();
        doctors.forEach((doc) => {
            if (doc == doctor) {
                return doc;
            }
        });
        return null;
    }
    appointment(name) {
        let doctors = this.dataBase.showAll();
        let selectedDoctors = new Array();
        doctors.forEach((doc) => {
            if (doc.getName().includes(name)) {
                selectedDoctors.push(doc);
            }
        });
        return selectedDoctors;
    }
    showAll() {
        return this.dataBase.showAll();
    }
}
exports.DoctorBusiness = DoctorBusiness;
