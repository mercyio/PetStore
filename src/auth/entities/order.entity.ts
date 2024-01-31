import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { PetEntity } from 'src/auth/entities/pets.entity';
import { UserEntity } from './user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToMany(() => PetEntity)
  @JoinTable()
  pets: PetEntity[];

  @Column()
  totalPrice: number;
}
