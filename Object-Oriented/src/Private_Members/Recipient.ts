export default class MyPublicClass {
    private myPrivateClass: PrivateClass
    constructor(){
        this.myPrivateClass = new PrivateClass;
    }

    public test(){
        this.myPrivateClass.test();
    }
}

class PrivateClass {
  public test(): string {
    return "It works!";
  }
}


class Recipient {
    private name!: string;
    private dateOfBirth!: Date;
    private recipientType!: string;
    private address!: object;
    private age(): void{

    }
}

class PrivacyTest {
    public static main(): void{
        let recipient: Recipient = new Recipient();
        // Error because the property name of Recipient is private
        // let firstname = recipient.name;
        // Same here: The method age is private
        // recipient.age(); 
    }
}
