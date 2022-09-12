"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateConversor = void 0;
class DateConversor {
    dateConverter(date) {
        date = date.split("/").join("-");
        let birthdayDate = new Date();
        birthdayDate.setMonth(parseInt(date.split('-')[0]));
        birthdayDate.setDate(parseInt(date.split('-')[1]));
        birthdayDate.setFullYear(parseInt(date.split('-')[2]));
        birthdayDate.setHours(new Date().getHours());
        birthdayDate.setMinutes(new Date().getMinutes());
        birthdayDate.setSeconds(new Date().getSeconds());
        console.log(birthdayDate);
        return birthdayDate;
    }
}
exports.DateConversor = DateConversor;
