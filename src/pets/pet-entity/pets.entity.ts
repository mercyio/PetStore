import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pets')
export class PetEntity{
        @Column()
        userName: string

        @PrimaryGeneratedColumn('uuid')
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

       

        // @OneToMany((=> Profile))
        // @JoinColumn()
        // profile:Profile;
}

