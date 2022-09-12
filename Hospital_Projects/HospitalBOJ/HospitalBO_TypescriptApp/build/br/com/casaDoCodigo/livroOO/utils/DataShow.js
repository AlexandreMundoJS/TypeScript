"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataShow = void 0;
class DataShow {
    DataShow() { }
    showPatient(patient) {
        // console.log(patient.getAddress())
        // console.log({
        //   // patient: patient.toString(),
        //   // address: patient.getAddress(),
        // })
        return {
            patient: patient.getName(),
            address: patient.getAddress(),
        };
    }
    showPatients(patients) {
        // console.log("PACIENTES", patients);
        // let patientsArray: Array<Patient> = new Array();
        // patients.forEach((patient: Patient) => {
        // });
        // return {
        //   Patients: patientsArray,
        // };
    }
    showDoctor(doctor) {
        return {
            Doctor: doctor.toString(),
            Address: doctor.getAddress(),
        };
    }
    showDoctors(doctors) {
        doctors.forEach((doctor) => {
            return {
                Doctor: doctor,
            };
        });
    }
    showAppointment(appointment) {
        let formater = new Date();
        formater = `${formater.getMonth() > 8
            ? +formater.getMonth() + 1
            : "0" + formater.getMonth() + 1}/${formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()}/${formater.getFullYear()}`;
        return {
            Appointment: {
                Patient: appointment.getPatient(),
                Doctor: appointment.getDoctor(),
                Date: formater,
                Code: appointment.getCode(),
            },
        };
    }
    showAppointments(appointmentsList) {
        let formater = new Date();
        formater = `${formater.getMonth() > 8
            ? +formater.getMonth() + 1
            : "0" + formater.getMonth() + 1}/${formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()}/${formater.getFullYear()}`;
        appointmentsList.forEach((appointment) => {
            return {
                Appointment: {
                    Patient: appointment.getPatient(),
                    Doctor: appointment.getDoctor(),
                    Date: formater,
                    Code: appointment.getCode(),
                },
            };
        });
    }
    showPharyngoplasty(pharyngoplasty) {
        let formater = new Date();
        formater = `${formater.getMonth() > 8
            ? +formater.getMonth() + 1
            : "0" + formater.getMonth() + 1}/${formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()}/${formater.getFullYear()}`;
        return {
            Pharyngoplasty: {
                Patient: pharyngoplasty.getPatient(),
                Doctor: pharyngoplasty.getDoctors(),
                Date: formater,
                Code: pharyngoplasty.getCode(),
            },
        };
    }
    showNeurosurgery(neurosurgery) {
        let formater = new Date();
        formater = `${formater.getMonth() > 8
            ? +formater.getMonth() + 1
            : "0" + formater.getMonth() + 1}/${formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()}/${formater.getFullYear()}`;
        return {
            Neurosurgery: {
                Patient: neurosurgery.getPatient(),
                Doctor: neurosurgery.getDoctors(),
                Date: formater,
                Code: neurosurgery.getCode(),
            },
        };
    }
    showProcedures(procedures) {
        let formater = new Date();
        formater = `${formater.getMonth() > 8
            ? +formater.getMonth() + 1
            : "0" + formater.getMonth() + 1}/${formater.getDate() > 9 ? formater.getDate() : "0" + formater.getDate()}/${formater.getFullYear()}`;
        procedures.forEach((procedure) => {
            return {
                Procedure: {
                    Patient: procedure.getPatient(),
                    Doctors: procedure.getDoctors(),
                    Date: formater,
                    Code: procedure.getCode(),
                },
            };
        });
    }
}
exports.DataShow = DataShow;
