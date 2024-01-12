import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PetEntity } from "src/Pets/pet-entity/pets.entity";
import { UpdatePetsDto } from "./pet-dto/update-pets.dto";

@Injectable() 
export class PetService{
    constructor(@InjectRepository(PetEntity) private petRepo: Repository<PetEntity>){}

    async createPet(payload){
        return await this.petRepo.save(payload)
    }


    async getPet(id: string){
        const GetPet = await this.petRepo.findOne({ where: { id : id}})
        if( !GetPet){
            throw new HttpException(`PLS INPUT THE CORRECT ID`, 400)
        }
        return GetPet;
    }

    async getAllPets (){
        return await this.petRepo.find()
  }

     async updatePet(id: string, payload){
     const petUpdate = await this.petRepo.update(id, payload)
     const valid = await this.petRepo.findOne({where:{id}})
        if(!valid){
            throw new HttpException('UNABLE TO UPDATE PET, INPUT A VALID ID', 400)
          }
         return {petUpdate, valid}
     }
    
  async deletePet( id:string){
   const deletePet = await this.petRepo.delete(id)
   if(!deletePet){
     return 'SUCCESSFULLY DELETED' 
   }
   throw new HttpException("INVALID ID. UNABLE TO DELETE", 400)
  }
   }
 
