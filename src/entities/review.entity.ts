import { PetEntity } from 'src/entities/pets.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';


@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  // @ManyToOne(() => PostEntity, post => post.review)
  // post: PostEntity;

  @ManyToOne(() => PetEntity, pet => pet.review)
  pet:  PetEntity;

  @ManyToOne(() => UserEntity, user => user.review)
  @JoinColumn({name: 'user_id'})
  user:  UserEntity;
}
