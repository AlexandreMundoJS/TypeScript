import { Specialties } from "../entities/Specialties";

export class SpecialtieConversor {
    public convertSpecialties(specialties: string): Array<Specialties> {
        let specialtiesArray: Array<string> = specialties.split(',');
        let specialtiesList: Array<Specialties> = new Array();

        specialtiesArray.forEach((specialtieName:string)=>{
            let specialtie = new Specialties();
            specialtie.setName(specialtieName);
            specialtiesList.push(specialtie);
        })

        return specialtiesList;
    }
}