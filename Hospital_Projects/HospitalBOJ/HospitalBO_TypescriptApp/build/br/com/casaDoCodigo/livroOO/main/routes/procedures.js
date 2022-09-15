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
exports.ProcedureRouter = void 0;
const Procedure_1 = require("../../entities/Procedure");
const express_1 = require("express");
const node_json_db_1 = require("node-json-db");
const DateConversor_1 = require("../../utils/DateConversor");
const fs_1 = __importDefault(require("fs"));
class ProcedureRouter {
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
    createProcedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let procedure = new Procedure_1.Procedure();
                let allProcedures = yield this.db.getData("/procedures");
                let canAdd = true;
                procedure.setCode(allProcedures.length + 1);
                procedure.setPatient(req.body.procedure.patient);
                procedure.setDoctors(req.body.procedure.doctors);
                procedure.setDate(new DateConversor_1.DateConversor().dateConverter(req.body.procedure.date));
                procedure.setRoom(req.body.procedure.room);
                procedure.setValue(req.body.procedure.value);
                procedure.setDurationTime(req.body.procedure.durationTime);
                allProcedures.forEach((procedureElement) => {
                    if (procedureElement.code == procedure.getCode()) {
                        canAdd = false;
                    }
                });
                if (canAdd) {
                    yield this.db.push("/procedures[]", procedure, true);
                    res.status(200).json({
                        message: "Procedure added",
                    });
                }
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
    updateProcedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let procedure = new Procedure_1.Procedure();
                procedure.setCode(req.body.procedure.code);
                procedure.setPatient(req.body.procedure.patient);
                procedure.setDoctors(req.body.procedure.doctors);
                procedure.setDate(new DateConversor_1.DateConversor().dateConverter(req.body.procedure.date));
                procedure.setRoom(req.body.procedure.room);
                procedure.setValue(req.body.procedure.value);
                procedure.setDurationTime(req.body.procedure.durationTime);
                let content = JSON.parse(fs_1.default.readFileSync('hospitalDataBase.json', 'utf-8'));
                content.procedures.forEach((oldProcedure) => __awaiter(this, void 0, void 0, function* () {
                    if (oldProcedure.code == procedure.getCode()) {
                        content.procedures[oldProcedure.code - 1] = procedure;
                    }
                }));
                fs_1.default.writeFileSync('hospitalDataBase.json', JSON.stringify(content));
                yield this.db.reload();
                res.status(200).json({
                    message: "Procedure updated",
                    procedure: procedure,
                });
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
    showProcedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query.code;
            let showProcedure = false;
            let procedureData;
            const proceduresArray = yield this.db.getData("/procedures");
            proceduresArray.forEach((procedure) => __awaiter(this, void 0, void 0, function* () {
                if (procedure.code == query) {
                    showProcedure = true;
                    procedureData = procedure;
                }
            }));
            if (showProcedure) {
                res.status(200).json(procedureData);
            }
            else {
                res.status(500).json("Error: Procedure not found");
            }
        });
    }
    showProcedures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let procedures = yield this.db.getData("/procedures");
                res.status(200).json({ procedures: procedures });
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
        this.showProcedure = this.showProcedure.bind(this);
        this.showProcedures = this.showProcedures.bind(this);
        this.createProcedure = this.createProcedure.bind(this);
        this.updateProcedure = this.updateProcedure.bind(this);
    }
    init() {
        this.bindThis();
        this.router.get("/testProcedureRouter", this.testRoute);
        this.router.get("/getProcedure", this.showProcedure);
        this.router.get("/getProcedures", this.showProcedures);
        this.router.post("/createProcedure", this.createProcedure);
        this.router.put("/updateProcedure", this.updateProcedure);
    }
}
exports.ProcedureRouter = ProcedureRouter;
const procedureRouter = new ProcedureRouter();
procedureRouter.init();
exports.default = procedureRouter.router;
