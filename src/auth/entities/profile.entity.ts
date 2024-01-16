import { UserEntity } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profile')
export class ProfileEntity{
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


    @OneToOne(() => UserEntity, (user) => user.profile )
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

}