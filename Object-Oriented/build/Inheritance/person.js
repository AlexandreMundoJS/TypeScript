"use strict";
class Person {
}
class Pacient extends Person {
}
class Employee extends Person {
}
class Address {
}
class Doctor extends Employee {
    // Normal method
    doSomething() { }
}
class Manager extends Employee {
    releasePayment() { }
}
class Anesthetis extends Doctor {
    operate() {
        console.log("Hello World, I'm Anesthetis");
    }
}
class Obstetrician extends Doctor {
    operate() {
        throw new Error("Method not implemented.");
    }
}
class Pediatrician extends Doctor {
    operate() {
        throw new Error("Method not implemented.");
    }
}
class ResidentAnesthetis extends Anesthetis {
    operate() {
        // Using super, we can use fully the superclass method behavior
        super.operate();
        console.log("Hello World, I'm ResidentAnesthetis");
    }
}
let resident = new ResidentAnesthetis();
resident.operate();
// Upcast
// let pessoa;
// pessoa = new Doctor();
// pessoa = new Pacient();
// pessoa = new Employee();
// let funcionario = new Manager();
// let medico = new Anesthetis();
// Downcast
// let funcionario1 = new Manager();
// let manager1 = funcionario1 as Manager;
// let funcionario2 = new Employee();
// let manager2 = funcionario2 as Manager;
class Procedure {
}
class Room {
}
class childBirth extends Procedure {
}
class Recipient {
}
