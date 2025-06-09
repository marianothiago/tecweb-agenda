export class Contato {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;

    constructor({id,name,email,phoneNumber}:Contato){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
export interface ContatosPaginacao {
    contacts: Contato[];
    itensByPage: number;
    page: number;
    size: number;
    sizePages: number;
}
