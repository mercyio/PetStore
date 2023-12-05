import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('pets')
export class PetEntity{
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        petType: string;
      
        @Column()
        colour: string;
      
        @Column()
        age: number;

        @CreateDateColumn()
        createdAt: Date
}

