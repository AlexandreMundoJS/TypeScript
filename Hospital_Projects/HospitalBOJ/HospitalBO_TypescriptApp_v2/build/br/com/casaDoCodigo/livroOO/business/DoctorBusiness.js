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
exports.DoctorBusiness = void 0;
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
const Doctor_1 = require("../entities/Doctor");
const DateConversor_1 = require("../utils/DateConversor");
const AddressConversor_1 = require("../utils/AddressConversor");
const serialize_1 = require("../utils/serialize/serialize");
class DoctorBusiness {
    constructor() {
        this.db = new node_json_db_1.JsonDB(new node_json_db_1.Config("hospitalDataBase", true, false, "/"));
    }
    add(doctor, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serializedDoctor = new serialize_1.Serialize().serializeDoctor(doctor);
                if (serializedDoctor.length == 0) {
                    const { crm, specialties, hourValue, name, dateOfBirth, address } = doctor;
                    const newDoctor = new Doctor_1.Doctor();
                    newDoctor.setCrm(crm);
                    newDoctor.setSpecialties(specialties);
                    newDoctor.setHourValue(hourValue);
                    newDoctor.setName(name);
                    newDoctor.setDateOfBirth(new DateConversor_1.DateConversor().dateConverter(dateOfBirth));
                    newDoctor.setAddress(new AddressConversor_1.AddressConversor().convertAddress(address));
                    const allDoctors = yield this.db.getData("/doctors");
                    let canAdd = true;
                    allDoctors.forEach((doctor) => __awaiter(this, void 0, void 0, function* () {
                        if (doctor.id == newDoctor.getCrm()) {
                            canAdd = false;
                        }
                    }));
                    if (canAdd) {
                        yield this.db.push("/doctors[]", { id: `${newDoctor.getCrm()}`, doctor: newDoctor }, true);
                        res.status(200).json({
                            message: "Doctor created",
                            doctor: newDoctor,
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "Existing doctor",
                        });
                    }
                }
                else {
                    res.status(400).json({
                        message: "Missing required fields",
                        fields: serializedDoctor,
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
            const doctorsArray = yield this.db.getData("/doctors");
            // let showDoctor = false;
            // let doctorData;
            doctorsArray.forEach((doctor) => __awaiter(this, void 0, void 0, function* () {
                if (doctor.id == query) {
                    // showDoctor = true;
                    // doctorData = doctor;
                    return doctor;
                }
            }));
            // if (showDoctor) {
            //   return doctorData;
            // }
        });
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.getData("/doctors");
            }
            catch (error) {
                return error;
            }
        });
    }
    update(doctor, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = JSON.parse(fs_1.default.readFileSync("hospitalDataBase.json", "utf-8"));
            content.doctors.forEach((oldDoctor) => __awaiter(this, void 0, void 0, function* () {
                if (oldDoctor.id == id) {
                    for (let docProp in doctor) {
                        if (Object.keys(oldDoctor.doctor).includes(docProp)) {
                            oldDoctor.doctor[docProp] = doctor[docProp];
                        }
                    }
                }
            }));
            fs_1.default.writeFileSync("hospitalDataBase.json", JSON.stringify(content));
            yield this.db.reload();
        });
    }
}
exports.DoctorBusiness = DoctorBusiness;
