export class Contato {
    id: number;
    name: string;
    email: string;
    phoneNUmber: string;

    constructor({id,name,email,phoneNUmber}:Contato){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNUmber = phoneNUmber;
    }
}
