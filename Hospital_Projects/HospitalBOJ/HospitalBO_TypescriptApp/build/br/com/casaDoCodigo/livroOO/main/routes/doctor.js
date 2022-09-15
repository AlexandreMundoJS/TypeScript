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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const DoctorBusiness_1 = require("../../business/DoctorBusiness");
const Doctor_1 = require("../../entities/Doctor");
const AddressConversor_1 = require("../../utils/AddressConversor");
const DateConversor_1 = require("../../utils/DateConversor");
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
class DoctorRouter {
    constructor() {
        this.doctorBusiness = new DoctorBusiness_1.DoctorBusiness();
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
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doctorArray = req.body.doctors;
                let doctorsList = new Array();
                doctorArray.forEach((doctor) => __awaiter(this, void 0, void 0, function* () {
                    let newDoctor = new Doctor_1.Doctor();
                    newDoctor.setName(doctor.name);
                    newDoctor.setCrm(doctor.crm);
                    newDoctor.setAddress(new AddressConversor_1.AddressConversor().convertAddress(doctor.address));
                    newDoctor.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(doctor.dateOfBirth));
                    newDoctor.setSpecialties(doctor.specialties);
                    newDoctor.setHourValue(doctor.hourValue);
                    let allDoctors = yield this.db.getData("/doctors");
                    let canAdd = true;
                    allDoctors.forEach((doctor) => {
                        if (doctor.id == newDoctor.getCrm()) {
                            canAdd = false;
                        }
                    });
                    if (canAdd) {
                        doctorsList.push(newDoctor);
                        yield this.db.push("/doctors[]", { id: `${newDoctor.getCrm()}`, doctor: newDoctor });
                    }
                    res.status(200).json({
                        message: "Doctors added"
                    });
                }));
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
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doctor = new Doctor_1.Doctor();
                doctor.setCrm(req.body.doctor.crm);
                doctor.setName(req.body.doctor.name);
                doctor.setAddress(new AddressConversor_1.AddressConversor().convertAddress(req.body.doctor.address));
                doctor.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(req.body.doctor.dateOfBirth));
                doctor.setSpecialties(req.body.doctor.specialties);
                doctor.setHourValue(req.body.hourValue);
                let content = JSON.parse(fs_1.default.readFileSync('hospitalDataBase.json', 'utf-8'));
                content.doctors.forEach((oldDoctor) => {
                    if (oldDoctor.id == doctor.getCrm()) {
                        oldDoctor.doctor = doctor;
                    }
                });
                fs_1.default.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
                yield this.db.reload();
                res.status(200).json({
                    message: "doctor address updated",
                    doctor: doctor,
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
    showDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query.id;
            let showDoctor = false;
            let doctorData;
            const doctorsArray = yield this.db.getData("/doctors");
            doctorsArray.forEach((doctor) => __awaiter(this, void 0, void 0, function* () {
                if (doctor.id === query) {
                    showDoctor = true;
                    doctorData = doctor;
                }
            }));
            if (showDoctor) {
                res.status(200).json(doctorData);
            }
            else {
                res.status(500).json("Error: Doctor not found");
            }
        });
    }
    showDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doctors = yield this.db.getData("/doctors");
                res.status(200).json({ doctors: doctors });
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
        this.showDoctor = this.showDoctor.bind(this);
        this.showDoctors = this.showDoctors.bind(this);
        this.createDoctor = this.createDoctor.bind(this);
        this.updateDoctor = this.updateDoctor.bind(this);
    }
    init() {
        this.bindThis();
        this.router.get("/testDoctorRouter", this.testRoute);
        this.router.get("/getDoctor", this.showDoctor);
        this.router.get("/getDoctors", this.showDoctors);
        this.router.post("/createDoctor", this.createDoctor);
        this.router.put("/updateDoctor", this.updateDoctor);
    }
}
exports.DoctorRouter = DoctorRouter;
const doctorRouter = new DoctorRouter();
doctorRouter.init();
exports.default = doctorRouter.router;
