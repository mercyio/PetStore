import { Role } from "src/auth/auth-guard/roles.enum";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('user')
export class UserEntity{
        @PrimaryGeneratedColumn('uuid')
        userId: string;

        @Column()
        username: string;
      
        @Column()
        Email: string;

        @Column()
        Password: string;

        @Column()
        PhoneNumber: string;

        @Column({
                type:'enum', 
                enum: Role,
                default: Role.User
        })
        role:Role
      
        @CreateDateColumn()
        createdAt: Date;

        @UpdateDateColumn()
        updatedAt: Date
}

