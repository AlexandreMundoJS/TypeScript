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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedureBusiness = void 0;
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
const serialize_1 = require("../utils/serialize/serialize");
const Procedure_1 = require("../entities/Procedure");
const DateConversor_1 = require("../utils/DateConversor");
class ProcedureBusiness {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.getData("/procedures");
            }
            catch (error) {
                return error;
            }
        });
    }
    show(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const proceduresArray = yield this.db.getData("/procedures");
            let showProcedure = false;
            let procedureData;
            proceduresArray.forEach((procedure) => __awaiter(this, void 0, void 0, function* () {
                if (procedure.code == query) {
                    showProcedure = true;
                    procedureData = procedure;
                }
            }));
            if (procedureData) {
                return procedureData;
            }
        });
    }
    update(procedure, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = JSON.parse(fs_1.default.readFileSync("hospitalDataBase.json", "utf-8"));
            content.procedures.forEach((oldProcedure) => __awaiter(this, void 0, void 0, function* () {
                if (oldProcedure.code == code) {
                    for (let procedureProp in procedure) {
                        if (Object.keys(procedure).includes(procedureProp)) {
                            if (procedureProp == "date") {
                                oldProcedure.procedure[procedureProp] = new DateConversor_1.DateConversor().dateConverter(procedure[procedureProp]);
                            }
                            else {
                                oldProcedure.procedure[procedureProp] = procedure[procedureProp];
                            }
                        }
                    }
                }
            }));
            fs_1.default.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
            yield this.db.reload();
        });
    }
    add(procedure, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serializedProcedure = new serialize_1.Serialize().serializeProcedure(procedure);
                if (serializedProcedure.length == 0) {
                    const { code, patient, doctors, date, room, value, durationTime } = procedure;
                    const newProcedure = new Procedure_1.Procedure(code, patient, doctors, new DateConversor_1.DateConversor().dateConverter(date), room, value, durationTime);
                    let allProcedures = yield this.db.getData("/procedures");
                    let canAdd = true;
                    allProcedures.forEach((procedure) => __awaiter(this, void 0, void 0, function* () {
                        if (procedure.code == newProcedure.getCode()) {
                            canAdd = false;
                        }
                    }));
                    if (canAdd) {
                        yield this.db.push("/procedures[]", newProcedure, true);
                        res.status(200).json({
                            message: "Procedure Added",
                            procedure: newProcedure,
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "Existing procedure",
                        });
                    }
                }
                else {
                    res.status(400).json({
                        message: "Missing required fields",
                        fields: serializedProcedure,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "Unexpected Error",
                });
            }
        });
    }
}
exports.ProcedureBusiness = ProcedureBusiness;
