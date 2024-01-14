import { Module } from "@nestjs/common";
import { PetService } from "./pets.service";
import { PetController } from "./pets.controller";
import { AuthService } from "src/auth/auth.service";
// import { AuthGuard } from "src/auth/guard/auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "./pet-entity/pets.entity";
import { UserEntity } from "src/auth/entities/user.entity";
// import { AuthModule } from "src/auth/auth.module";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { PetEntity } from "src/Pets/pet-entity/pets.entity";
// import { AuthService } from "src/auth/auth.service";
// import { AuthGuard } from "src/auth/guard/auth.guard";
// import { AuthModule } from "src/auth/auth.module";
// import { PetsUploadModule } from "./pets-upload/pets-upload.module";
// import { UserEntity } from "src/auth/entities/user.entity";



@Module( {
     imports:[
        TypeOrmModule.forFeature([PetEntity, UserEntity]),
     ],

    providers: [PetService],
    controllers: [PetController],
    exports:[PetService]
})
export class PetModule{}