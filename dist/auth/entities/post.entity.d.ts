import { UserEntity } from './user.entity';
import { ReviewEntity } from './review.entity';
export declare class PostEntity {
    id: number;
    title: string;
    content: string;
    user: UserEntity;
    review: ReviewEntity[];
}
