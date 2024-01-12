import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { PetService } from "./pets.service";
import { createPetsDto } from "./pet-dto/create-pet.dto";
import { UpdatePetsDto } from "./pet-dto/update-pets.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";

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
     return await this.petServices.getPet(id)
     }

     
     @Get()
     async findAllPets (){
     return await this.petServices.getAllPets()
     }
     
     @UseGuards(AuthGuard)
     @Patch( ':id')
     async updatePets( @Param( 'id') id:string, @Body()payload: UpdatePetsDto){
      return await this.petServices.updatePet(id,payload) 
     }
     
     @UseGuards(AuthGuard)
     @Delete ( ':id')
     async deletePets ( @Param('id') id:string){
     return await this.petServices.deletePet(id)
     }
}