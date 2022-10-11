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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const node_json_db_1 = require("node-json-db");
class HttpClient {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
    }
    show(query, endpoint) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const resultsArray = yield this.db.getData(endpoint);
            try {
                for (var resultsArray_1 = __asyncValues(resultsArray), resultsArray_1_1; resultsArray_1_1 = yield resultsArray_1.next(), !resultsArray_1_1.done;) {
                    const result = resultsArray_1_1.value;
                    if (result) {
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (resultsArray_1_1 && !resultsArray_1_1.done && (_a = resultsArray_1.return)) yield _a.call(resultsArray_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            throw new Error("Method not implemented.");
        });
    }
    showAll() {
        throw new Error("Method not implemented.");
    }
    add(data, req, res, endpoint) {
        throw new Error("Method not implemented.");
    }
    update(data, req, res, endpoint) {
        throw new Error("Method not implemented.");
    }
}
exports.HttpClient = HttpClient;
