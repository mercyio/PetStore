import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PetModule } from 'src/Pets/pets.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
 import { ConfigModule, ConfigService } from '@nestjs/config';
import { PetEntity } from 'src/Pets/pet-entity/pets.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { ProfileEntity } from './entities/profile.entity';


@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity, PetEntity, ProfileEntity]),
         JwtModule.registerAsync({
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
      PetModule,
      PassportModule.register({
          defaultStrategy: 'jwt'
      }),

    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, RolesGuard],
    exports: [AuthService, AuthGuard],
  })
export class AuthModule {}



// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity]),
//      PetModule, 
//       PassportModule,
//        JwtModule.register({
//         global: true,
//         secret: jwtConstants.secret,
//         signOptions: {expiresIn : '1h'}
//     })
//   ],
//   controllers: [AuthController],
//   providers: [AuthService,AuthGuard
//   ],
//   exports: [AuthService,],
// })
// export class AuthModule {}





