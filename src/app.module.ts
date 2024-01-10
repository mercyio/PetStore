import { Module } from '@nestjs/common';
import { petModule } from './Pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PetsUploadModule } from './pets-upload/pets-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet-entity/pets.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserEntity } from './auth-entities/user.entity';
import { UserModule } from './user/user.module';

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
    UserModule
  ],
  
    controllers: [AuthController],
    // providers: [AppService],
})
export class AppModule {}
