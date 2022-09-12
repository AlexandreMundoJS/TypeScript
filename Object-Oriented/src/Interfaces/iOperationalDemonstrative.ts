import IProcedure from '../Interfaces/procedures'

interface IOperationalDemonstrative{
    provideMonthlyBilling(): number
    informPerformedProcedures(): IProcedure
}

class MinisterDataTransfer implements IOperationalDemonstrative {
    provideMonthlyBilling(): number {
        throw new Error('Method not implemented.');
    }
    informPerformedProcedures(): IProcedure {
        throw new Error('Method not implemented.');
    }
    
}
interface IFirstExample{
    provideFirstMethod(): string;
}

interface ISecondExample{
    provideSecondMethod(): string;
}

class Example implements IFirstExample, ISecondExample{
    provideFirstMethod(): string{
        throw new Error('Method not implemented');
    }
    provideSecondMethod(): string{
        throw new Error('Method not implemented')
    }
}

class Example2 extends MinisterDataTransfer implements IFirstExample, ISecondExample {
    
    provideFirstMethod(): string {
        throw new Error('Method not implemented.');
    }
    provideSecondMethod(): string {
        throw new Error('Method not implemented.');
    }

}