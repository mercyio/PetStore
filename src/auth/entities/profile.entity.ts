import { UserEntity } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/roles.enum";
@Entity('profile')
export class ProfileEntity{
    @PrimaryGeneratedColumn()
    Id: string
    
    @Column()
    userName: string

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


    @Column({
        type:'enum', 
        enum: Role,
        default: Role.user
})
role:Role


@OneToOne(() => UserEntity, (user) => user.profile )
@JoinColumn()
user: UserEntity;

}