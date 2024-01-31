import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ReviewEntity } from './review.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.post)
  user: UserEntity;

  @OneToMany(() => ReviewEntity, (review) => review.post)
  review: ReviewEntity[];
}
