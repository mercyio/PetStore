import { Role } from "src/auth/enum/roles.enum";
import { ProfileEntity } from "./profile.entity";
export declare class UserEntity {
    userId: string;
    userName: string;
    Email: string;
    Password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    profile: ProfileEntity;
}
