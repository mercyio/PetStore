import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/entities/pets.entity";
import { PostEntity } from "./post.entity";
import { OrderEntity } from "./order.entity";

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

        @OneToMany(()=> PetEntity, pet=> pet.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        pet: PetEntity[]

        @OneToMany(() => PostEntity, (post) => post.user)
        post: PostEntity;

        // @OneToMany(()=> OrderEntity, order=> order.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        // order: UserEntity;

}

// api ocumentation using swagger

