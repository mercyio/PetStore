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


  @ManyToOne(() => UserEntity, user => user.order )
  @JoinColumn({name: 'user_id'})
  user: UserEntity;


  @ManyToMany(() => PetEntity, (pet) => pet.order )
  @JoinTable({name: 'pet_order'})
  pet: PetEntity[];

}
