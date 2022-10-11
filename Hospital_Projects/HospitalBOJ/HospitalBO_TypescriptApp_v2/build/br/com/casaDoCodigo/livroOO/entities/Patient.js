"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const Person_1 = require("./Person");
class Patient extends Person_1.Person {
    constructor(cpf) {
        super();
        this.cpf = cpf;
        this.appointments = [];
    }
    getCpf() {
        return this.cpf;
    }
    // public setCpf(cpf: string): void {
    //   this.cpf = cpf;
    // }
    getPlan() {
        return this.plan;
    }
    setPlan(plan) {
        this.plan = plan;
    }
    getAppointments() {
        return [...this.appointments];
    }
}
exports.Patient = Patient;
