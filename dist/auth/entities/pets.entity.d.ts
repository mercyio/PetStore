import { CategoryEntity } from "src/auth/entities/category.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { ReviewEntity } from "./review.entity";
import { OrderEntity } from "./order.entity";
export declare class PetEntity {
    userName: string;
    id: string;
    petType: string;
    colour: string;
    age: string;
    breed: string;
    createdAt: Date;
    user: UserEntity;
    categories: CategoryEntity[];
    review: ReviewEntity;
    order: OrderEntity[];
}
