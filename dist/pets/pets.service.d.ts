import { Repository } from "typeorm";
import { PetEntity } from "src/Pets/pet-entity/pets.entity";
export declare class PetService {
    private petRepo;
    constructor(petRepo: Repository<PetEntity>);
    createPet(payload: any): Promise<any>;
    getPet(id: string): Promise<PetEntity>;
    getAllPets(): Promise<PetEntity[]>;
    updatePet(id: string, payload: any): Promise<{
        message: string;
        affected: number;
        result: PetEntity;
    }>;
    cv: any;
    deletePet(id: string): Promise<{
        deleted: number;
        message: string;
    }>;
}
