import { Role } from "../enum/roles.enum";
export declare class SerializeUsers {
    constructor(partial: Partial<SerializeUsers>);
    Password: string;
    userName: string;
    PhoneNumber: string;
    Email: string;
    createdAt: Date;
    role: Role;
    updatedAt: Date;
    userId: string;
}
