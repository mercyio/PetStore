import { PetService } from "./pets.service";
import { createPetsDto } from "./pet-dto/create-pet.dto";
import { UpdatePetsDto } from "./pet-dto/update-pets.dto";
export declare class PetController {
    private petServices;
    constructor(petServices: PetService);
    createPet(payload: createPetsDto): Promise<any>;
    findPet(id: string): Promise<import("../auth/entities/pets.entity").PetEntity>;
    findAllPets(): Promise<import("../auth/entities/pets.entity").PetEntity[]>;
    updatePets(id: string, payload: UpdatePetsDto): Promise<{
        message: string;
        affected: number;
        result: import("../auth/entities/pets.entity").PetEntity;
    }>;
    deletePets(id: string): Promise<{
        deleted: number;
        message: string;
    }>;
}
