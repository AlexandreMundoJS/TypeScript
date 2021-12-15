"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const attendance_1 = __importDefault(require("./controllers/attendance"));
exports.default = new (class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    routes() {
        this.express.use("/testRoute", (req, res) => {
            res.status(200).send("MS FUNCIONAL");
        });
        this.express.use("/v1/", attendance_1.default);
    }
    middleware() {
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(body_parser_1.default.json());
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
})();
