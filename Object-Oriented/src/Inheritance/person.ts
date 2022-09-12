abstract class Person {
  name!: string;
  gender!: string;
}

class Pacient extends Person {
  internationDate!: number;
}

class Employee extends Person {
  admissionDate!: number;
  registration!: string;
}

class Address {
  street!: string;
  number!: number;
  neighborhood!: string;
  complement!: string;
  city!: string;
  state!: string;
  country!: string;
}

abstract class Doctor extends Employee {
  CRM!: number;
  // Structural Association
  address!: Address;

  // Abstract method
  /**
   * @abstract methods cannot have implementation
   */
  abstract operate(): void;
  // Normal method
  doSomething(): void {}
}

class Manager extends Employee {
  CRA!: number;
  releasePayment(): void {}
}

class Anesthetis extends Doctor {
  operate(): void {
    console.log("Hello World, I'm Anesthetis");
  }
}

class Obstetrician extends Doctor {
  operate(): void {
    throw new Error("Method not implemented.");
  }
}

class Pediatrician extends Doctor {
  operate(): void {
    throw new Error("Method not implemented.");
  }
}

class ResidentAnesthetis extends Anesthetis {
  operate(): void {
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
    rooms!: Room;

    // verify later
    // Java implementation
    //Doctor[] doctors = new Doctor[]{new Anesthetis(), new Obstetrician(), new Pediatrician()}
}

class Recipient {
    name!: string;
    dateOfBirth!: number;
    recipientType!: string;
    dependancy!: Recipient;

    // getters and setters
    // another methods
}

