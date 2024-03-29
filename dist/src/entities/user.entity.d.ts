import { Role } from "src/auth/enum/roles.enum";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/entities/pets.entity";
import { ReviewEntity } from "./review.entity";
export declare class UserEntity {
    userId: string;
    Email: string;
    Password: string;
    role: Role;
    blocked: boolean;
    isActive: boolean;
    CreatedAt: Date;
    updatedAt: Date;
    profile: ProfileEntity;
    pet: PetEntity[];
    pets: PetEntity;
    order: UserEntity[];
    review: ReviewEntity[];
}
