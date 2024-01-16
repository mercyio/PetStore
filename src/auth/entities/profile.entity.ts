import { profile } from "console";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profile')
export class profileEntity{
    @PrimaryGeneratedColumn()
    Id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    phonenumber: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date


    // @OneToOne(() => User, (user) => user.profile )
    // user: User;

}