namespace Entities {
    export class Employee {
        protected name!: string;

        protected method1(): void{

        }
    }
}


class StoreManager extends Entities.Employee{
    private method(): void{
        let text: string = this.name;
        this.method1();
    }
}
class Customer {
    private method():void{
        // Error because Customer is not a subclass of Employee
        // let text: string = this.name;

        // Same here
        // this.method1();
        let storeManager: StoreManager = new StoreManager();
        
        // Same here, even if we create a new instance, we cannot call the private method 
        // storeManager.method1();
    }
}