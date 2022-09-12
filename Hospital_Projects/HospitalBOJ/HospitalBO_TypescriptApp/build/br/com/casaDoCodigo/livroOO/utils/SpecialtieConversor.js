"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtieConversor = void 0;
const Specialties_1 = require("../entities/Specialties");
class SpecialtieConversor {
    convertSpecialties(specialties) {
        let specialtiesArray = specialties.split(',');
        let specialtiesList = new Array();
        specialtiesArray.forEach((specialtieName) => {
            let specialtie = new Specialties_1.Specialties();
            specialtie.setName(specialtieName);
            specialtiesList.push(specialtie);
        });
        return specialtiesList;
    }
}
exports.SpecialtieConversor = SpecialtieConversor;
