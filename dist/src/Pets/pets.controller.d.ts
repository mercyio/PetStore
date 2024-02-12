import { PetService } from "./pets.service";
import { createPetsDto } from "src/dto/pet-dto/create-pet.dto";
import { UpdatePetsDto } from "src/dto/pet-dto/update-pets.dto";
export declare class PetController {
    private petServices;
    constructor(petServices: PetService);
    createPet(payload: createPetsDto): Promise<any>;
    findPet(id: string): Promise<import("../entities/pets.entity").PetEntity>;
    findAllPets(): Promise<import("../entities/pets.entity").PetEntity[]>;
    updatePets(id: string, payload: UpdatePetsDto): Promise<{
        message: string;
        affected: number;
        result: import("../entities/pets.entity").PetEntity;
    }>;
    deletePets(id: string): Promise<{
        deleted: number;
        message: string;
    }>;
}
