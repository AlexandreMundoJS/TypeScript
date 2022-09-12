import { Procedure } from "../entities/Procedure";

export class DataBaseProcedure{
    private procedures!: Array<Procedure>;

    public DataBaseProcedure(){
        this.procedures = new Array();
    }

    public add(procedure: Procedure): void{
        if (!this.procedures.includes(procedure)){
            this.procedures.push(procedure);
            procedure.setCode(this.procedures.length);
        }
    }

    public delete(procedure: Procedure): void{
        console.log("DELETE PROCEDURE: ", procedure)
        this.procedures = this.procedures.filter((el)=>{
            return el.getCode() !== procedure.getCode();
        })
    }

    public showAll(): Array<Procedure>{
        return this.procedures;
    }
}