import { Exclude } from "class-transformer";
import { Role } from "../enum/roles.enum";

export class SerializeUsers {
    constructor(partial:Partial<SerializeUsers>){
        Object.assign(this,partial)
    }

    @Exclude()
    Password:string;

    userName: string;

    PhoneNumber: string

    Email: string

    @Exclude()
    createdAt: Date;


    role: Role

    @Exclude()
    updatedAt: Date

    userId: string;

}