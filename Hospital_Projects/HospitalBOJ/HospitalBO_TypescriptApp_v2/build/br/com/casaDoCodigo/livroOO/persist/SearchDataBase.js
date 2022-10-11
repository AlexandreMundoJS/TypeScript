"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDataBase = void 0;
class SearchDataBase {
    SearchDataBase() {
        this.appointments = new Array();
    }
    add(appointment) {
        if (!this.appointments.includes(appointment)) {
            this.appointments.push(appointment);
            appointment.setCode(this.appointments.length);
        }
    }
    delete(appointment) {
        this.appointments = this.appointments.filter((el) => {
            return el.getCode() !== appointment.getCode();
        });
    }
    showAll() {
        return this.appointments;
    }
}
exports.SearchDataBase = SearchDataBase;
