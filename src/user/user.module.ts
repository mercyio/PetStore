import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from 'src/Pets/pet-entity/pets.entity';
import { ProfileEntity } from 'src/auth/entities/profile.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
// import {RoleGuard} from '../auth/auth-guard/roles.guard'

@Module({
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
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, AuthGuard]
})
export class UserModule {}
