"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const CPF_1 = require("../Models/CPF");
class Validate {
    validCpf(cpf) {
        let cpfValue = new CPF_1.Cpf(cpf);
        let sum, rest;
        sum = 0;
        if (cpfValue._value == "00000000000" ||
            cpfValue._value == "11111111111" ||
            cpfValue._value == "22222222222" ||
            cpfValue._value == "33333333333" ||
            cpfValue._value == "44444444444" ||
            cpfValue._value == "55555555555" ||
            cpfValue._value == "66666666666" ||
            cpfValue._value == "77777777777" ||
            cpfValue._value == "88888888888" ||
            cpfValue._value == "99999999999") {
            return false;
        }
        else {
            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(cpfValue._value.substring(i - 1, i)) * (11 - i);
            }
            rest = (sum * 10) % 11;
            if (rest == 10 || rest == 11) {
                rest = 0;
            }
            if (rest != parseInt(cpfValue._value.substring(9, 10))) {
                console.log("FALSE");
                return false;
            }
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cpfValue._value.substring(i - 1, i)) * (12 - i);
            }
            rest = (sum * 10) % 11;
            if ((rest == 10) || (rest == 11)) {
                rest = 0;
            }
            if (rest != parseInt(cpfValue._value.substring(10, 11))) {
                console.log("FALSE");
                return false;
            }
            console.log("TRUE");
            return true;
        }
    }
}
exports.Validate = Validate;
