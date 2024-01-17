import { Module } from "@nestjs/common";
import { PetService } from "./pets.service";
import { PetController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "./pet-entity/pets.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfileEntity } from "src/auth/entities/profile.entity";



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
      })
     ],

    providers: [PetService, AuthGuard],
    controllers: [PetController],
    exports:[PetService, AuthGuard]
})
export class PetModule{}