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
exports.AppointmentRouter = void 0;
const Appointment_1 = require("../../entities/Appointment");
const express_1 = require("express");
const node_json_db_1 = require("node-json-db");
const DateConversor_1 = require("../../utils/DateConversor");
class AppointmentRouter {
    constructor() {
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
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appointment = new Appointment_1.Appointment();
                let allAppointments = yield this.db.getData("/appointments");
                let canAdd = true;
                appointment.setCode(allAppointments.length + 1);
                appointment.setPatient(req.body.appointment.patient);
                appointment.setDoctor(req.body.appointment.doctor);
                appointment.setDate(new DateConversor_1.DateConversor().dateConverter(req.body.appointment.date));
                allAppointments.forEach((appointmentElement) => {
                    if (appointmentElement.code == appointment.getCode()) {
                        canAdd = false;
                    }
                });
                if (canAdd) {
                    yield this.db.push("/appointments[]", appointment, true);
                    res.status(200).json({
                        message: "appointment added",
                    });
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
        });
    }
    showAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query.code;
            let showAppointment = false;
            let appointmentData;
            const appointmentsArray = yield this.db.getData("/appointments");
            appointmentsArray.forEach((appointment) => __awaiter(this, void 0, void 0, function* () {
                if (appointment.code == query) {
                    showAppointment = true;
                    appointmentData = appointment;
                }
            }));
            if (showAppointment) {
                res.status(200).json(appointmentData);
            }
            else {
                res.status(500).json("Error: appointment not found");
            }
        });
    }
    showAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appointments = yield this.db.getData("/appointments");
                res.status(200).json({ appointments: appointments });
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
        this.showAppointment = this.showAppointment.bind(this);
        this.showAppointments = this.showAppointments.bind(this);
        this.createAppointment = this.createAppointment.bind(this);
    }
    init() {
        this.bindThis();
        this.router.get("/testAppointmentRouter", this.testRoute);
        this.router.get("/getAppointment", this.showAppointment);
        this.router.get("/getAppointments", this.showAppointments);
        this.router.post("/createAppointment", this.createAppointment);
    }
}
exports.AppointmentRouter = AppointmentRouter;
const appointmentRouter = new AppointmentRouter();
appointmentRouter.init();
exports.default = appointmentRouter.router;
