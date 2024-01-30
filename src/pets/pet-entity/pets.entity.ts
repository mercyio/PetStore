import { UserEntity } from "src/auth/entities/user.entity";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pets')
export class PetEntity{
        @Column()
        userName: string

        @PrimaryGeneratedColumn('uuid')
        id: string;
      
        @Column()
        petType: string;
      
        @Column()
        colour: string;
      
        @Column()
        age: string;

        @Column()
        breed: string;

        @CreateDateColumn()
        createdAt: Date

        @ManyToOne(()=> UserEntity, user=> user.pet)
        @JoinColumn()
        user: UserEntity
}

