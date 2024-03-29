import { Module } from "@nestjs/common";
import { PetService } from "./pets.service";
import { PetController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "../entities/pets.entity";
import { UserEntity } from "../entities/user.entity";
import { AuthGuard } from "../auth/guard/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfileEntity } from "../entities/profile.entity";
import { PetsUploadModule } from "./pets-upload/pets-upload.module";



@Module( {
     imports:[
        TypeOrmModule.forFeature([PetEntity, UserEntity, ProfileEntity]),
        JwtModule.registerAsync ({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) =>
         ({
             secret: configService.getOrThrow<string>
             ('JWT_SECRET'),
             signOptions:{
                 algorithm: configService.getOrThrow
                 ('JWT_ALGORITHM')
             }
         }),
         inject: [ConfigService],
      }),
      PetsUploadModule
     ],

    providers: [PetService, AuthGuard],
    controllers: [PetController],
    exports:[PetService, AuthGuard]
})
export class PetModule{}