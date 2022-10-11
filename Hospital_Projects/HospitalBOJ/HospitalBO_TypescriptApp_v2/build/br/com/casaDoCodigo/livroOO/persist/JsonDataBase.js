"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONDatabaseConnect = void 0;
const node_json_db_1 = require("node-json-db");
class JSONDatabaseConnect {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
    }
}
exports.JSONDatabaseConnect = JSONDatabaseConnect;
