import { PetService } from "./pets.service";
import { createPetsDto } from "./dto/create-pet.dto";
import { UpdatePetsDto } from "./dto/update-pets.dto";
export declare class PetController {
    private petServices;
    constructor(petServices: PetService);
    createPet(payload: createPetsDto): Promise<any>;
    findPet(payload: any): Promise<import("./entity/pets.entity").PetEntity>;
    findAllPets(): Promise<import("./entity/pets.entity").PetEntity[]>;
    updatePets(id: any, payload: UpdatePetsDto): Promise<import("typeorm").UpdateResult>;
    deletePets(payload: any): Promise<import("typeorm").DeleteResult>;
}
