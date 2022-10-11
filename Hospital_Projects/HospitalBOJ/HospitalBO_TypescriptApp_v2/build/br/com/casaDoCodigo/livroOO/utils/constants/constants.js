"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment = exports.procedure = exports.patient = exports.doctor = void 0;
const doctor = [
    "crm",
    "specialties",
    "hourValue",
    "name",
    "dateOfBirth",
    "address",
];
exports.doctor = doctor;
const patient = [
    "cpf",
    "name",
    "address",
    "dateOfBirth",
    { plan: ["planName", "monthlyPayment"] },
];
exports.patient = patient;
const procedure = [
    "code",
    "patient",
    "doctors",
    "date",
    "room",
    "value",
    "durationTime",
];
exports.procedure = procedure;
const appointment = [
    "code",
    "patient",
    "doctor",
    "date"
];
exports.appointment = appointment;
