import { Repository } from "typeorm";
import { PetEntity } from "src/pet-entity/pets.entity";
export declare class PetService {
    private petRepo;
    constructor(petRepo: Repository<PetEntity>);
    createPet(payload: any): Promise<any>;
    getPet(id: string): Promise<PetEntity>;
    getAllPets(): Promise<PetEntity[]>;
    updatePet(id: string, payload: any): Promise<import("typeorm").UpdateResult>;
    deletePet(id: string): Promise<import("typeorm").DeleteResult>;
}
