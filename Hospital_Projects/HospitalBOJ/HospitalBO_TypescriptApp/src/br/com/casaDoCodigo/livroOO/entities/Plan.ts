export class Plan{
    private name!: string;
    private monthlyPayment!: number;

    public Plan(){

    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public getMonthlyPayment():number{
        return this.monthlyPayment;
    }

    public setMonthlyPayment(monthlyPayment:number):void{
        this.monthlyPayment = monthlyPayment;
    }
}