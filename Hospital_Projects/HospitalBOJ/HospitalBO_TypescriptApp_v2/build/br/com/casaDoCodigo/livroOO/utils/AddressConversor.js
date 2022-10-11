"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressConversor = void 0;
const Address_1 = require("../entities/Address");
class AddressConversor {
    convertAddress(address) {
        let add = new Address_1.Address();
        add.setStreet(address.split(',')[0]);
        add.setNumber(parseInt(address.split(',')[1].split(' ')[1]));
        add.setNeighborhood(address.split(',')[2]);
        add.setPostalCode(address.split(',')[3]);
        return add;
    }
}
exports.AddressConversor = AddressConversor;
