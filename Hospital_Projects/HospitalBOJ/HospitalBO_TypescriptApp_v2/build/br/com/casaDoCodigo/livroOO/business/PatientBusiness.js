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
exports.PatientBusiness = void 0;
const Patient_1 = require("../entities/Patient");
const Plan_1 = require("../entities/Plan");
const AddressConversor_1 = require("../utils/AddressConversor");
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
const serialize_1 = require("../utils/serialize/serialize");
class PatientBusiness {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
    }
    add(patient, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serializedPatient = new serialize_1.Serialize().serializePatient(patient);
                if (serializedPatient.length == 0) {
                    const { cpf, name, address, dateOfBirth, plan: { planName, monthlyPayment }, } = patient;
                    const newPatient = new Patient_1.Patient(cpf);
                    // newPatient.setCpf(cpf);
                    // newPatient.setPlan(plan)
                    // cpf,
                    // new Plan(planName, monthlyPayment),
                    // name,
                    // new DateConversor().dateConverter(dateOfBirth),
                    // new AddressConversor().convertAddress(address)
                    let allPatients = yield this.db.getData("/patients");
                    let canAdd = true;
                    allPatients.forEach((patient) => __awaiter(this, void 0, void 0, function* () {
                        if (patient.id == newPatient.getCpf()) {
                            canAdd = false;
                        }
                    }));
                    if (canAdd) {
                        yield this.db.push("/patients[]", { id: `${newPatient.getCpf()}`, patient: newPatient }, true);
                        res.status(200).json({
                            message: "Patient Added",
                            patient: newPatient,
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "Existing patient",
                        });
                    }
                }
                else {
                    res.status(400).json({
                        message: "Missing required fields",
                        fields: serializedPatient,
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
    show(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientsArray = yield this.db.getData("/patients");
            let showData = false;
            let patientData;
            patientsArray.forEach((patient) => __awaiter(this, void 0, void 0, function* () {
                if (patient.id == query) {
                    showData = true;
                    patientData = patient;
                }
            }));
            return patientData;
        });
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.getData("/patients");
            }
            catch (error) {
                return error;
            }
        });
    }
    update(patient, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = JSON.parse(fs_1.default.readFileSync("hospitalDataBase.json", "utf-8"));
            content.patients.forEach((oldPatient) => __awaiter(this, void 0, void 0, function* () {
                if (oldPatient.id == id) {
                    for (let patientProp in patient) {
                        if (Object.keys(oldPatient.patient).includes(patientProp)) {
                            if (patientProp == "address") {
                                oldPatient.patient[patientProp] =
                                    new AddressConversor_1.AddressConversor().convertAddress(patient[patientProp]);
                            }
                            else if (patientProp == "plan") {
                                oldPatient.patient[patientProp] = new Plan_1.Plan(patient[patientProp][0], patient[patientProp][1]);
                            }
                            else {
                                oldPatient.patient[patientProp] = patient[patientProp];
                            }
                        }
                    }
                }
            }));
            fs_1.default.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
            yield this.db.reload();
        });
    }
}
exports.PatientBusiness = PatientBusiness;
