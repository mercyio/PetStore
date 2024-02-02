import { PetEntity } from 'src/auth/entities/pets.entity';
export declare class OrderEntity {
    id: number;
    address: string;
    paymentMethod: string;
    totalPrice: number;
    pet: PetEntity;
    pets: PetEntity[];
}
