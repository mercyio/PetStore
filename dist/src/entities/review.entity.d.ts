import { PetEntity } from 'src/entities/pets.entity';
import { UserEntity } from './user.entity';
export declare class ReviewEntity {
    id: string;
    content: string;
    pet: PetEntity;
    user: UserEntity;
}
