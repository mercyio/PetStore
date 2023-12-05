import { Repository } from "typeorm";
import { PetEntity } from "./entity/pets.entity";
export declare class PetService {
    private petRepo;
    constructor(petRepo: Repository<PetEntity>);
    createPet(payload: any): Promise<any>;
    getPet(id: number): Promise<PetEntity>;
    getAllPets(): Promise<PetEntity[]>;
    updatePet(id: number, payload: any): Promise<import("typeorm").UpdateResult>;
    deletePet(id: number): Promise<import("typeorm").DeleteResult>;
}
