import { UserEntity } from "src/auth/entities/user.entity";
export declare class PetEntity {
    userName: string;
    id: string;
    petType: string;
    colour: string;
    age: string;
    breed: string;
    createdAt: Date;
    user: UserEntity;
}
