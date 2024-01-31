import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PetEntity } from 'src/auth/entities/pets.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PetEntity, pet => pet.categories)
  pets: PetEntity[];
}
