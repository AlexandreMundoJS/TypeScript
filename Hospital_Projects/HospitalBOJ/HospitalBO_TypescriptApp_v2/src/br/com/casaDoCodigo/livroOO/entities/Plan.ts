import { IPlan } from "../interfaces/entities/IPlan";

export class Plan implements IPlan{
    private name!: string;
    private monthlyPayment!: number;

    public constructor(name: string, monthlyPayment: number){
        this.name = name;
        this.monthlyPayment = monthlyPayment;
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