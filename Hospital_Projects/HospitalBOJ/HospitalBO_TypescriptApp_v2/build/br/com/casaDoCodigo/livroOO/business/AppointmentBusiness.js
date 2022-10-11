"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBusiness = void 0;
const serialize_1 = require("../utils/serialize/serialize");
const Appointment_1 = require("../entities/Appointment");
const DateConversor_1 = require("../utils/DateConversor");
const AppointmentsDataBase_1 = require("../persist/AppointmentsDataBase");
class AppointmentBusiness {
    constructor() {
        this.db = new AppointmentsDataBase_1.AppointmentDataBase();
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.showAll();
            }
            catch (error) {
                return error;
            }
        });
    }
    show(query) {
        return __awaiter(this, void 0, void 0, function* () {
            //   const appointmentsArray = await this.db.getData("/appointments");
            //   appointmentsArray.forEach(async (appointment: { code: any }) => {
            //     if (appointment.code == query) {
            //       return appointment;
            //     }
            //   });
        });
    }
    add(appointment, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serializedAppointment = new serialize_1.Serialize().serializeAppointment(appointment);
                if (serializedAppointment.length == 0) {
                    const { patient, doctor, date } = appointment;
                    const newAppointment = new Appointment_1.Appointment();
                    newAppointment.setPatient(patient);
                    newAppointment.setDoctor(doctor);
                    newAppointment.setDate(new DateConversor_1.DateConversor().dateConverter(date));
                    this.db.add(newAppointment);
                }
                else {
                    res.status(400).json({
                        message: "Missing required fields",
                        fields: serializedAppointment,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "Unexpected Error",
                });
            }
        });
    }
    update(data, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.AppointmentBusiness = AppointmentBusiness;
