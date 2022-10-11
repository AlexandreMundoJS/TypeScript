"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("./routes/patient"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const procedures_1 = __importDefault(require("./routes/procedures"));
const appointments_1 = __importDefault(require("./routes/appointments"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            next();
        });
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.express.use('/v1/adminHospital/patients/', patient_1.default);
        this.express.use('/v1/adminHospital/doctors/', doctor_1.default);
        this.express.use('/v1/adminHospital/procedures/', procedures_1.default);
        this.express.use('/v1/adminHospital/appointments/', appointments_1.default);
    }
}
exports.default = App;
