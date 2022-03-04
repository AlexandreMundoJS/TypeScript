"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const connection_1 = require("../infra/connection");
exports.default = new class Attendances {
    add(attendance, res) {
        const createdAt = (0, moment_1.default)().format("YYYY-MM-DD HH:MM:SS");
        console.log(createdAt);
        const date = (0, moment_1.default)(attendance.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
        console.log((0, moment_1.default)(attendance.data, "DD/MM/YYYY"));
        const validateDate = (0, moment_1.default)(date).isSameOrAfter(createdAt);
        const validateCustomer = attendance.cliente.length >= 5;
        const validateInformation = [
            {
                name: 'data',
                valid: validateDate,
                message: 'Date need to be greater than the actual date'
            },
            {
                name: 'customer',
                valid: validateCustomer,
                message: 'Customer name need to be greater than five characters'
            }
        ];
        const errors = validateInformation.filter(field => !field.valid);
        const errorsFinded = errors.length;
        if (errorsFinded) {
            res.status(400).json(errors);
        }
        else {
            const datedAttendance = Object.assign(Object.assign({}, attendance), { createdAt, date });
            const sql = 'INSERT INTO Atendimentos SET ?';
            connection_1.connection.query(sql, datedAttendance, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    res.status(201).json(attendance);
                }
            });
        }
    }
    list(res) {
        const sql = 'SELECT * FROM Atendimentos';
        connection_1.connection.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json(results);
            }
        });
    }
};
