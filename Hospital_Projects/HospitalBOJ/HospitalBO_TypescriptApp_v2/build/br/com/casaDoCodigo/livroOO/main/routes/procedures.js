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
exports.ProcedureRouter = void 0;
const express_1 = require("express");
const node_json_db_1 = require("node-json-db");
const ProcedureBusiness_1 = require("../../business/ProcedureBusiness");
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
                new ProcedureBusiness_1.ProcedureBusiness().add(req.body.procedure, req, res);
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
                new ProcedureBusiness_1.ProcedureBusiness().update(req.body, req.params.id);
                res.status(200).json({
                    message: "Procedure updated",
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
            try {
                res.status(200).json(yield new ProcedureBusiness_1.ProcedureBusiness().show(req.params.id));
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
    showProcedures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield new ProcedureBusiness_1.ProcedureBusiness().showAll());
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
        this.router.get("/getProcedure/:id", this.showProcedure);
        this.router.get("/getProcedures", this.showProcedures);
        this.router.post("/createProcedure", this.createProcedure);
        this.router.put("/updateProcedure/:id", this.updateProcedure);
    }
}
exports.ProcedureRouter = ProcedureRouter;
const procedureRouter = new ProcedureRouter();
procedureRouter.init();
exports.default = procedureRouter.router;
