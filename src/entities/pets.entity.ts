// import { CategoryEntity } from "src/auth/entities/category.entity";
import { UserEntity } from "src/entities/user.entity";
import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ReviewEntity } from "./review.entity";
import { OrderEntity } from "./order.entity";

@Entity('pets')
export class PetEntity{
        // @Column()
        // userName: string

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
        @JoinColumn({name: 'user_id'})
        user: UserEntity

        // @ManyToMany(() => CategoryEntity, category => category.pet)
        // @JoinTable()
        // categories: CategoryEntity[];

        @OneToMany(() => ReviewEntity, review => review.pet)
        review:  ReviewEntity;

        @ManyToMany(() => OrderEntity, order => order.pet )
        order: OrderEntity[];
}

