import { PetEntity } from 'src/entities/pets.entity';
import { UserEntity } from './user.entity';
export declare class OrderEntity {
    id: number;
    bidingPrice: string;
    user: UserEntity;
    pet: PetEntity[];
}
