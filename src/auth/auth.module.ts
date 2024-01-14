import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PetModule } from 'src/Pets/pets.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { jwtConstants } from './constants/jwtConstant';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
     PetModule, 
      PassportModule,
       JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn : '1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard
  ],
  exports: [AuthService,],
})
export class AuthModule {}



// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity]),
//      PetModule, 
//        JwtModule.registerAsync({
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) =>
//         ({
//           secret: configService.getOrThrow<string>
//           ('JWT_SECRET'),
//         signOptions:{
//           algorithm: configService.getOrThrow('JWT_ALGORITHM')
//         }
//       }),
//       inject: [ConfigService],
//         }),
//       PassportModule.register({
//         defaultStrategy: 'jwt'
//       }),
//     ],
//   controllers: [AuthController],
//   providers: [AuthService],
//   // exports: [AuthService,AuthGuard],
// })
// export class AuthModule {}

