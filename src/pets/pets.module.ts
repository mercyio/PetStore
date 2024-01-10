import { Module } from "@nestjs/common";
import { PetService } from "./pets.service";
import { PetController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "src/Pets/pet-entity/pets.entity";



@Module( {
    imports : [
        TypeOrmModule.forFeature([PetEntity]),
    ], 
    providers: [PetService],
    controllers: [PetController]
})
export class petModule{}