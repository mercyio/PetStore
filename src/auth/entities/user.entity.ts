import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/Pets/pet-entity/pets.entity";

@Entity('user')
export class UserEntity{
        @PrimaryGeneratedColumn('uuid')
        userId: string;

        @Column()
        userName: string;
      
        @Column({unique:true})
        Email: string;

        @Column()
        Password: string;

        @Column({
                type:'enum', 
                enum: Role,
                default: Role.unknown
        })
        role:Role
      
        @CreateDateColumn()
        createdAt: Date;

        @UpdateDateColumn()
        updatedAt: Date

        @OneToOne(() => ProfileEntity, (profile) => profile.user, {onDelete: 'CASCADE'} )
        @JoinColumn()
        profile: ProfileEntity;

        @OneToMany(()=> PetEntity, pet=> pet.user, {onDelete: 'SET NULL'})
        @JoinColumn()
        pet: PetEntity[]

}

// api ocumentation using swagger

