import { Role } from "src/auth/auth-guard/roles.enum";
export declare class UserEntity {
    userId: string;
    username: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
