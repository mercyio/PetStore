import { User } from "src/user/entities/user.entity";
export declare class profileEntity {
    Id: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
