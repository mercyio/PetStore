import { UserEntity } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../auth/enum/roles.enum";
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

 @Column({ default: false })
    isActive: boolean;


@OneToOne(() => UserEntity, (user) => user.profile )
@JoinColumn({name: 'user_id'})
user: UserEntity;

// @OneToOne(() => VendorEntity, (vendor) => vendor.profile )
// @JoinColumn({name: 'vendor_id'})
// vendor: VendorEntity;

}