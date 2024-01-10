import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

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
      
        @CreateDateColumn()
        createdAt: Date
}

