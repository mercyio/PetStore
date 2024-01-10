import { PetService } from "./pets.service";
import { createPetsDto } from "./pet-dto/create-pet.dto";
import { UpdatePetsDto } from "./pet-dto/update-pets.dto";
export declare class PetController {
    private petServices;
    constructor(petServices: PetService);
    createPet(payload: createPetsDto): Promise<any>;
    findPet(id: string): Promise<import("./pet-entity/pets.entity").PetEntity>;
    findAllPets(): Promise<import("./pet-entity/pets.entity").PetEntity[]>;
    updatePets(id: string, payload: UpdatePetsDto): Promise<import("typeorm").UpdateResult>;
    deletePets(id: string): Promise<import("typeorm").DeleteResult>;
}
