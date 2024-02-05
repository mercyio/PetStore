import { PetEntity } from 'src/entities/pets.entity';
export declare class OrderEntity {
    id: number;
    name: string;
    address: string;
    paymentMethod: string;
    totalPrice: number;
    pet: PetEntity;
}
