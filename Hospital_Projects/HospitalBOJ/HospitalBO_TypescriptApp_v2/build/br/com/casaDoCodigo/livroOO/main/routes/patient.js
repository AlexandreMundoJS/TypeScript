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
exports.PatientRouter = void 0;
const express_1 = require("express");
const PatientBusiness_1 = require("../../business/PatientBusiness");
class PatientRouter {
    constructor() {
        this.router = (0, express_1.Router)();
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
            new PatientBusiness_1.PatientBusiness().add(req.body.patient, req, res);
        });
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                new PatientBusiness_1.PatientBusiness().update(req.body, req.params.id);
                res.status(200).json("Patient Updated");
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: [
                        {
                            error: `Error in request ${error}`,
                        },
                    ],
                });
            }
        });
    }
    showPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield new PatientBusiness_1.PatientBusiness().show(req.params.id));
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: [
                        {
                            error: `Error in request ${error}`,
                        },
                    ],
                });
            }
        });
    }
    showPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield new PatientBusiness_1.PatientBusiness().showAll());
            }
            catch (error) {
                res.status(200).json({
                    status: 500,
                    message: [
                        {
                            error: `Error in request ${error}`,
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
        this.router.get("/getPatient/:id", this.showPatient);
        this.router.get("/getPatients", this.showPatients);
        this.router.post("/createPatient", this.createPatient);
        this.router.put("/updatePatient/:id", this.updatePatient);
    }
}
exports.PatientRouter = PatientRouter;
const patientRouter = new PatientRouter();
patientRouter.init();
exports.default = patientRouter.router;
