import { Address } from "../entities/Address";

export class AddressConversor{
    
    public convertAddress(address:string):Address{
        let add: Address = new Address();
        add.setStreet(address.split(',')[0]);
        add.setNumber(parseInt(address.split(',')[1].split(' ')[1]));
        add.setNeighborhood(address.split(',')[2]);
        add.setPostalCode(address.split(',')[3]);

        return add;
    }
}