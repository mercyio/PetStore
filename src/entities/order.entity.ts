import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { PetEntity } from 'src/entities/pets.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  

  // @Column()
  // name: string;

  // @Column()
  // address: string;

  // @Column()
  // paymentMethod: string;

  @Column()
  bidingPrice: string;

  @ManyToOne(() => PetEntity, (pet) => pet.order )
  @JoinColumn()
  pet: PetEntity;

  @ManyToOne(() => UserEntity, user => user.order )
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

}
