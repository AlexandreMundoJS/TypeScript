"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    Address() { }
    getStreet() {
        return this.street;
    }
    setStreet(street) {
        this.street = street;
    }
    getNumber() {
        return this.number;
    }
    setNumber(number) {
        this.number = number;
    }
    getNeighborhood() {
        return this.neighborhood;
    }
    setNeighborhood(neighborhood) {
        this.neighborhood = neighborhood;
    }
    getPostalCode() {
        return this.postalCode;
    }
    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }
}
exports.Address = Address;
