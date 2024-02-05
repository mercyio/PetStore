// import { HttpException, Injectable } from "@nestjs/common";
// import { Repository } from "typeorm";
// import { InjectRepository } from "@nestjs/typeorm";
// import { PetEntity } from "src/Pets/pet-entity/pets.entity";
// import { UpdatePetsDto } from "./pet-dto/update-pets.dto";
// import { JwtService } from "@nestjs/jwt";

// @Injectable() 
// export class PetService{
//     constructor(@InjectRepository(PetEntity) private petRepo: Repository<PetEntity>){}

//     async createPet(payload){
//         return await this.petRepo.save(payload)
//     }


//     async getPet(id: string){
//         const GetPet = await this.petRepo.findOne({ where: { id : id}})
//         if( !GetPet){
//             throw new HttpException(`PLS INPUT THE CORRECT ID`, 400)
//         }
//         return GetPet;
//     }

//     async getAllPets (){
//         return await this.petRepo.find()
//   }

//      async updatePet(id: string, payload){
//      const petUpdate = await this.petRepo.update(id, payload)
//      const valid = await this.petRepo.findOne({where:{id}})
//         if(!valid){
//             throw new HttpException('UNABLE TO UPDATE PET, INPUT A VALID ID', 400)
//           }
//          return {petUpdate, valid}
//      }
    
//   async deletePet( id:string){
//    const deletePet = await this.petRepo.delete(id)
//    if(!deletePet){
//      return 'SUCCESSFULLY DELETED' 
//    }
//    throw new HttpException("INVALID ID. UNABLE TO DELETE", 400)
//   }
//    }
 

import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PetEntity } from "src/entities/pets.entity";

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

    //  async updatePet(id: string, payload){
    //  const petUpdate = await this.petRepo.update(id, payload)
    //  const valid = await this.petRepo.findOne({where:{id}})
    //     if(!valid){
    //         throw new HttpException('UNABLE TO UPDATE PET, INPUT A VALID ID', 400)
    //       }
    //      return {petUpdate, valid}
    //  }

    async  updatePet(id:string, payload) {
       const findPet = await this.petRepo.findOne({where: {id}})
       if(!findPet){
        throw new HttpException('invalid pet ID', 400)
       }
        const updatePet = await this.petRepo
        .createQueryBuilder()
        .update(PetEntity)
        .set(payload)
        .where('id = :id', {id})
        .execute();

        return {
            message: `SUCCESSFULLY UPDATED`,
            affected: updatePet.affected,
            result: findPet
        };
        
    }cv
    
  async deletePet( id:string ){
    const findPet = await this.petRepo.findOne({where: {id}})
    if(!findPet){
        throw new HttpException("INVALID ID. UNABLE TO DELETE", 400)
    }
   const deletePet = await this.petRepo
   .createQueryBuilder()
   .delete()
   .where('id = :id', {id})
   .execute();

   return {
   deleted:  deletePet.affected,
    message: `SUCCESSFULLY DELETED`
}
   
   }

//    async createProfile( userName: string){
//     const findname = await this.userRepo.findOne({where:{userName}})
//     if(!findname){
//      throw new UnauthorizedException('invalid crediential')
//     }
//     const createProfile= await this.userRepo.save({userName})

//     return({
//       message: 'successfully created',
//       result: createProfile
//     })
//   }
 


//   async updateProfile(userName:string, payload:UpdateProfileDto){
//     const findProfile = await this.userRepo.findOne({where:{userName}})
//     if(!findProfile){
//       throw new UnauthorizedException('invalid')
//     }
//     const update = await this.userRepo
//     .createQueryBuilder()
//     .update(ProfileEntity)
//     .where('userName = :userName', {userName})
//     .set(payload)
//     .execute();

//     return{
//       message: 'successfully updated profile',
//       result: update
//     }
//   }
  
 
}
