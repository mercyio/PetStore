import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PetService } from "./pets.service";
import { createPetsDto } from "./dto/create-pet.dto";
import { UpdatePetsDto } from "./dto/update-pets.dto";

@Controller('pets')
export class PetController{
     // public petServices: PetService
     constructor(private petServices: PetService){}

     @Post()
     async createPet(@Body() payload : createPetsDto){
          return await this.petServices.createPet(payload);
           
     }

     @Get(':id')
     async findPet( @Param('id') payload){
          return await this.petServices.getPet(payload)
     }

     
     @Get()
     async findAllPets (){
          return await this.petServices.getAllPets()
     }

     @Patch( ':id')
     async updatePets( @Param( 'id') id, @Body()payload: UpdatePetsDto){

          return await this.petServices.updatePet(id,payload)
     }

     @Delete ( ':id')
     async deletePets ( @Param('id')payload){
         return await this.petServices.deletePet(payload)
     }

}