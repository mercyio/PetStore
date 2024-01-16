import { Module } from '@nestjs/common';
import { PetModule } from './Pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { PetsUploadModule } from './Pets/pets-upload/pets-upload.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';
import { PetEntity } from './Pets/pet-entity/pets.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PetModule,
    UserModule,
    PetsUploadModule,
    AuthModule,
    DatabaseModule,
    
    UserModule
  ],
  
    // controllers: [],
    // providers: []
    // providers: [AppService],
})
export class AppModule {}
