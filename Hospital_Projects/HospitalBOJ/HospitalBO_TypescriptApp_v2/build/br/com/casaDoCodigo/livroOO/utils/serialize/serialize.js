"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serialize = void 0;
const constants_1 = require("../constants/constants");
class Serialize {
    serializeDoctor(docParam) {
        let missingParams = [];
        constants_1.doctor.forEach((doctorKey) => {
            if (Object.keys(docParam).indexOf(doctorKey) < 0) {
                missingParams.push(doctorKey);
            }
        });
        return missingParams;
    }
    serializePatient(patientParam) {
        let missingParams = [];
        constants_1.patient.forEach((patientKey) => {
            if (typeof patientKey == "string") {
                if (Object.keys(patientParam).indexOf(patientKey) < 0) {
                    missingParams.push(patientKey);
                }
            }
            else {
                let objectProperties = Object.getOwnPropertyDescriptor(patientKey, Object.getOwnPropertyNames(patientKey)[0]);
                if (objectProperties) {
                    objectProperties.value.forEach((prop) => {
                        if (Object.keys(patientParam[Object.getOwnPropertyNames(patientKey)[0]]).indexOf(prop) < 0) {
                            missingParams.push(`${Object.getOwnPropertyNames(patientKey)[0]}.${prop}`);
                        }
                    });
                }
            }
        });
        return missingParams;
    }
    serializeProcedure(procedureParam) {
        let missingParams = [];
        constants_1.procedure.forEach((procedureKey) => {
            if (Object.keys(procedureParam).indexOf(procedureKey) < 0) {
                missingParams.push(procedureKey);
            }
        });
        return missingParams;
    }
    serializeAppointment(appointmentParam) {
        let missingParams = [];
        constants_1.appointment.forEach((appointmentKey) => {
            if (Object.keys(appointmentParam).indexOf(appointmentKey) < 0 && appointmentKey !== "code") {
                missingParams.push(appointmentKey);
            }
        });
        return missingParams;
    }
}
exports.Serialize = Serialize;
