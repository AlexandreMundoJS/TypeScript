"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    Person() { }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getDateOfBirth() {
        return this.dateOfBitrh;
    }
    setDateOfBirth(dateOfBitrh) {
        this.dateOfBitrh = dateOfBitrh;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
}
exports.Person = Person;
