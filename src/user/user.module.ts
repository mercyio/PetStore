// import { Module } from "@nestjs/common";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { JwtModule } from "@nestjs/jwt";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { PetModule } from "src/Pets/pets.module";
// import { AuthModule } from "src/auth/auth.module";
// import { PetEntity } from "src/entities/pets.entity";
// import { ProfileEntity } from "src/entities/profile.entity";
// import { UserEntity } from "src/entities/user.entity";
// import { UserController } from "./user.controller";
// import { UserService } from "./user.service";
// import { AuthGuard } from "src/auth/guard/auth.guard";
// import { RolesGuard } from "src/auth/guard/roles.guard";


// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity, PetEntity, ProfileEntity]),
//        JwtModule.registerAsync({
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) =>
//         ({
//             secret: configService.getOrThrow<string>
//             ('JWT_SECRET'),
//             signOptions:{
//                 algorithm: configService.getOrThrow
//                 ('JWT_ALGORITHM'),
//                 expiresIn : configService.getOrThrow('JWT_EXPIRESIN')
//             }
//         }),
//         inject: [ConfigService],
//     }),
//     PetModule,
//     // UserModule,
//     AuthModule,
//     // PassportModule.register({
//     //     defaultStrategy: 'jwt'
//     // }),

//   ],
//   controllers: [UserController],
//   providers: [UserService, AuthGuard, RolesGuard],
//   exports: [UserService, AuthGuard]
// })
// export class UserModule {}
