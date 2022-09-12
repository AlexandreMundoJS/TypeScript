"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyPublicClass {
    constructor() {
        this.myPrivateClass = new PrivateClass;
    }
    test() {
        this.myPrivateClass.test();
    }
}
exports.default = MyPublicClass;
class PrivateClass {
    test() {
        return "It works!";
    }
}
class Recipient {
    age() {
    }
}
class PrivacyTest {
    static main() {
        let recipient = new Recipient();
        // Error because the property name of Recipient is private
        // let firstname = recipient.name;
        // Same here: The method age is private
        // recipient.age(); 
    }
}
