"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedureBusiness = void 0;
const DataBaseProcedure_1 = require("../persist/DataBaseProcedure");
class ProcedureBusiness {
    ProcedureBusiness() {
        this.dataBase = new DataBaseProcedure_1.DataBaseProcedure();
    }
    getDataBase() {
        return this.dataBase;
    }
    cancel(procedure) {
        this.dataBase.delete(procedure);
    }
}
exports.ProcedureBusiness = ProcedureBusiness;
