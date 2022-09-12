"use strict";
var Entities;
(function (Entities) {
    class Employee {
        method1() {
        }
    }
    Entities.Employee = Employee;
})(Entities || (Entities = {}));
class StoreManager extends Entities.Employee {
    method() {
        let text = this.name;
        this.method1();
    }
}
class Customer {
    method() {
        // Error because Customer is not a subclass of Employee
        // let text: string = this.name;
        // Same here
        // this.method1();
        let storeManager = new StoreManager();
        // Same here, even if we create a new instance, we cannot call the private method 
        // storeManager.method1();
    }
}
