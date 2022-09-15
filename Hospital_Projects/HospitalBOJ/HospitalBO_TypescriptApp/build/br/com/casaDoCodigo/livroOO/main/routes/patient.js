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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = void 0;
const express_1 = require("express");
const PatientBusiness_1 = require("../../business/PatientBusiness");
const Patient_1 = require("../../entities/Patient");
const Plan_1 = require("../../entities/Plan");
const AddressConversor_1 = require("../../utils/AddressConversor");
const DateConversor_1 = require("../../utils/DateConversor");
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
class PatientRouter {
    constructor() {
        this.patientBusiness = new PatientBusiness_1.PatientBusiness();
        this.router = (0, express_1.Router)();
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patientArray = req.body.patients;
                let patientsArray = new Array();
                patientArray.forEach((patient) => __awaiter(this, void 0, void 0, function* () {
                    let newPatient = new Patient_1.Patient();
                    newPatient.setCpf(patient.cpf);
                    newPatient.setName(patient.name);
                    newPatient.setAddress(new AddressConversor_1.AddressConversor().convertAddress(patient.address));
                    newPatient.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(patient.dateOfBirth));
                    let plan = new Plan_1.Plan();
                    plan.setName(patient.plan.planName);
                    plan.setMonthlyPayment(patient.plan.monthlyPayment);
                    newPatient.setPlan(plan);
                    let allPatients = yield this.db.getData("/patients");
                    let canAdd = true;
                    allPatients.forEach((patient) => {
                        if (patient.id == newPatient.getCpf()) {
                            canAdd = false;
                        }
                    });
                    if (canAdd) {
                        patientsArray.push(newPatient);
                        yield this.db.push("/patients[]", { id: `${newPatient.getCpf()}`, patient: newPatient }, true);
                    }
                }));
                res.status(200).json({
                    message: "Patients added",
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
        });
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patient = new Patient_1.Patient();
                patient.setCpf(req.body.patient.cpf);
                patient.setName(req.body.patient.name);
                patient.setAddress(new AddressConversor_1.AddressConversor().convertAddress(req.body.patient.address));
                patient.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(req.body.patient.dateOfBirth));
                let plan = new Plan_1.Plan();
                plan.setName(req.body.patient.plan.planName);
                plan.setMonthlyPayment(req.body.patient.plan.monthlyPayment);
                patient.setPlan(plan);
                let content = JSON.parse(fs_1.default.readFileSync('hospitalDataBase.json', 'utf-8'));
                content.patients.forEach((oldPatient) => {
                    if (oldPatient.id == patient.getCpf()) {
                        oldPatient.patient = patient;
                    }
                });
                fs_1.default.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
                yield this.db.reload();
                res.status(200).json({
                    message: "Patient address updated",
                    patient: patient,
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
        });
    }
    showPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query.id;
            let showPatient = false;
            let patientData;
            const patientsArray = yield this.db.getData("/patients");
            patientsArray.forEach((patient) => __awaiter(this, void 0, void 0, function* () {
                if (patient.id === query) {
                    showPatient = true;
                    patientData = patient;
                }
            }));
            if (showPatient) {
                res.status(200).json(patientData);
            }
            else {
                res.status(500).json("Error: Patient not found");
            }
        });
    }
    showPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patients = yield this.db.getData("/patients");
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
        });
    }
    bindThis() {
        this.testRoute = this.testRoute.bind(this);
        this.showPatient = this.showPatient.bind(this);
        this.showPatients = this.showPatients.bind(this);
        this.createPatient = this.createPatient.bind(this);
        this.updatePatient = this.updatePatient.bind(this);
    }
    init() {
        this.bindThis();
        this.router.get("/testPatientRouter", this.testRoute);
        this.router.get("/getPatient", this.showPatient);
        this.router.get("/getPatients", this.showPatients);
        this.router.post("/createPatient", this.createPatient);
        this.router.put("/updatePatient", this.updatePatient);
    }
}
exports.PatientRouter = PatientRouter;
const patientRouter = new PatientRouter();
patientRouter.init();
exports.default = patientRouter.router;
