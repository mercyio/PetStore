import { Role } from "src/auth/enum/roles.enum";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/auth/entities/pets.entity";
import { PostEntity } from "./post.entity";
export declare class UserEntity {
    userId: string;
    Email: string;
    Password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    profile: ProfileEntity;
    pet: PetEntity[];
    post: PostEntity;
    finduser: any;
}
