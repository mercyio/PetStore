import { UserEntity } from "src/entities/user.entity";
import { ReviewEntity } from "./review.entity";
import { OrderEntity } from "./order.entity";
export declare class PetEntity {
    id: string;
    petType: string;
    colour: string;
    age: string;
    breed: string;
    createdAt: Date;
    user: UserEntity;
    review: ReviewEntity;
    order: OrderEntity[];
}
