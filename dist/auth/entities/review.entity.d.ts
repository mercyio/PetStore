import { PetEntity } from 'src/auth/entities/pets.entity';
import { PostEntity } from './post.entity';
export declare class ReviewEntity {
    id: number;
    content: string;
    post: PostEntity;
    pet: PetEntity;
}
