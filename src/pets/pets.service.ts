import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PetEntity } from "./entity/pets.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";

@Injectable() 
export class PetService{
    constructor(@InjectRepository(PetEntity) private petRepo: Repository<PetEntity>){}

    async createPet(payload){
        return await this.petRepo.save(payload)
    }


    async getPet(id: number){
        const GetPet = await this.petRepo.findOne({ where: { id : id}})
        if( !GetPet){
            throw new HttpException(`id not found`, 400)
        }
        return GetPet;
    }

    async getAllPets (){
        return await this.petRepo.find()
  }

     async updatePet(id: number, payload){
     const petUpdate = await this.petRepo.update(id, payload)
      if( !petUpdate){
         throw new HttpException( " wrong update request", 400 )
      }  
      return petUpdate
  }
    
  async deletePet( id:number){
    return await this.petRepo.delete(id)
  }
   }
 
