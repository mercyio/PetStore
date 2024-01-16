import { UserEntity } from "src/auth/entities/user.entity";
export declare class ProfileEntity {
    Id: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
