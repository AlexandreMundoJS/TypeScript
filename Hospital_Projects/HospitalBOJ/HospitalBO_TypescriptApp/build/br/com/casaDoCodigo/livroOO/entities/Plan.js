"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
class Plan {
    Plan() {
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getMonthlyPayment() {
        return this.monthlyPayment;
    }
    setMonthlyPayment(monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
    }
}
exports.Plan = Plan;
