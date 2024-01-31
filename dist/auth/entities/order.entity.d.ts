import { PetEntity } from 'src/auth/entities/pets.entity';
import { UserEntity } from './user.entity';
export declare class OrderEntity {
    id: number;
    user: UserEntity;
    pets: PetEntity[];
    totalPrice: number;
}
