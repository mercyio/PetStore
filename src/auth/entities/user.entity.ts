import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/auth/entities/pets.entity";
import { PostEntity } from "./post.entity";

@Entity('user')
export class UserEntity{
        @PrimaryGeneratedColumn('uuid')
        userId: string;

        // @Column()
        // userName: string;
      
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
        profile: ProfileEntity;

        @OneToMany(()=> PetEntity, pet=> pet.user, {onDelete: 'SET NULL'})
        @JoinColumn()
        pet: PetEntity[]

        @OneToMany(() => PostEntity, (post) => post.user)
        post: PostEntity;
  finduser: any;

}

// api ocumentation using swagger

