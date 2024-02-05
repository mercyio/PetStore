import { PetEntity } from 'src/entities/pets.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';


@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => PostEntity, post => post.review)
  post: PostEntity;

  @ManyToOne(() => PetEntity, pet => pet.review)
  pet:  PetEntity;
}
