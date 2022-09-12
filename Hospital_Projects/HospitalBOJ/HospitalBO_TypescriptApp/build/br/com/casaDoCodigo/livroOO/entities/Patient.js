"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const Person_1 = require("./Person");
class Patient extends Person_1.Person {
    Patient() { }
    getCpf() {
        return this.cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getPlan() {
        return this.plan;
    }
    setPlan(plan) {
        this.plan = plan;
    }
}
exports.Patient = Patient;
