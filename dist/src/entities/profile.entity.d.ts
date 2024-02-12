import { UserEntity } from "src/entities/user.entity";
import { Role } from "../auth/enum/roles.enum";
export declare class ProfileEntity {
    Id: string;
    userName: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    user: UserEntity;
}
