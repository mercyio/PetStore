import { PetService } from "./pets.service";
export declare class PetController {
    private petServices;
    constructor(petServices: PetService);
    createPet(payload: any): Promise<any>;
    findPet(payload: any): Promise<import("./entity/pets.entity").PetEntity>;
    findAllPets(): Promise<import("./entity/pets.entity").PetEntity[]>;
    updatePets(id: any, payload: any): Promise<import("typeorm").UpdateResult>;
    deletePets(payload: any): Promise<import("typeorm").DeleteResult>;
}
