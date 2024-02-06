// import { CategoryEntity } from "src/auth/entities/category.entity";
import { UserEntity } from "src/entities/user.entity";
import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ReviewEntity } from "./review.entity";
import { OrderEntity } from "./order.entity";

@Entity('pets')
export class PetEntity{
        // @Column()
        // userName: string

        @PrimaryGeneratedColumn()
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

       
        @ManyToOne(()=> UserEntity, users=> users.pet)
        @JoinColumn({name: 'vendors_id'})
        users: UserEntity

        // @ManyToMany(() => CategoryEntity, category => category.pet)
        // @JoinTable()
        // categories: CategoryEntity[];

        @OneToMany(() => ReviewEntity, review => review.pet)
        review:  ReviewEntity[];

        @OneToMany(() => OrderEntity, order => order.pet )
        order: OrderEntity[];

        @ManyToMany(()=> UserEntity, (user) => user.pet)
        @JoinTable()
        user: UserEntity[];

}

