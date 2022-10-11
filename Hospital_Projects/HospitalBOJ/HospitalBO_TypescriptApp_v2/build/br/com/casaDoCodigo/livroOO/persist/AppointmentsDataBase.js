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
exports.AppointmentDataBase = void 0;
const JsonDataBase_1 = require("./JsonDataBase");
class AppointmentDataBase {
    constructor() {
        this.db = new JsonDataBase_1.JSONDatabaseConnect();
    }
    add(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.db);
            const allAppointments = yield this.db.getData("/appointments");
            if (!allAppointments.some((appointmentElement) => appointmentElement.getCode() === appointment.getCode())) {
                appointment.setCode(allAppointments.length + 1);
                yield this.db.push("/appointments[]", appointment, true);
            }
            else {
                throw new Error("Not possible to add Appointment to database");
            }
        });
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.db);
            return yield this.db.getData("/appointments");
        });
    }
}
exports.AppointmentDataBase = AppointmentDataBase;
