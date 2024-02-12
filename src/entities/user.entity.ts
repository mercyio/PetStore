import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PetEntity } from "src/entities/pets.entity";
// import { PostEntity } from "./post.entity";
import { OrderEntity } from "./order.entity";
import { ReviewEntity } from "./review.entity";

@Entity('user')
export class UserEntity{
        @PrimaryGeneratedColumn()
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
        CreatedAt: Date;

        @UpdateDateColumn()
        updatedAt: Date

        @OneToOne(() => ProfileEntity, (profile) => profile.user, {onDelete: 'CASCADE'} )
        profile: ProfileEntity;

        @ManyToMany(()=> PetEntity, pet=> pet.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        pet: PetEntity[]

        @OneToMany(() => PetEntity, (pets) => pets.users)
        pets: PetEntity;

        // @OneToMany(() => OrderEntity, order => order.user )
        // order: OrderEntity[];

        @OneToMany(()=> OrderEntity, order=> order.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        order: UserEntity[];

        @OneToMany(()=> ReviewEntity, review=> review.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        review: ReviewEntity[];

} 

// api ocumentation using swagger

