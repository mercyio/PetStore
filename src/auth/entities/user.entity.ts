import { Role } from "src/auth/enum/roles.enum";
import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ProfileEntity } from "./profile.entity";

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

        @OneToOne(() => ProfileEntity, (profile) => profile.user )
        profile: ProfileEntity;
}

