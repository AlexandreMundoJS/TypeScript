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
const express_1 = require("express");
const node_json_db_1 = require("node-json-db");
const AppointmentBusiness_1 = require("../../business/AppointmentBusiness");
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
                new AppointmentBusiness_1.AppointmentBusiness().add(req.body.appointment, req, res);
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
            try {
                res.status(200).json(yield new AppointmentBusiness_1.AppointmentBusiness().show(req.params.id));
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
        this.router.get("/getAppointment/:id", this.showAppointment);
        this.router.get("/getAppointments", this.showAppointments);
        this.router.post("/createAppointment", this.createAppointment);
    }
}
exports.AppointmentRouter = AppointmentRouter;
const appointmentRouter = new AppointmentRouter();
appointmentRouter.init();
exports.default = appointmentRouter.router;
