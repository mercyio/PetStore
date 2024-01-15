import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

        @Column()
        PhoneNumber: string;

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
}

