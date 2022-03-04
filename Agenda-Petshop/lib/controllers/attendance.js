"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendances_1 = __importDefault(require("../models/attendances"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.post("/addAttendance", (req, res) => {
    //   console.log(req)
    attendances_1.default.add(req.body, res);
});
routes.get("/getAttendances", (req, res) => {
    attendances_1.default.list(res);
});
exports.default = routes;
