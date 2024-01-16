import { Profile } from "passport";
import { Role } from "src/auth/enum/roles.enum";
// import { User } from "src/profile/entities/profile.entity";
import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

        // @OneToOne(() => Profile, (profile) => profile.user )
        // profile: Profile;
}

