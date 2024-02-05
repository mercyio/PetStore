import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { PetEntity } from 'src/entities/pets.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  paymentMethod: string;

  @Column()
  totalPrice: number;

  @ManyToMany(() => PetEntity, (pet) => pet.order )
  @JoinColumn({name: 'pet_id'})
  pet: PetEntity;

  // @ManyToMany(() => PetEntity,(pet) => pet. )
  // @JoinTable()
  // pets: PetEntity[];

}
