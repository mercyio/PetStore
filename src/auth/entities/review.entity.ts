import { PetEntity } from 'src/auth/entities/pets.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';


@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => PostEntity, post => post.review)
  post: PostEntity;

  @ManyToOne(() => PetEntity, pet => pet.review)
  pet:  PetEntity;
}
