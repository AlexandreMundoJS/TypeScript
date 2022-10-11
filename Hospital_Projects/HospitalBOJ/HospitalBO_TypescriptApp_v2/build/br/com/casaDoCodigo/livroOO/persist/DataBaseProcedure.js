"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseProcedure = void 0;
class DataBaseProcedure {
    DataBaseProcedure() {
        this.procedures = new Array();
    }
    add(procedure) {
        if (!this.procedures.includes(procedure)) {
            this.procedures.push(procedure);
            procedure.setCode(this.procedures.length);
        }
    }
    delete(procedure) {
        console.log("DELETE PROCEDURE: ", procedure);
        this.procedures = this.procedures.filter((el) => {
            return el.getCode() !== procedure.getCode();
        });
    }
    showAll() {
        return this.procedures;
    }
}
exports.DataBaseProcedure = DataBaseProcedure;
