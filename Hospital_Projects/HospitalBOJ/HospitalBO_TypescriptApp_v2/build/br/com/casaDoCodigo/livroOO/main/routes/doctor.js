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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const DoctorBusiness_1 = require("../../business/DoctorBusiness");
class DoctorRouter {
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
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let doctorArray = req.body.doctors;
            doctorArray.forEach((doctor) => {
                new DoctorBusiness_1.DoctorBusiness().add(doctor, req, res);
            });
        });
    }
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            new DoctorBusiness_1.DoctorBusiness().update(req.body, req.params.id);
            try {
                res.status(200).json("Doctor updated");
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
            try {
                res.status(200).json(yield new DoctorBusiness_1.DoctorBusiness().show(req.params.id));
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
    showDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield new DoctorBusiness_1.DoctorBusiness().showAll());
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
        this.router.get("/getDoctor/:id", this.showDoctor);
        this.router.get("/getDoctors", this.showDoctors);
        this.router.post("/createDoctor", this.createDoctor);
        this.router.put("/updateDoctor/:id", this.updateDoctor);
    }
}
exports.DoctorRouter = DoctorRouter;
const doctorRouter = new DoctorRouter();
doctorRouter.init();
exports.default = doctorRouter.router;
