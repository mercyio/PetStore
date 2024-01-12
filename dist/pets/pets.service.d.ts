import { Repository } from "typeorm";
import { PetEntity } from "src/Pets/pet-entity/pets.entity";
export declare class PetService {
    private petRepo;
    constructor(petRepo: Repository<PetEntity>);
    createPet(payload: any): Promise<any>;
    getPet(id: string): Promise<PetEntity>;
    getAllPets(): Promise<PetEntity[]>;
    updatePet(id: string, payload: any): Promise<{
        petUpdate: import("typeorm").UpdateResult;
        valid: PetEntity;
    }>;
    deletePet(id: string): Promise<string>;
}
