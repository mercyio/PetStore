import { Module } from '@nestjs/common';
import { petModule } from './Pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PetsUploadModule } from './Pets/pets-upload/pets-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './Pets/pet-entity/pets.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserEntity } from './auth/auth-entities/user.entity';
// import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import {RoleGuard} from './auth/auth-guard/roles.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [PetEntity, UserEntity],
        synchronize: configService.getOrThrow('DB_SYNC'),
      }),
      inject: [ConfigService]
    
    }),
    petModule,
    PetsUploadModule,
    AuthModule,
    // UserModule
  ],
  
    controllers: [AuthController],
    providers: [
      {
      provide: APP_GUARD,
      useClass: RoleGuard,
},
]
    // providers: [AppService],
})
export class AppModule {}
