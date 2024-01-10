import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { PetService } from "./pets.service";
import { createPetsDto } from "../pet-dto/create-pet.dto";
import { UpdatePetsDto } from "../pet-dto/update-pets.dto";

@Controller('pets')
export class PetController{
     // public petServices: PetService
     constructor(private petServices: PetService){}

     @Post()
     async createPet(@Body() payload:createPetsDto){
          return await this.petServices.createPet(payload);
           
     }

     @Get(':id')
     async findPet( @Param('id') id:string){
          try{
               return await this.petServices.getPet(id)
          }
          catch(err){
               throw new NotFoundException()
          }
         
     }

     
     @Get()
     async findAllPets (){
          return await this.petServices.getAllPets()
     }

     @Patch( ':id')
     async updatePets( @Param( 'id') id:string, @Body()payload: UpdatePetsDto){
          try{
               return await this.petServices.updatePet(id,payload)
          }
          catch(err){
               throw new NotFoundException();
          }
         
     }

     @Delete ( ':id')
     async deletePets ( @Param('id') id:string){
          try{
         return await this.petServices.deletePet(id)
          }
          catch(err){
               throw new NotFoundException();
          }
     }
}