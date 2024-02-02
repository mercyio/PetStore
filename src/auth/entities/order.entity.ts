import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { PetEntity } from 'src/auth/entities/pets.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  paymentMethod: string;

  @Column()
  totalPrice: number;

  @ManyToOne(() => PetEntity, (pet) => pet.order )
  @JoinColumn({name: 'pet_id'})
  pet: PetEntity;

  @ManyToMany(() => PetEntity)
  @JoinTable()
  pets: PetEntity[];

}
