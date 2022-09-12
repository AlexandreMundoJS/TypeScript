"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = void 0;
const express_1 = require("express");
const PatientBusiness_1 = require("../../business/PatientBusiness");
const Patient_1 = require("../../entities/Patient");
const Plan_1 = require("../../entities/Plan");
const AddressConversor_1 = require("../../utils/AddressConversor");
const DataShow_1 = require("../../utils/DataShow");
const DateConversor_1 = require("../../utils/DateConversor");
// let patientBusiness = PatientBusiness;
class PatientRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.patientBusiness = new PatientBusiness_1.PatientBusiness();
    }
    testRoute(req, res) {
        try {
            res.status(200).json("Test route working");
        }
        catch (err) {
            res.status(500).json(`Error on test route ${err}`);
        }
    }
    createPatient(req, res) {
        try {
            let patientArray = req.body.patients;
            let patientsArray = new Array();
            patientArray.forEach((patient) => {
                let newPatient = new Patient_1.Patient();
                newPatient.setCpf(patient.cpf);
                newPatient.setName(patient.name);
                newPatient.setAddress(new AddressConversor_1.AddressConversor().convertAddress(patient.address));
                newPatient.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(patient.dateOfBirth));
                let plan = new Plan_1.Plan();
                plan.setName(patient.plan.planName);
                plan.setMonthlyPayment(patient.plan.monthlyPayment);
                newPatient.setPlan(plan);
                patientsArray.push(newPatient);
                this.patientBusiness.add(newPatient);
            });
            res.status(200).json({
                message: "Patient added",
                patients: patientsArray,
            });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: [
                    {
                        error: `Error in request ${err}`,
                    },
                ],
            });
        }
    }
    changePatientAddress(req, res) {
        try {
            let patient = new Patient_1.Patient();
            patient.setCpf(req.body.patient.cpf);
            patient.setAddress(new AddressConversor_1.AddressConversor().convertAddress(req.body.patient.address));
            res.status(200).json({
                message: "Patient address updated",
                patient: {
                    name: patient.getName(),
                    cpf: patient.getCpf(),
                    address: patient.getAddress(),
                    dateOfBirth: patient.getDateOfBirth(),
                    plan: patient.getPlan(),
                },
            });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: [
                    {
                        error: `Error in request ${err}`,
                    },
                ],
            });
        }
    }
    showPatient(req, res) {
        try {
            let query = req.query.patient;
            if (query) {
                let patient = new DataShow_1.DataShow().showPatient(query);
                res.status(200).json(patient);
            }
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: [
                    {
                        error: `Error in request ${err}`,
                    },
                ],
            });
        }
    }
    showPatients(req, res) {
        try {
            let patients = this.patientBusiness.showAll();
            res.status(200).json({ patients: patients });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: [
                    {
                        error: `Error in request ${err}`,
                    },
                ],
            });
        }
    }
    init() {
        this.router.get("/testPatientRouter", this.testRoute);
        this.router.get("/getPatient", this.showPatient);
        this.router.get("/getPatients", this.showPatients);
        this.router.post("/createPatient", this.createPatient);
        this.router.put("/changePatientAddress", this.changePatientAddress);
    }
}
exports.PatientRouter = PatientRouter;
const patientRouter = new PatientRouter();
patientRouter.init();
exports.default = patientRouter.router;
